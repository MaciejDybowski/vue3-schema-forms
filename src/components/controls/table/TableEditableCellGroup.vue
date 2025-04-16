<template>
  <template
    v-for="(item, index) in items"
    :key="item.valueMapping"
  >
    <v-number-input
      v-if="item.type == 'NUMBER'"
      :class="[(item.rules && item.rules.length > 0) || items.length <= 1 ? 'content-right' : 'pb-4 content-right']"
      :hideInput="false"
      :inset="false"
      :label="item.label"
      :model-value="getValue(item.valueMapping, index)"
      :precision="getPrecision(item.valueMapping, index)"
      :reverse="false"
      control-variant="hidden"
      v-bind="{ ...attrs, density: 'compact' }"
      width="100%"
      @keyup.enter="(e) => e.target.blur()"
      @update:model-value="(e: any) => emitData(e, item)"
    >
    </v-number-input>

    <v-select
      v-if="item.type == 'SELECT'"
      :item-title="getItemTitle(item.valueMapping)"
      :item-value="getItemValue(item.valueMapping)"
      :items="getItemsForSelect(item.valueMapping, row)"
      :model-value="getValue(item.valueMapping, index)"
      v-bind="{ ...attrs, density: 'compact' }"
      width="100%"
      @keyup.enter="(e) => e.target.blur()"
      @update:model-value="(e: any) => emitData(e, item)"
    />
  </template>
</template>

<script lang="ts" setup>
import get from "lodash/get";
import { useAttrs } from "vue";

import type { HeaderEditableObject, TableHeader } from "@/types/shared/Source";

const props = defineProps<{ header: TableHeader; items: HeaderEditableObject[]; row: object }>();
const emit = defineEmits<{ (e: "update:field", val: any): void }>();
const attrs = useAttrs();

function getPrecision(valueMapping: string, index: number) {
  // invoicePrice:0:NUMBER:2
  const split = valueMapping.split(":");
  const formatterProps = split.length == 4 ? split[3] : (null as any);

  let decimalPlaces = 2;
  if (isNaN(formatterProps)) {
    decimalPlaces = get(props.row, formatterProps, 2);
  } else {
    decimalPlaces = formatterProps;
  }
  return decimalPlaces;
}

function getValue(valueMapping: string, index: number) {
  // invoicePrice:0:NUMBER:2
  const split = valueMapping.split(":");
  let variable = split[0];
  return get(props.row, variable, null);
}

function getItemTitle(valueMapping: string) {
  const split = valueMapping.split(":");
  return split.length >= 3 ? split[2] : "title";
}

function getItemValue(valueMapping: string) {
  const split = valueMapping.split(":");
  return split.length >= 4 ? split[3] : "value";
}

// TODO - przytrzymywanie tutaj strzałek nie działa bo jest aktualizacja całego wiersza i robi się jakiś breakdown/lag
function emitData(e: any, item) {
  emit("update:field", { value: e, valueMapping: item.valueMapping });
}

function getItemsForSelect(valueMapping, row) {
  const split = valueMapping.split(":");
  let path = split[1];
  return get(row, path, []);
}
</script>

<style scoped>
.content-right :deep(input) {
  text-align: right;
}

.content-center :deep(input) {
  text-align: center;
}

.content-left :deep(input) {
  text-align: left;
}
</style>
<script lang="ts" setup></script>
