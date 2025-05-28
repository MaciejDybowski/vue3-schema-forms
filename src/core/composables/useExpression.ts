import { useEventBus } from '@vueuse/core';
import get from 'lodash/get';

import { ref } from 'vue';

import { useInjectedFormModel } from '@/core/state/useFormModelProvider';
import { EngineField } from '@/types/engine/EngineField';
import { NodeUpdateEvent } from '@/types/engine/NodeUpdateEvent';

import { functions } from '../engine/expressionResolver';

export function useExpression() {
  const vueSchemaFormEventBus = useEventBus<string>('form-model');
  const form = useInjectedFormModel();

  async function resolveExpression(
    schema: EngineField,
    key: string,
    expression: string,
    model: object,
  ) {
    let functionName = extractFunctionName(expression);
    if (functionName) {
      let result = ref();
      let f = functions[functionName];
      const mergedModel = form.getFormModelForResolve.value;
      result.value = await f(expression, mergedModel);

      if (!functionName.includes('_GENERATOR')) {
        const unsubscribe = vueSchemaFormEventBus.on(
          async () => await expressionListener(schema, key, expression, model),
        );
      } else {
        // if field has value generator is not needed // TODO maybe better code for this..?
        const current = get(model, key, null);
        if (current != null) {
          return current;
        }
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

  async function expressionListener(
    schema: EngineField,
    key: string,
    expression: string,
    model: object,
  ) {
    await new Promise((r) => setTimeout(r, 30));
    let functionName = extractFunctionName(expression);
    if (functionName) {
      let f = functions[functionName];
      const mergedModel = form.getFormModelForResolve.value;
      const result = await f(expression, mergedModel);
      const currentValue = get(model, key, null);
      if (result !== currentValue) {
        const event: NodeUpdateEvent = {
          key: key,
          value: result,
        };
        schema.on.input(event);
      }
    }
  }

  return { resolveExpression };
}
