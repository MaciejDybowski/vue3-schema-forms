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
import { computed, onMounted } from "vue";

import { useClass, useProps, useResolveVariables } from "@/core/composables";
import { EngineStaticField } from '@/types/engine/controls';

const props = defineProps<{
  schema: EngineStaticField;
  model: object;
}>();

const { resolve } = useResolveVariables();
const {bindProps, fieldProps} = useProps()

const resolvedContent = computed(() => {
  return resolve(props.schema, props.schema.content);
});

const { bindClass } = useClass();

onMounted(() => {
  bindProps(props.schema);

  console.debug(fieldProps.value)
})
</script>

<style scoped lang='css'></style>
