<template>
  <v-expansion-panels
    v-model="openPanels"
    elevation="0"
    flat
    multiple
    variant="accordion"
  >
    <v-expansion-panel
      v-for="(panel, index) in schema.panels"
      :key="getPanelId(panel, index)"
    >
      <v-expansion-panel-title v-if="panelTitles[index]">
        <v-icon
          v-if="panel.titleIcon"
          :size="panel.titleIconSize ? panel.titleIconSize : 18"
          class="mr-2"
        >
          {{ panel.titleIcon }}
        </v-icon>

        <div
          :class="panel.titleCssDecorator ? [panel.titleCssDecorator] : ''"
          v-html="panelTitles[index].resolvedText"
        />
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
import { useEventBus, useLocalStorage } from '@vueuse/core';
import { cloneDeep } from 'lodash';

import { computed, onMounted, ref, watch } from 'vue';

import FormRoot from '@/components/engine/FormRoot.vue';

import { useFormModel, useResolveVariables } from '@/core/composables';
import { variableRegexp } from '@/core/engine/utils';
import { EngineExpansionPanel, EngineExpansionPanels } from '@/types/engine/controls';
import { Schema } from '@/types/schema/Schema';
import { SchemaField } from '@/types/schema/SchemaField';

const { model, schema } = defineProps<{
  schema: EngineExpansionPanels;
  model: object;
}>();

const { setValue } = useFormModel();
const { resolve } = useResolveVariables();
const vueSchemaFormEventBus = useEventBus<string>('form-model');

function generatePanelsId(): string {
  const schemaKey = schema.key || '';
  const path = 'path' in schema ? schema.path : '';
  const panelTitlesHash = schema.panels.map(p => p.title).join('|');
  return `expansion-panels-${schemaKey}-${path}-${panelTitlesHash}`.replace(/\s+/g, '_');
}

function getPanelId(panel: EngineExpansionPanel, index: number): string {
  return `${panelsId}-panel-${index}-${panel.title}`.replace(/\s+/g, '_');
}
const panelsId = generatePanelsId();
const storedPanelState = useLocalStorage<number[]>(`${panelsId}-state`, []);
const openPanels = ref<number[]>(storedPanelState.value);

watch(openPanels, (newValue) => {
  storedPanelState.value = newValue;
}, { deep: true });


function updateModel(payload: any) {
  setValue(payload.value, { key: payload.key, on: schema.on } as any);
}

/**
 * Funkcja przekazująca path i index do p.schema.properties z uwzględnieniem zagnieżdżeń.
 * Obsługuje zagnieżdżone struktury:
 * - properties (obiekty zagnieżdżone)
 * - layout.schema (fields-group, duplicated-section, section, address)
 * - layout.component === 'duplicated-section' (wymaga specjalnego traktowania path)
 */
function wrapPropertiesWithPathAndIndex(
  properties: Record<string, SchemaField>,
  path: string,
  index: number,
): Record<string, SchemaField> {
  for (const [key, value] of Object.entries(properties)) {
    const hasNestedProperties = value.properties !== undefined;
    const hasLayoutSchema = value.layout?.schema?.properties !== undefined;
    const isDuplicatedSection = value.layout?.component === 'duplicated-section';
    const isFieldsGroup = value.layout?.component === 'fields-group';

    // Przypisz path i index do bieżącego pola
    value.path = path;
    value.index = index;

    // Jeśli pole ma zagnieżdżone properties (obiekt)
    if (hasNestedProperties) {
      wrapPropertiesWithPathAndIndex(
        value.properties as Record<string, SchemaField>,
        path,
        index,
      );
    }

    // Jeśli pole ma layout.schema (fields-group, duplicated-section, section, address)
    if (hasLayoutSchema) {
      if (isDuplicatedSection) {
        // Dla duplicated-section budujemy nową ścieżkę z kluczem i []
        const newPath = path ? `${path}[${index}].${key}[]` : `${key}[]`;
        value.path = newPath;
        value.index = index;
        wrapPropertiesWithPathAndIndex(
          value.layout!.schema!.properties as Record<string, SchemaField>,
          newPath,
          index,
        );
      } else if (isFieldsGroup) {
        // Dla fields-group jest przeźroczysty - przekazujemy ten sam path i index
        wrapPropertiesWithPathAndIndex(
          value.layout!.schema!.properties as Record<string, SchemaField>,
          path,
          index,
        );
      } else {
        // Dla innych komponentów z layout.schema (section, address, expansion-panels)
        wrapPropertiesWithPathAndIndex(
          value.layout!.schema!.properties as Record<string, SchemaField>,
          path,
          index,
        );
      }
    }
  }

  return properties;
}

/**
 * Tworzy kopię schematu panelu z przekazanym path i index do wszystkich pól
 */
function createPanelSchemaWithContext(panelSchema: Schema, path: string, index: number): Schema {
  const clonedSchema = cloneDeep(panelSchema);

  if (clonedSchema.properties) {
    wrapPropertiesWithPathAndIndex(clonedSchema.properties, path, index);
  }
  return clonedSchema;
}

const panelSchemas = computed(() =>
  schema.panels.map((p) => {
    if ('path' in schema && 'index' in schema && schema.path !== undefined && schema.index !== undefined) {
      return createPanelSchemaWithContext(p.schema, schema.path, schema.index);
    }
    return p.schema;
  }),
);

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

//* Ogólny styl paneli */
:deep(.v-expansion-panel) {
  position: relative;
  border-radius: 8px;
  margin-bottom: 8px;
  transition:
    background-color 0.2s ease,
    box-shadow 0.2s ease;

  border-bottom: 1px solid rgba(var(--v-theme-primary), 0.1);

  &:last-child {
    border-bottom: none;
  }

  /* Pasek po lewej dla wszystkich paneli */
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    background-color: rgba(var(--v-theme-primary), 0.3); // domyślny pasek
    transition: background-color 0.2s ease;
  }

  /* Panel zamknięty */
  &:not(.v-expansion-panel--active) {
    background-color: rgba(var(--v-theme-primary), 0.05);

    &:hover {
      background-color: rgba(var(--v-theme-primary), 0.1);
      cursor: pointer;

      &::before {
        background-color: rgba(var(--v-theme-primary), 0.5); // intensywniejszy pasek przy hover
      }
    }
  }

  /* Panel rozwinięty */
  &.v-expansion-panel--active {
    background-color: transparent; // brak tła dla rozwiniętego panelu
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);

    &::before {
      background-color: rgb(var(--v-theme-primary)); // pełny pasek
    }
  }
}

/* Minimalna wysokość tytułu panelu */
.v-expansion-panel--active > .v-expansion-panel-title:not(.v-expansion-panel-title--static) {
  min-height: 48px;
}

:deep(.v-expansion-panel-title) {
  justify-content: flex-start;
}
</style>
