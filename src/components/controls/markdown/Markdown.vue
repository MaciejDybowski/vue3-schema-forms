<template>
  <div
    v-if="resolvedContent.allVariablesResolved"
    class="markdown-body"
    v-html="md.render(resolvedContent.resolvedText)"
  ></div>
</template>

<script lang="ts" setup>
import { useEventBus } from '@vueuse/core';
import markdownit from 'markdown-it';
import markdownItMultimdTable from 'markdown-it-multimd-table';
import { markdownItTable } from 'markdown-it-table';

import { computed, onMounted, ref } from 'vue';

import { useFormModel, useProps, useResolveVariables } from '@/core/composables';
import { EngineField } from '@/types/engine/EngineField';

const props = defineProps<{
  schema: EngineField;
  model: object;
}>();

const { resolve } = useResolveVariables();
const { bindProps } = useProps();

const resolvedContent = ref<any>({ resolvedText: null, allVariablesResolved: false });

const vueSchemaFormEventBus = useEventBus<string>('form-model');
const { getValue } = useFormModel();

const localModel = computed(() => getValue(props.model, props.schema));
const md = markdownit().use(markdownItMultimdTable).use(markdownItTable).enable('table');

onMounted(async () => {
  await bindProps(props.schema);

  resolvedContent.value = await resolve(props.schema, localModel.value);
  const unsubscribe = vueSchemaFormEventBus.on(async () => {
    resolvedContent.value = await resolve(props.schema, localModel.value);
  });
});
</script>

<style lang="scss">
.markdown-body table {
  width: 100%;
  border-collapse: collapse;
  background: var(--v-theme-surface, #fff);
  border: 1px solid #d1d5da;
  font-size: 14px;
}

.markdown-body th,
.markdown-body td {
  padding: 6px;
  border: 1px solid #d1d5da;
  text-align: center;
  word-wrap: break-word;
  width: 100px;
}

.markdown-body th {
  background-color: #eef1f4;
  font-weight: bold;
}

.v-theme--dark .markdown-body table {
  background-color: var(--v-theme-surface-dark, #1e1e1e);
  border: 1px solid #666;
}

.v-theme--dark .markdown-body th,
.v-theme--dark .markdown-body td {
  border: 1px solid #666;
  color: var(--v-theme-on-surface, #e0e0e0);
}

.v-theme--dark .markdown-body th {
  background-color: #2d2d2d;
}
</style>
