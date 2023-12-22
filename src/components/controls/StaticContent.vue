<template>
  <h1 v-if="schema.layout.tag === 'h1' && resolvedContent.allVariablesResolved"
      v-html='resolvedContent.resolvedText'
  />
  <h2 v-if="schema.layout.tag === 'h2' && resolvedContent.allVariablesResolved"
      v-html='resolvedContent.resolvedText'
  />
  <h3 v-if="schema.layout.tag === 'h3' && resolvedContent.allVariablesResolved"
      v-html='resolvedContent.resolvedText'
  />
  <h4 v-if="schema.layout.tag === 'h4' && resolvedContent.allVariablesResolved"
      v-html='resolvedContent.resolvedText'
  />
  <h5 v-if="schema.layout.tag === 'h5' && resolvedContent.allVariablesResolved"
      v-html='resolvedContent.resolvedText'
  />
  <p
    v-if="schema.layout.tag === 'p' && resolvedContent.allVariablesResolved"
    class='text-subtitle-2'
    v-html='resolvedContent.resolvedText'
  />
  <span
    v-if="schema.layout.tag === 'span' && resolvedContent.allVariablesResolved"
    class='text-subtitle-2 d-block text-justify'
    v-html='resolvedContent.resolvedText'
  />
</template>

<script setup lang='ts'>
import { EngineStaticField } from '../../vocabulary/engine/controls';
import { computed } from 'vue';
import { useResolveVariables } from '@/core/composables/useResolveVariables';

const props = defineProps<{
  schema: EngineStaticField;
  model: object;
}>();

const resolvedContent = computed(() => {
  return useResolveVariables(props.schema.content, props.model);
});
</script>

<style scoped lang='css'></style>
