<template>
  <v-text-field
    v-for="(item, index) in items"
    :key="item.valueMapping"
    :class="[(item.rules && item.rules.length > 0) || items.length <= 1 ? 'content-right' : 'pb-4 content-right']"
    :label="item.label"
    :model-value="getValue(item.valueMapping, index)"
    v-bind="{ ...attrs, density: 'compact' }"
    width="100%"
    @focusin="showFormattedNumber[index] = false"
    @focusout="showFormattedNumber[index] = true"
    @input="(e: any) => emit('update:field', { value: e.target.value.replaceAll(',', '.'), valueMapping: item.valueMapping })"
    @keyup.enter="(e) => e.target.blur()"
  />
</template>

<script lang="ts" setup>
import get from "lodash/get";
import { ref, useAttrs, watchEffect } from "vue";

import { useNumber } from "@/core/composables/useNumber";
import type { HeaderEditableObject, TableHeader } from "@/types/shared/Source";

const props = defineProps<{ header: TableHeader; items: HeaderEditableObject[]; row: object }>();
const emit = defineEmits<{ (e: "update:field", val: any): void }>();
const attrs = useAttrs();
const { formattedNumber } = useNumber();

function getValue(valueMapping: string, index: number) {
  // invoicePrice:0:NUMBER:2
  const split = valueMapping.split(":");
  let variable = split[0];
  const defaultValue = split.length >= 2 ? split[1] : null;
  const typeOfValue = split.length >= 3 ? split[2] : null;
  const formatterProps = split.length == 4 ? split[3] : (null as any);

  let value = get(props.row, variable, null);

  if (typeOfValue == "NUMBER" && showFormattedNumber.value[index]) {
    let decimalPlaces = 4;
    if (isNaN(formatterProps)) {
      decimalPlaces = get(props.row, formatterProps, 2);
    } else {
      decimalPlaces = formatterProps;
    }
    value = formattedNumber(value, "decimal", decimalPlaces, decimalPlaces);
    return value;
  }

  console.debug("bez if", value)
  return value;
}

const showFormattedNumber = ref<Array<boolean>>([]);
watchEffect(() => {
  showFormattedNumber.value = new Array(props.items.length).fill(true);
});
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
<script setup lang="ts">
</script>