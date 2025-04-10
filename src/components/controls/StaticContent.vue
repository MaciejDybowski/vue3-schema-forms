<template>
  <component
    :is="schema.layout.tag"
    v-if="resolvedContent.allVariablesResolved"
    :id="schema.layout.tag == 'v-alert' ? 'alert' : ''"
    :class="bindClass(schema)"
    v-bind="fieldProps"
  >
    <div v-html="resolvedContent.resolvedText" />
  </component>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

import { useClass, useProps, useResolveVariables } from "@/core/composables";
import { EngineStaticField } from "@/types/engine/controls";
import { useEventBus } from "@vueuse/core";

const props = defineProps<{
  schema: EngineStaticField;
  model: object;
}>();

const { resolve } = useResolveVariables();
const { bindProps, fieldProps } = useProps();

const resolvedContent = ref<any>({ resolvedText: null, allVariablesResolved: false });
const { bindClass } = useClass();

const vueSchemaFormEventBus = useEventBus<string>("form-model");

onMounted(async () => {
  const isContentRef = typeof props.schema.content === "object" && "$ref" in props.schema.content;
  if (isContentRef) {
    // @ts-ignore
    resolvedContent.value.resolvedText = '#'+props.schema.content.$ref.split("/").pop();
    resolvedContent.value.allVariablesResolved = true;
    return;
  }

  await bindProps(props.schema);
  resolvedContent.value = await resolve(props.schema, props.schema.content);
  const unsubscribe = vueSchemaFormEventBus.on(async (event, payloadIndex) => {
    resolvedContent.value = await resolve(props.schema, props.schema.content);
  });
});
</script>

<style lang="css" scoped></style>
