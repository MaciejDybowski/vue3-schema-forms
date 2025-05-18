import jsonata from "jsonata";
import get from "lodash/get";
import { ref } from "vue";

import { useEventHandler } from "@/core/composables/useEventHandler";
import { useNumber } from "@/core/composables/useNumber";
import { logger, useFormModel, useResolveVariables } from "@/main";
import { useInjectedFormModel } from "@/core/state/useFormModelProvider";
import { EngineField } from "@/types/engine/EngineField";
import { Fn, useEventBus } from "@vueuse/core";

export function useCalculation() {
  const { roundTo } = useNumber();
  const { onChange } = useEventHandler();
  const vueSchemaFormEventBus = useEventBus<string>("form-model");
  const unsubscribeListener = ref<Fn>(() => {});
  const calculationResultWasModified = ref(false);
  const { fillPath } = useResolveVariables();
  const { getValue, setValue } = useFormModel();
  const form = useInjectedFormModel();

  async function calculationFunc(field: EngineField, model: any): Promise<number | null> {
    const mergedModel = form.getFormModelForResolve.value;

    const precision = field.precision ? Number(field.precision) : 2;

    let result = ref(0);
    let calculation = field.calculation as string;

    unsubscribeListener.value = vueSchemaFormEventBus.on(async () => await calculationListener(field, model));

    try {
      calculation = fillPath(field.path as string, field.index as number, calculation);
      const nata = jsonata(calculation);
      result.value = await nata.evaluate(mergedModel);
    } catch (error) {
      result.value = 0;
    }

    return roundTo(result.value, precision);
  }

  async function calculationListener(field: EngineField, model: any) {
    await new Promise((r) => setTimeout(r, 5));
    if (field.index == undefined) {
      // sumy poza sekcja powielana mialy hazard
      await new Promise((r) => setTimeout(r, 1));
    }
    let calculation = field.calculation as string;
    const precision = field.precision ? Number(field.precision) : 2;

    const mergedModel = form.getFormModelForResolve.value;
    let result = 0;
    try {
      calculation = fillPath(field.path as string, field.index as number, calculation);
      const nata = jsonata(calculation);

      result = await nata.evaluate(mergedModel);
      if (logger.calculationListener) {
        console.debug(`[vue-schema-forms] [CalculationListener], key=${field.key}, index=${field.index}, result=${result}`);
      }
      if (!result) {
        result = 0;
      }
    } catch (error) {
      result = 0;
    }

    const currentValue = get(model, field.key, null);
    if (roundTo(result, precision) !== currentValue) {
      if (`${field.key}ManuallyChanged` in mergedModel && mergedModel[`${field.key}ManuallyChanged`] == true) {
        return;
      }
      setValue(roundTo(result, precision), field);
      await onChange(field, model);
    }
  }

  return { calculationFunc, unsubscribeListener, calculationResultWasModified };
}
