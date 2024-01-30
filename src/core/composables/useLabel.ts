import { EngineField } from '@/vocabulary/engine';
import { useFormModelStore } from '../../store/formModelStore';
import { variableRegexp } from '../../core/engine/utils';
import { ref } from 'vue';
import { useResolveVariables } from '@/core/composables/useResolveVariables';

export function useLabel(schema: EngineField) {
  const formModelStore = useFormModelStore(schema.formId);
  const { resolve } = useResolveVariables(schema);
  const label = ref(resolve(schema.label).resolvedText);
  const labelWithFallbackMessage = label.value;

  if (schema?.label?.match(variableRegexp)) {
    formModelStore.$subscribe(() => {
      const { resolvedText, allVariablesResolved } = resolve(schema.label);
      allVariablesResolved ? (label.value = resolvedText) : (label.value = labelWithFallbackMessage);
    });
  }

  return { label };
}
