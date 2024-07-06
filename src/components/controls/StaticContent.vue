<template>
  <h1
    v-if="schema.layout.tag === 'h1' && resolvedContent.allVariablesResolved"
    v-html='resolvedContent.resolvedText'
    :class='bindClass(schema)'
  />
  <h2
    v-if="schema.layout.tag === 'h2' && resolvedContent.allVariablesResolved"
    v-html='resolvedContent.resolvedText'
    :class='bindClass(schema)'
  />
  <h3
    v-if="schema.layout.tag === 'h3' && resolvedContent.allVariablesResolved"
    v-html='resolvedContent.resolvedText'
    :class='bindClass(schema)'
  />
  <h4
    v-if="schema.layout.tag === 'h4' && resolvedContent.allVariablesResolved"
    v-html='resolvedContent.resolvedText'
    :class='bindClass(schema)'
  />
  <h5
    v-if="schema.layout.tag === 'h5' && resolvedContent.allVariablesResolved"
    v-html='resolvedContent.resolvedText'
    :class='bindClass(schema)'
  />
  <p
    v-if="schema.layout.tag === 'p' && resolvedContent.allVariablesResolved"
    v-html='resolvedContent.resolvedText'
    :class='bindClass(schema)'
  />
  <span
    v-if="schema.layout.tag === 'span' && resolvedContent.allVariablesResolved"
    v-html='resolvedContent.resolvedText'
    :class='bindClass(schema)'
  />
</template>

<script setup lang='ts'>
import { EngineStaticField } from '@/types/engine/controls';
import { computed } from 'vue';
import { useResolveVariables } from '../../core/composables/useResolveVariables';
import { useClass } from '../../core/composables';


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
