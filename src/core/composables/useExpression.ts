import set from 'lodash/set';
import { ref, watch } from 'vue';

import { functions } from '../engine/expressionResolver';
import { useEventBus } from '@vueuse/core';
import get from 'lodash/get';
import { useFormModelStore } from "@/store/formModelStore";

export function useExpression() {
  const vueSchemaFormEventBus = useEventBus<string>('form-model');

  async function resolveExpression(key: string, expression: string, model: object, mergedModel: object) {
    let functionName = extractFunctionName(expression);
    if (functionName) {
      let result = ref();
      let f = functions[functionName];
      result.value = await f(expression, mergedModel);

      if (!functionName.includes('_GENERATOR') ) {
        const unsubscribe = vueSchemaFormEventBus.on(async (event) => await expressionListener(event, key, expression, model, mergedModel));
        // Do usunięcia jak się nic nie wykrzaczy po 5.12.2024 :)
        /*watch(model async () => {
          result.value = await f(expression, model);
          set(model, key, result.value);
        });*/
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
      console.error('Error extracting function name:', error);
      return null; // Return null in case of an error
    }
  }

  async function expressionListener(event: string, key: string, expression: string, model: object, mergedModel: object) {
    let functionName = extractFunctionName(expression);
    if (functionName) {
      let f = functions[functionName];
      const result = await f(expression, mergedModel);
      const currentValue = get(model, key, null);
      if (result !== currentValue) {
        set(model, key, result);
      }
    }
  }


  return { resolveExpression };
}


