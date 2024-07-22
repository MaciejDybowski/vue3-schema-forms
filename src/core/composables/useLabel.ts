import { ref } from "vue";

import { EngineField } from "@/types/engine/EngineField";

import { useResolveVariables } from "../../core/composables/useResolveVariables";
import { variableRegexp } from "../../core/engine/utils";
import { useFormModelStore } from "../../store/formModelStore";

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
