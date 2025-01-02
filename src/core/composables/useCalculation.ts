import jsonata from "jsonata";
import get from "lodash/get";
import set from "lodash/set";
import { ref } from "vue";

import { useNumber } from "@/core/composables/useNumber";
import { logger, useResolveVariables } from "@/main";
import { useFormModelStore } from "@/store/formModelStore";
import { EngineField } from "@/types/engine/EngineField";
import { Fn, useEventBus } from "@vueuse/core";

export function useCalculation() {
  const { roundTo } = useNumber();
  const vueSchemaFormEventBus = useEventBus<string>("form-model");
  const unsubscribeListener = ref<Fn>(() => {});
  const calculationResultWasModified = ref(false);
  const { fillPath } = useResolveVariables();

  async function calculationFunc(field: EngineField, model: any): Promise<number | null> {
    const formModelStore = useFormModelStore(field.formId);
    const mergedModel = formModelStore.getFormModelForResolve;

    const precision = field.precision ? Number(field.precision) : 2;

    let result = ref(0);
    let calculation = field.calculation as string;

    unsubscribeListener.value = vueSchemaFormEventBus.on(
      async (event, payloadIndex) => await calculationListener(event, payloadIndex, field, model),
    );

    try {
      calculation = fillPath(field.path as string, field.index as number, calculation);
      const nata = jsonata(calculation);
      result.value = await nata.evaluate(mergedModel);
    } catch (error) {
      result.value = 0;
    }

    return roundTo(result.value, precision);
  }

  async function calculationListener(event: string, payloadIndex: number, field: EngineField, model: any) {
    await new Promise((r) => setTimeout(r, 5));
    let calculation = field.calculation as string;
    const precision = field.precision ? Number(field.precision) : 2;

    const formModelStore = useFormModelStore(field.formId);
    const mergedModel = formModelStore.getFormModelForResolve;
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
    if (result !== currentValue) {
      if (`${field.key}ManuallyChanged` in mergedModel && mergedModel[`${field.key}ManuallyChanged`] == true) {
        return;
      }
      set(model, field.key, roundTo(result, precision));
    }
  }

  return { calculationFunc, unsubscribeListener, calculationResultWasModified };
}
