<template>
  <v-text-field
    v-for="item in items"
    :key="item.valueMapping"
    :class="[(item.rules && item.rules.length > 0) || items.length <= 1 ? '' : 'pb-4']"
    :label="item.label"
    :model-value="get(row, item.valueMapping, '')"
    type="number"
    v-bind="{ ...attrs, density: 'compact' }"
    @input="(e: any) => emit('update:field', { value: e.target.value, valueMapping: item.valueMapping })"
  />
</template>

<script lang="ts" setup>
import get from "lodash/get";
import { useAttrs } from "vue";

import type { HeaderEditableObject, TableHeader } from "@/types/shared/Source";

const props = defineProps<{ header: TableHeader; items: HeaderEditableObject[]; row: object }>();
const emit = defineEmits<{ (e: "update:field", val: any): void }>();
const attrs = useAttrs();
</script>

<style scoped></style>
