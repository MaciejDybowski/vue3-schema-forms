import { ref } from "vue";

import { useResolveVariables } from "@/core/composables/useResolveVariables";
import { variableRegexp } from "@/core/engine/utils";
import { EngineField } from "@/types/engine/EngineField";
import { useEventBus } from "@vueuse/core";

export function useLabel(schema: EngineField) {
  const vueSchemaFormEventBus = useEventBus<string>("form-model");
  const { resolve } = useResolveVariables();
  const isLabelRef = typeof schema.label === "object" && "$ref" in schema.label;

  const label = ref(isLabelRef ? "#" + schema.label.$ref.split("/").pop() : (schema.label as string));
  const labelWithFallbackMessage = label.value;

  if (label.value.match(variableRegexp)) {
    vueSchemaFormEventBus.on(() => labelResolverListener());
  }

  async function bindLabel(schema: EngineField) {
    if (isLabelRef) return schema.label.$ref;

    const { resolvedText, allVariablesResolved } = await resolve(schema, schema.label, "title");
    allVariablesResolved ? (label.value = resolvedText) : (label.value = labelWithFallbackMessage);
  }

  async function labelResolverListener() {
    const { resolvedText, allVariablesResolved } = await resolve(schema, schema.label, "title");
    allVariablesResolved ? (label.value = resolvedText) : (label.value = labelWithFallbackMessage);
  }

  return { label, bindLabel };
}
