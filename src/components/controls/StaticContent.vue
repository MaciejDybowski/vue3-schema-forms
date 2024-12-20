<template>
  <component
    :is='schema.layout.tag'
    v-if='resolvedContent.allVariablesResolved'
    :class='bindClass(schema)'
    v-bind="fieldProps"
  >
    <div v-html='resolvedContent.resolvedText'/>
  </component>
</template>

<script setup lang='ts'>
import { onMounted, ref } from "vue";

import { useClass, useProps, useResolveVariables } from "@/core/composables";
import { EngineStaticField } from '@/types/engine/controls';
import { useEventBus } from "@vueuse/core";

const props = defineProps<{
  schema: EngineStaticField;
  model: object;
}>();

const { resolve } = useResolveVariables();
const {bindProps, fieldProps} = useProps()

const resolvedContent = ref<any>({ resolvedText: null, allVariablesResolved: false })
const { bindClass } = useClass();

const vueSchemaFormEventBus = useEventBus<string>("form-model");

onMounted(async () => {
  await bindProps(props.schema);

  resolvedContent.value = await resolve(props.schema, props.schema.content)
  const unsubscribe = vueSchemaFormEventBus.on( async (event, payloadIndex) => {
    resolvedContent.value = await resolve(props.schema, props.schema.content)
  });
})
</script>

<style scoped lang='css'></style>
