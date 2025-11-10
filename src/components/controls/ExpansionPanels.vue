<template>
  <v-expansion-panels
    elevation="0"
    flat
    multiple
    variant="accordion"
  >
    <v-expansion-panel
      v-for="(panel, index) in schema.panels"
      :key="index"
    >
      <v-expansion-panel-title v-if="panelTitles[index]">
        {{ panelTitles[index].resolvedText }}
      </v-expansion-panel-title>

      <v-expansion-panel-text
        v-memo="[panelSchemas[index]]"
        eager
      >
        <form-root
          :model="model"
          :options="schema.options"
          :schema="panelSchemas[index]"
          @update:model="updateModel"
        />
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts" setup>
import { useEventBus } from '@vueuse/core';

import { computed, onMounted, ref } from 'vue';

import FormRoot from '@/components/engine/FormRoot.vue';

import { useFormModel, useResolveVariables } from '@/core/composables';
import { variableRegexp } from '@/core/engine/utils';
import { EngineExpansionPanel, EngineExpansionPanels } from '@/types/engine/controls';

const { model, schema } = defineProps<{
  schema: EngineExpansionPanels;
  model: object;
}>();

const { setValue } = useFormModel();
const { resolve } = useResolveVariables();
const vueSchemaFormEventBus = useEventBus<string>('form-model');

function updateModel(payload: any) {
  setValue(payload.value, { key: payload.key, on: schema.on } as any);
}

const panelSchemas = computed(() => schema.panels.map((p) => p.schema));
const panelTitles = ref<any[]>([]);

onMounted(() => {
  panelTitles.value = schema.panels.map((p: EngineExpansionPanel) => ({
    resolvedText: p.title,
  }));

  Promise.all(
    schema.panels.map(async (p: EngineExpansionPanel) => {
      return await resolve(schema, p.title);
    }),
  ).then((resolved) => {
    panelTitles.value = resolved;
  });

  const hasVariables = schema.panels.some((p) => p.title.match(variableRegexp));

  if (hasVariables) {
    const unsubscribe = vueSchemaFormEventBus.on(async () => {
      await new Promise((r) => setTimeout(r, 110));
      panelTitles.value = await Promise.all(
        schema.panels.map(async (p) => await resolve(schema, p.title)),
      );
    });
  }
});
</script>

<style lang="scss" scoped>
// Marginesy wew paenlu
/*:deep(.v-expansion-panel-text__wrapper) {
  margin: 0 0;
  padding: 0 0;
}*/

.v-expansion-panel--active > .v-expansion-panel-title:not(.v-expansion-panel-title--static) {
  min-height: 48px;
}

:deep(.v-expansion-panel) {
  border-bottom: 1px solid rgba(var(--v-theme-primary), 0.1);
  &:last-child {
    border-bottom: none;
  }

  position: relative;
  border-radius: 8px;
  margin-bottom: 8px;
  transition: box-shadow 0.2s ease;

  &.v-expansion-panel--active::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background-color: rgb(var(--v-theme-primary));
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  &.v-expansion-panel--active {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
    //background-color: rgba(var(--v-theme-primary), 0.05);
  }
}
</style>
