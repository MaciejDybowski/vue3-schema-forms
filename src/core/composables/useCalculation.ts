import { Fn, useEventBus } from '@vueuse/core';
import jsonata from 'jsonata';
import get from 'lodash/get';

import { ref } from 'vue';

import { useConditionalRendering } from '@/core/composables/useConditionalRendering';
import { useEventHandler } from '@/core/composables/useEventHandler';
import { useNumber } from '@/core/composables/useNumber';
import { useResolveVariables } from '@/core/composables/useResolveVariables';
import { useInjectedFormModel } from '@/core/state/useFormModelProvider';
import { logger } from '@/main';
import { EngineField } from '@/types/engine/EngineField';
import { NodeUpdateEvent } from '@/types/engine/NodeUpdateEvent';

export function useCalculation() {
  const { roundTo } = useNumber();
  const { onChange } = useEventHandler();
  const vueSchemaFormEventBus = useEventBus<string>('form-model');
  const unsubscribeListener = ref<Fn>(() => {});
  const calculationResultWasModified = ref(false);
  const { fillPath } = useResolveVariables();
  const form = useInjectedFormModel();
  const { conditionalRenderBlocker } = useConditionalRendering();

  async function evaluateCalculation(
    calculation: string,
    path: string,
    index: number,
    mergedModel: any,
    defaultValue: any,
  ) {
    try {
      calculation = fillPath(path, index, calculation);
      const nata = jsonata(calculation);
      return await nata.evaluate(mergedModel);
    } catch (error: any) {
      console.error('Calculation error:', {
        message: error.message,
        calculation: calculation,
      });
      return defaultValue;
    }
  }

  async function calculationFunc(field: EngineField, model: any): Promise<any | null> {
    const mergedModel = form.getFormModelForResolve.value;
    const type = field.layout.component;
    const calculation = field.calculation ?? '';
    const defaultNumberPrecision = 2;

    unsubscribeListener.value = vueSchemaFormEventBus.on(
      async () => await calculationListener(field, model),
    );

    async function runCalculation(defaultValue: any): Promise<any> {
      return await evaluateCalculation(
        calculation,
        field.path as string,
        field.index as number,
        mergedModel,
        defaultValue,
      );
    }

    switch (type) {
      case 'number-field': {
        const numberPrecision = field.precision ? Number(field.precision) : defaultNumberPrecision;
        const result = await runCalculation(0);
        return roundTo(result, numberPrecision);
      }
      case 'switch': {
        const result = await runCalculation(false);
        return Boolean(result);
      }
      default: {
        const result = await runCalculation('');
        return result == null ? '' : String(result);
      }
    }
  }

  async function calculationListener(field: EngineField, model: any) {
    await new Promise((r) => setTimeout(r, 5));
    if (!(await conditionalRenderBlocker(field))) return;

    if (field.index == undefined) {
      // safety for SUM / aggregate functions
      await new Promise((r) => setTimeout(r, 1));
    }

    let calculation = field.calculation as string;
    const precision = field.precision ? Number(field.precision) : 2;
    const mergedModel = form.getFormModelForResolve.value;

    let result: any;
    try {
      calculation = fillPath(field.path as string, field.index as number, calculation);
      const nata = jsonata(calculation);
      result = await nata.evaluate(mergedModel);

      if (logger.calculationListener) {
        console.debug(
          `[vue-schema-forms] [CalculationListener] key=${field.key}, index=${field.index}, calculation="${calculation}", result=${result}, mergedModel=`,
          mergedModel,
        );
      }
    } catch (error) {
      result = null;
    }

    let newValue: any;
    switch (field.layout.component) {
      case 'number-field':
        if (result == null || result === '') result = 0;
        newValue = roundTo(Number(result), precision);
        break;

      case 'switch':
        newValue = Boolean(result);
        break;

      default:
        newValue = result == null ? '' : String(result);
        break;
    }

    const currentValue = get(model, field.key, null);

    if (newValue !== currentValue) {
      if (
        `${field.key}ManuallyChanged` in mergedModel &&
        mergedModel[`${field.key}ManuallyChanged`] === true
      ) {
        return;
      }

      const event: NodeUpdateEvent = {
        key: field.key,
        value: newValue,
      };
      field.on.input(event);
      await onChange(field, model);
    }
  }

  return { calculationFunc, unsubscribeListener, calculationResultWasModified };
}
