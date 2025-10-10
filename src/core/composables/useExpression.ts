import { useEventBus } from '@vueuse/core';
import get from 'lodash/get';

import { ref } from 'vue';

import { useConditionalRendering } from '@/core/composables/useConditionalRendering';
import { useGeneratorCache } from '@/core/composables/useGeneratorCache';
import { useNumber } from '@/core/composables/useNumber';
import { useResolveVariables } from '@/core/composables/useResolveVariables';
import { useInjectedFormModel } from '@/core/state/useFormModelProvider';
import { EngineField } from '@/types/engine/EngineField';
import { NodeUpdateEvent } from '@/types/engine/NodeUpdateEvent';

import { functions } from '../engine/expressionResolver';

export function useExpression() {
  const vueSchemaFormEventBus = useEventBus<string>('form-model');
  const form = useInjectedFormModel();
  const cache = useGeneratorCache();
  const { roundTo } = useNumber();
  const { conditionalRenderBlocker } = useConditionalRendering();

  async function resolveExpression(
    schema: EngineField,
    key: string,
    expression: string,
    model: object,
  ) {
    const functionName = extractFunctionName(expression);
    if (!functionName) return;

    const isGenerator = functionName.includes('_GENERATOR');
    let currentValue = get(model, key, null);

    if (cache.has(key) && currentValue == cache.get(key)) {
      currentValue = null;
    }

    if (isGenerator) {
      cache.set(key, currentValue);
    }

    if (isGenerator && currentValue != null) {
      return currentValue;
    }

    const result = ref();
    const f = functions[functionName];
    const mergedModel = form.getFormModelForResolve.value;
    result.value = await f(expression, mergedModel);

    if (!isGenerator) {
      vueSchemaFormEventBus.on(
        async () => await expressionListener(schema, key, expression, model),
      );
    }

    return result.value;
  }

  function extractFunctionName(expression: string): string | null {
    const match = expression.match(/^(\w+)\s*\(/);
    return match?.[1].trim() ?? null;
  }

  async function expressionListener(
    schema: EngineField,
    key: string,
    expression: string,
    model: object,
  ) {
    await new Promise((resolve) => setTimeout(resolve, 30));
    if (!(await conditionalRenderBlocker(schema))) return;

    const functionName = extractFunctionName(expression);
    if (!functionName) return;

    const resolverFn = functions[functionName];
    if (!resolverFn) {
      console.warn(`Function "${functionName}" not found in expression resolver.`);
      return;
    }

    const mergedModel = form.getFormModelForResolve.value;
    let newValue = await resolverFn(expression, mergedModel);

    if (schema.layout.component == 'number-field') {
      newValue = roundTo(newValue, schema.precision ? Number(schema.precision) : 0);
    }

    const currentValue = get(model, key, null);
    if (newValue !== currentValue && newValue != undefined) {
      const updateEvent: NodeUpdateEvent = {
        key,
        value: newValue,
      };
      schema.on.input(updateEvent);
    }
  }

  return { resolveExpression };
}
