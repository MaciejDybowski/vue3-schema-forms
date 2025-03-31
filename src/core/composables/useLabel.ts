import { ref } from "vue";

import { EngineField } from "@/types/engine/EngineField";
import { useEventBus } from "@vueuse/core";

import { useResolveVariables } from "@/core/composables/useResolveVariables";
import { variableRegexp } from "@/core/engine/utils";

export function useLabel(schema: EngineField) {
  const vueSchemaFormEventBus = useEventBus<string>("form-model");
  const { resolve } = useResolveVariables();
  const isLabelRef = typeof schema.label === "object" && "$ref" in schema.label;

  const label = ref(isLabelRef ? schema.label.$ref : (schema.label as string));
  const labelWithFallbackMessage = label.value;

  /*if (typeof schema.label === 'string' && schema?.label?.match(variableRegexp)) {
    const unsubscribe = vueSchemaFormEventBus.on((event, payloadIndex) => labelResolverListener(event, payloadIndex));
  }*/
  // TODO - zamieniałem na ifa poniżej, jak będzie okej to luks
  if (label.value.match(variableRegexp)) {
    const unsubscribe = vueSchemaFormEventBus.on((event, payloadIndex) => labelResolverListener(event, payloadIndex));
  }

  async function bindLabel(schema: EngineField) {
    if (isLabelRef) return schema.label.$ref;

    const { resolvedText, allVariablesResolved } = await resolve(schema, schema.label, "title");
    allVariablesResolved ? (label.value = resolvedText) : (label.value = labelWithFallbackMessage);
  }

  async function labelResolverListener(event: string, payloadIndex: number) {
    const { resolvedText, allVariablesResolved } = await resolve(schema, schema.label, "title");
    allVariablesResolved ? (label.value = resolvedText) : (label.value = labelWithFallbackMessage);
  }

  return { label, bindLabel };
}
