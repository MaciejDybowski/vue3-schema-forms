<template>
  <v-row
    v-if="columns.length > 0"
    class="fields-columns"
  >
    <v-col
      v-for="(column, index) in columns"
      :key="index"
      :class="column.class"
      :cols="getColumnCols(column)"
    >
      <form-root
        :model="model"
        :options="computedOptions"
        :schema="column.schema"
        @update:model="updateModel"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { DisplayBreakpoint, useDisplay } from 'vuetify';

import FormRoot from '@/components/engine/FormRoot.vue';

import { useFormModel } from '@/core/composables';
import { EngineField } from '@/types/engine/EngineField';
import { Cols } from '@/types/shared/Cols';
import { FieldsColumn } from '@/types/shared/Layout';

const props = defineProps<{
  schema: EngineField;
  model: object;
}>();

const display = useDisplay();
const { setValue } = useFormModel();

const columns = computed<FieldsColumn[]>(() => props.schema.layout.columns || []);

function updateModel(payload: any) {
  setValue(payload.value, { key: payload.key, dataPath: payload.dataPath, on: props.schema.on } as any);
}

const computedOptions = computed(() => {
  const layoutProps = props.schema.layout?.props;

  if (!layoutProps || Object.keys(layoutProps).length === 0) {
    return props.schema.options;
  }

  const originalOptions: any = props.schema.options || {};
  const newOptions: any = {};

  Object.keys(originalOptions).forEach((key) => {
    const opt = originalOptions[key] || {};
    newOptions[key] = { ...opt };
  });

  Object.keys(layoutProps).forEach((lpKey) => {
    Object.keys(newOptions).forEach((newOptionsKey) => {
      newOptions[newOptionsKey][lpKey] = layoutProps[lpKey];
    });
  });

  return newOptions;
});

function getColumnCols(column: FieldsColumn): number {
  if (column.cols === undefined) return 12;
  if (typeof column.cols === 'object') return getColsByDisplay(display.name.value, column.cols);
  return column.cols;
}

function getColsByDisplay(displayBreakpoint: DisplayBreakpoint, cols: Cols): number {
  switch (displayBreakpoint) {
    case 'xxl':
      return cols.xxl || 12;
    case 'xl':
      return cols.xl || 12;
    case 'lg':
      return cols.lg || 12;
    case 'md':
      return cols.md || 12;
    case 'sm':
      return cols.sm || 12;
    case 'xs':
      return cols.xs || 12;
  }
}
</script>

<style lang="scss" scoped>
.fields-columns {
  align-items: stretch;
}
</style>
