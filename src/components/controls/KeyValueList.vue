<template>
  <div>
    <label
      v-if="label"
      class="v-label mb-1"
    >
      {{ label }}
    </label>
    <v-row
      class="ma-0 pa-0"
      no-gutters
    >
      <v-col
        v-for="header in headers"
        :key="header.title"
        :cols="12 / headers.length"
      >
        <b>{{ header.title }}</b>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-list-item
      v-for="(item, index) in localModel"
      :key="index"
      class="ma-0 pa-0"
      density="compact"
    >
      <v-row
        align="center"
        class="ma-0 pa-0"
        no-gutters
      >
        <v-col
          v-for="(x, k) in headers"
          :cols="12 / headers.length"
          class="pa-0 ma-0"
        >
          {{ get(item, headers[k].valueMapping) }}
        </v-col>
      </v-row>
      <v-divider />
    </v-list-item>
  </div>
</template>

<script lang="ts" setup>
import get from 'lodash/get';

import { computed, onMounted } from 'vue';

import { useFormModel, useLabel } from '@/core/composables';
import { EngineField } from '@/types/engine/EngineField';

const { schema, model } = defineProps<{
  schema: EngineField;
  model: object;
}>();
const { getValue } = useFormModel();
const { label, bindLabel } = useLabel(schema);

const localModel = computed(() => {
  return getValue(model, schema);
});

onMounted(async () => {
  await bindLabel(schema);
});

const headers = schema.config;
</script>

<style lang="css" scoped></style>
