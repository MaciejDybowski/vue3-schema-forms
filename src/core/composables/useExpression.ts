import get from "lodash/get";
import set from "lodash/set";
import { ref } from "vue";

import { useFormModelStore } from "@/store/formModelStore";
import { useEventBus } from "@vueuse/core";

import { functions } from "../engine/expressionResolver";

export function useExpression() {
  const vueSchemaFormEventBus = useEventBus<string>("form-model");

  async function resolveExpression(key: string, expression: string, model: object, formId: string) {
    let functionName = extractFunctionName(expression);
    if (functionName) {
      let result = ref();
      let f = functions[functionName];
      const formModelStore = useFormModelStore(formId);
      const mergedModel = formModelStore.getFormModelForResolve;
      result.value = await f(expression, mergedModel);

      if (!functionName.includes("_GENERATOR")) {
        const unsubscribe = vueSchemaFormEventBus.on(
          async (event) => await expressionListener(event, key, expression, model, formId),
        );
      }
      return result.value;
    }
  }

  function extractFunctionName(expression: string): string | null {
    try {
      const match = expression.match(/^(\w+)\s*\(/);
      if (match) {
        return match[1].trim();
      } else {
        return null; // Return null if no match is found
      }
    } catch (error) {
      console.error("Error extracting function name:", error);
      return null; // Return null in case of an error
    }
  }

  async function expressionListener(event: string, key: string, expression: string, model: object, formId: string) {
    let functionName = extractFunctionName(expression);
    if (functionName) {
      let f = functions[functionName];
      const formModelStore = useFormModelStore(formId);
      const mergedModel = formModelStore.getFormModelForResolve;
      const result = await f(expression, mergedModel);
      const currentValue = get(model, key, null);
      if (result !== currentValue) {
        set(model, key, result);
      }
    }
  }

  return { resolveExpression };
}
