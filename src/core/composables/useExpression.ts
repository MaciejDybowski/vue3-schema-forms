import { useEventBus } from '@vueuse/core';
import get from 'lodash/get';
import set from 'lodash/set';

import { ref } from 'vue';

import { useInjectedFormModel } from '@/core/state/useFormModelProvider';

import { functions } from '../engine/expressionResolver';

export function useExpression() {
  const vueSchemaFormEventBus = useEventBus<string>('form-model');
  const form = useInjectedFormModel();

  async function resolveExpression(key: string, expression: string, model: object) {
    let functionName = extractFunctionName(expression);
    if (functionName) {
      let result = ref();
      let f = functions[functionName];
      const mergedModel = form.getFormModelForResolve.value;
      result.value = await f(expression, mergedModel);

      if (!functionName.includes('_GENERATOR')) {
        const unsubscribe = vueSchemaFormEventBus.on(
          async () => await expressionListener(key, expression, model),
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
      console.error('Error extracting function name:', error);
      return null; // Return null in case of an error
    }
  }

  async function expressionListener(key: string, expression: string, model: object) {
    await new Promise((r) => setTimeout(r, 30));
    let functionName = extractFunctionName(expression);
    if (functionName) {
      let f = functions[functionName];
      const mergedModel = form.getFormModelForResolve.value;
      const result = await f(expression, mergedModel);
      const currentValue = get(model, key, null);
      if (result !== currentValue) {
        set(model, key, result); // TODO sprawdzić czy na pewno działa w każdym przypadku, jeśli nie to trzeba zmienić na field.on.input()
      }
    }
  }

  return { resolveExpression };
}
