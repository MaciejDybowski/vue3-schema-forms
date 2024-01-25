import { useResolveVariables } from "./useResolveVariables";
import { EngineField } from "@/vocabulary/engine";
import { useFormModelStore } from "../../store/formModelStore";
import { variableRegexp } from "../../core/engine/utils";
import { ref } from "vue";
import { useFormattedNumber } from '../../core/composables/useFormattedNumber';

export function useLabel(schema: EngineField) {
  const formModelStore = useFormModelStore(schema.formId);
  const {formatNumber} = useFormattedNumber(schema.options)
  const label = ref(useResolveVariables(schema.label, schema.formId, formatNumber).resolvedText);
  const labelWithFallbackMessage = label.value;

  if (schema.label.match(variableRegexp)) {
    formModelStore.$subscribe(() => {
      const { resolvedText, allVariablesResolved } = useResolveVariables(schema.label, schema.formId, formatNumber);
      allVariablesResolved ? (label.value = resolvedText) : (label.value = labelWithFallbackMessage);
    });
  }

  return { label };
}
