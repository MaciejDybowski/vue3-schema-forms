import { ref } from 'vue';

import { EngineField } from '@/types/engine/EngineField';

import { useResolveVariables } from '../../core/composables/useResolveVariables';
import { variableRegexp } from '../../core/engine/utils';
import { useEventBus } from '@vueuse/core';

export function useLabel(schema: EngineField) {
  const vueSchemaFormEventBus = useEventBus<string>('form-model');
  const { resolve } = useResolveVariables();
  const label = ref(resolve(schema, schema.label).resolvedText);
  const labelWithFallbackMessage = label.value;

  if (schema?.label?.match(variableRegexp)) {
    const unsubscribe = vueSchemaFormEventBus.on((event, payloadIndex) => labelResolverListener(event, payloadIndex));
  }

  async function labelResolverListener(event: string, payloadIndex: number) {
    const { resolvedText, allVariablesResolved } = resolve(schema, schema.label, 'title');
    allVariablesResolved ? (label.value = resolvedText) : (label.value = labelWithFallbackMessage);
  }

  return { label };
}
