<template>
  <v-text-field
    width="100%"
    v-for="item in items"
    :key="item.valueMapping"
    :class="[(item.rules && item.rules.length > 0) || items.length <= 1 ? 'content-right' : 'pb-4 content-right']"
    :label="item.label"
    :model-value="getValue(item.valueMapping)"

    v-bind="{ ...attrs, density: 'compact' }"
    @input="(e: any) => emit('update:field', { value: e.target.value, valueMapping: item.valueMapping })"
  />
</template>

<script lang="ts" setup>
import get from "lodash/get";
import { useAttrs } from "vue";

import { useNumber } from "@/core/composables/useNumber";
import type { HeaderEditableObject, TableHeader } from "@/types/shared/Source";

const props = defineProps<{ header: TableHeader; items: HeaderEditableObject[]; row: object }>();
const emit = defineEmits<{ (e: "update:field", val: any): void }>();
const attrs = useAttrs();
const { formattedNumber } = useNumber();

function getValue(valueMapping: string) {
  // invoicePrice:0:NUMBER:2
  const split = valueMapping.split(":");
  let variable = split[0];
  const defaultValue = split.length >= 2 ? split[1] : null;
  const typeOfValue = split.length >= 3 ? split[2] : null;
  const formatterProps = split.length == 4 ? split[3] : (null as any);

  let value = get(props.row, variable, null);

  if (typeOfValue == "NUMBER") {
    let decimalPlaces = 4;
    if (isNaN(formatterProps)) {
      decimalPlaces = get(props.row, formatterProps, 2);
    } else {
      decimalPlaces = formatterProps;
    }
    value = formattedNumber(value, "decimal", decimalPlaces, decimalPlaces);
  }
  console.debug(value)

  return value;
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
