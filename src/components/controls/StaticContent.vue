<template>
  <component
    :is='schema.layout.tag'
    v-if='resolvedContent.allVariablesResolved'
    v-html='resolvedContent.resolvedText'
    :class='bindClass(schema)'
  />
</template>

<script setup lang='ts'>
import { EngineStaticField } from '@/types/engine/controls';
import { computed } from 'vue';
import { useResolveVariables } from '@/core/composables';
import { useClass } from '@/core/composables';

const props = defineProps<{
  schema: EngineStaticField;
  model: object;
}>();

const { resolve } = useResolveVariables(props.schema);

const resolvedContent = computed(() => {
  return resolve(props.schema.content);
});

const { bindClass } = useClass();
</script>

<style scoped lang='css'></style>
