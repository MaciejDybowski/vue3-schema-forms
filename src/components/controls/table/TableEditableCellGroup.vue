<template>
  <div
    v-for="(item, index) in items"
    :key="item.valueMapping"
    v-bind="attrs"
  >
    <v-text-field
      v-if="item.type == 'NUMBER'"
      :class="[(item.rules && item.rules.length > 0) || items.length <= 1 ? `content-right ${item.class}` : `pb-4 content-right ${item.class}`]"
      :label="item.label"
      :model-value="getValue(item.valueMapping, index)"
      v-bind="{ ...attrs, density: 'compact' }"
      width="100%"
      @focusin="showFormattedNumber[index] = false"
      @focusout="showFormattedNumber[index] = true"
      @input="(e: any) => emit('update:field', { value: e.target.value.replaceAll(',', '.'), valueMapping: item.valueMapping })"
      @keyup.enter="(e) => e.target.blur()"
    />
    <!--    <v-number-input
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
        </v-number-input>-->

    <v-select
      v-if="item.type == 'SELECT' && shouldRenderMap[item.valueMapping]"
      :item-title="getItemTitle(item.valueMapping)"
      :item-value="getItemValue(item.valueMapping)"
      :items="getItemsForSelect(item.valueMapping, row)"
      :label="item.label"
      :model-value="getValue(item.valueMapping, index)"
      :return-object="false"
      v-bind="{ ...attrs, density: 'compact' }"
      width="100%"
      @keyup.enter="(e) => e.target.blur()"
      @update:model-value="(e: any) => emitData(e, item)"
      :class="`${item.class}`"
      :clearable="true"
    />
  </div>
</template>

<script lang="ts" setup>
import jsonata from "jsonata";
import get from "lodash/get";
import { computed, onMounted, ref, useAttrs, watch, watchEffect } from "vue";

import { useNumber } from "@/core/composables/useNumber";
import type { HeaderEditableObject, TableHeader } from "@/types/shared/Source";

const props = defineProps<{ header: TableHeader; items: HeaderEditableObject[]; row: object }>();
const emit = defineEmits<{ (e: "update:field", val: any): void }>();
const attrs = useAttrs();
const { formattedNumber } = useNumber();

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

/*function getValue(valueMapping: string, index: number) {
  // invoicePrice:0:NUMBER:2
  const split = valueMapping.split(":");
  let variable = split[0];
  return get(props.row, variable, null);
}*/

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

  return value;
}

const showFormattedNumber = ref<Array<boolean>>([]);
watchEffect(() => {
  showFormattedNumber.value = new Array(props.items.length).fill(true);
});

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

/* Dla wyrażen jsonata bo z racji ze to generuje w petli to nie podepne funckji asynchronicznej w template */
const shouldRenderMap = ref<Record<string, boolean>>({});

async function computeShouldRender(items: HeaderEditableObject[]) {
  const newMap: Record<string, boolean> = {};

  for (const item of items) {
    if (item.condition) {
      const nata = jsonata(item.condition);
      newMap[item.valueMapping] = await nata.evaluate(props.row);
    } else {
      newMap[item.valueMapping] = true;
    }
  }
  shouldRenderMap.value = newMap;
}

const hasCondition = computed(() => {
  return props.items.some((item) => !!item.condition);
});

onMounted(async () => {
  if (hasCondition.value) {
    await computeShouldRender(props.items); // or whatever your array is called
    watch(
      () => props.row,
      async () => await computeShouldRender(props.items),
      { deep: true },
    );
  }
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
<script lang="ts" setup></script>
