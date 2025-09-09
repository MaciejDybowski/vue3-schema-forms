import { Fn, useEventBus } from '@vueuse/core';
import jsonata from 'jsonata';
import get from 'lodash/get';

import { ref } from 'vue';

import { useEventHandler } from '@/core/composables/useEventHandler';
import { useNumber } from '@/core/composables/useNumber';
import { useResolveVariables } from '@/core/composables/useResolveVariables';
import { useInjectedFormModel } from '@/core/state/useFormModelProvider';
import { logger } from '@/main';
import { EngineField } from '@/types/engine/EngineField';
import { NodeUpdateEvent } from '@/types/engine/NodeUpdateEvent';
import { useConditionalRendering } from '@/core/composables/useConditionalRendering';

export function useCalculation() {
  const { roundTo } = useNumber();
  const { onChange } = useEventHandler();
  const vueSchemaFormEventBus = useEventBus<string>('form-model');
  const unsubscribeListener = ref<Fn>(() => {});
  const calculationResultWasModified = ref(false);
  const { fillPath } = useResolveVariables();
  const form = useInjectedFormModel();
  const {conditionalRenderBlocker} = useConditionalRendering()

  async function evaluateCalculation(calculation: string, path: string, index: number, mergedModel: any, defaultValue: any) {
    try {
      calculation = fillPath(path, index, calculation);
      const nata = jsonata(calculation);
      return await nata.evaluate(mergedModel);
    } catch (error) {
      return defaultValue;
    }
  }

  async function calculationFunc(field: EngineField, model: any): Promise<any | null> {
    const mergedModel = form.getFormModelForResolve.value;

    const type = field.layout.component;
    let calculation = field.calculation as string;
    let result;

    unsubscribeListener.value = vueSchemaFormEventBus.on(
      async () => await calculationListener(field, model)
    );

    // defaults per component type
    let numberPrecision = field.precision ? Number(field.precision) : 2;
    let defaultValue: any;

    switch (type) {
      case 'number-field':
        result = ref(0);
        defaultValue = 0;
        result.value = await evaluateCalculation(calculation, field.path as string, field.index as number, mergedModel, defaultValue);
        return roundTo(result.value, numberPrecision);
      case 'switch':
        result = ref(false);
        defaultValue = false;
        result.value = await evaluateCalculation(calculation, field.path as string, field.index as number, mergedModel, defaultValue);
        return Boolean(result.value);
      default:
        result = ref(null);
        defaultValue = '';
        result.value = await evaluateCalculation(calculation, field.path as string, field.index as number, mergedModel, defaultValue);
        return result.value == null ? '' : String(result.value);
    }
  }

  async function calculationListener(field: EngineField, model: any) {
    await new Promise((r) => setTimeout(r, 5));
    if (!await conditionalRenderBlocker(field)) return;

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
          `[vue-schema-forms] [CalculationListener], key=${field.key}, index=${field.index}, result=${result}`,
        );
      }
    } catch (error) {
      result = null;
    }

    let newValue: any;
    switch (field.layout.component) {
      case "number-field":
        if (result == null || result === "") result = 0;
        newValue = roundTo(Number(result), precision);
        break;

      case "switch":
        newValue = Boolean(result);
        break;

      default:
        newValue = (result == null) ? "" : String(result);
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
