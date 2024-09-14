<template>
  <component
    :is="schema.layout.tag"
    v-if="resolvedContent.allVariablesResolved"
    v-html="resolvedContent.resolvedText"
    :class="bindClass(schema)"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useResolveVariables } from "@/core/composables";
import { useClass } from "@/core/composables";
import { EngineStaticField } from "@/types/engine/controls";

const props = defineProps<{
  schema: EngineStaticField;
  model: object;
}>();

const { resolve } = useResolveVariables();

const resolvedContent = computed(() => {
  return resolve(props.schema,props.schema.content);
});

const { bindClass } = useClass();
</script>

<style scoped lang="css"></style>
