<template>
  <v-expansion-panels
    v-model="openPanels"
    elevation="0"
    flat
    multiple
    variant="accordion"
  >
    <v-expansion-panel
      v-for="{ panel, index } in visiblePanels"
      :key="getPanelId(panel, index)"
      :value="index"
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
          :model="props.model"
          :options="computedOptions"
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
import jsonata from 'jsonata';

import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

import FormRoot from '@/components/engine/FormRoot.vue';

import { useFormModel, useResolveVariables } from '@/core/composables';
import { variableRegexp } from '@/core/engine/utils';
import { EngineExpansionPanel, EngineExpansionPanels } from '@/types/engine/controls';
import { Schema } from '@/types/schema/Schema';
import { SchemaField } from '@/types/schema/SchemaField';

const props = defineProps<{
  schema: EngineExpansionPanels;
  model: object;
}>();

const { setValue } = useFormModel();
const { resolve, fillPath } = useResolveVariables();
const vueSchemaFormEventBus = useEventBus<string>('form-model');

const computedOptions = computed(() => {
  const defaultOptions = props.schema.options || {};
  const layoutProps = props.schema.layout?.props;

  if (!layoutProps || Object.keys(layoutProps).length === 0) {
    return defaultOptions;
  }
  if(layoutProps.readonly) {
    return { ...defaultOptions,
    fieldProps: {
      ...defaultOptions.fieldProps,
      readonly: true,
    }};
  }
})

function generatePanelsId(): string {
  const schemaKey = props.schema.key || '';
  const path = 'path' in props.schema ? props.schema.path : '';
  const panelTitlesHash = props.schema.panels.map(p => p.title).join('|');
  return `expansion-panels-${schemaKey}-${path}-${panelTitlesHash}`.replace(/\s+/g, '_');
}

function getPanelId(panel: EngineExpansionPanel, index: number): string {
  return `${panelsId}-panel-${index}-${panel.title}`.replace(/\s+/g, '_');
}
const panelsId = generatePanelsId();
const storedPanelState = useLocalStorage<number[]>(`${panelsId}-state`, []);

function resolveInitialOpenPanels(): number[] {
  const maxIndex = props.schema.panels.length - 1;
  const sanitizedStoredState = Array.from(new Set(storedPanelState.value))
    .filter((panelIndex) => Number.isInteger(panelIndex) && panelIndex >= 0 && panelIndex <= maxIndex);
  const storedStateSet = new Set(sanitizedStoredState);

  return props.schema.panels.reduce<number[]>((result, panel, index) => {
    if (typeof panel.openByDefault === 'boolean') {
      if (panel.openByDefault) {
        result.push(index);
      }
      return result;
    }

    if (storedStateSet.has(index)) {
      result.push(index);
    }

    return result;
  }, []);
}

const jsonataCache = new Map<string, any>();

const visiblePanels = ref<{ panel: EngineExpansionPanel; index: number }[]>(
  props.schema.panels.map((panel, index) => ({ panel, index })),
);

async function evaluateCondition(condition: string): Promise<boolean> {
  try {
    let expression = condition.trim();
    if (expression.startsWith('nata(') && expression.endsWith(')')) {
      expression = expression.substring(5, expression.length - 1);
    }
    const filledExpression = fillPath(props.schema.path, props.schema.index, expression);

    let compiled = jsonataCache.get(filledExpression);
    if (!compiled) {
      compiled = jsonata(filledExpression);
      jsonataCache.set(filledExpression, compiled);
    }

    const result = await compiled.evaluate(props.model);
    return !!result;
  } catch (e) {
    console.error('Error evaluating condition:', condition, e);
    return false;
  }
}

async function refreshConditions() {
  const results = await Promise.all(
    props.schema.panels.map(async (panel, i) => {
      let isHidden = false;
      if (panel.hideCondition) {
        isHidden = await evaluateCondition(panel.hideCondition);
      }

      let shouldOpen = false;
      if (panel.openCondition && !isHidden) {
        shouldOpen = await evaluateCondition(panel.openCondition);
      }

      return { isHidden, shouldOpen, panel, index: i };
    }),
  );

  const newVisiblePanels: { panel: EngineExpansionPanel; index: number }[] = [];
  const currentOpenPanels = [...openPanels.value];
  let openPanelsChanged = false;

  results.forEach((res) => {
    if (!res.isHidden) {
      newVisiblePanels.push({ panel: res.panel, index: res.index });
      if (res.shouldOpen && !currentOpenPanels.includes(res.index)) {
        currentOpenPanels.push(res.index);
        openPanelsChanged = true;
      }
    }
  });

  visiblePanels.value = newVisiblePanels;
  if (openPanelsChanged) {
    openPanels.value = currentOpenPanels;
  }
}

const openPanels = ref<number[]>(resolveInitialOpenPanels());

watch(openPanels, (newValue) => {
  storedPanelState.value = newValue;
}, { deep: true });


function updateModel(payload: any) {
  setValue(payload.value, { key: payload.key, on: props.schema.on } as any);
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
  props.schema.panels.map((p) => {
    if ('path' in props.schema && 'index' in props.schema && props.schema.path !== undefined && props.schema.index !== undefined) {
      return createPanelSchemaWithContext(p.schema, props.schema.path, props.schema.index);
    }
    return p.schema;
  }),
);

const panelTitles = ref<any[]>([]);

onMounted(async () => {
  panelTitles.value = props.schema.panels.map((p: EngineExpansionPanel) => ({
    resolvedText: p.title,
  }));

  Promise.all(
    props.schema.panels.map(async (p: EngineExpansionPanel) => {
      return await resolve(props.schema, p.title);
    }),
  ).then((resolved) => {
    panelTitles.value = resolved;
  });

  const hasVariables = props.schema.panels.some((p) => p.title.match(variableRegexp));

  let unsubscribe: (() => void) | undefined;
  if (hasVariables || props.schema.panels.some((p) => p.hideCondition || p.openCondition)) {
    unsubscribe = vueSchemaFormEventBus.on(async () => {
      await new Promise((r) => setTimeout(r, 110));
      panelTitles.value = await Promise.all(
        props.schema.panels.map(async (p) => await resolve(props.schema, p.title)),
      );
      await refreshConditions();
    });
  }

  await refreshConditions();

  onUnmounted(() => {
    if (unsubscribe) unsubscribe();
  });
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
