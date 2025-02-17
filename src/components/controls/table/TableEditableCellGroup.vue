<template>
  <div
    class="d-flex flex-wrap px-2"
    :style="{ backgroundColor: backgroundColor, gap: `4px` }"
    v-bind="attrs"
  >
    <div
      v-for="editableItem in items"
      :class="`flex-grow-1` + editableItem.class ? ` ${editableItem.class}` : ''"
      style="flex: 1 1 calc(50% - 2px); min-width: 100px; max-width: calc(50% - 2px)"
    >
      <label class="text-caption d-block">{{ editableItem.label }}</label>
      <input
        :value="get(row, editableItem.valueMapping, null)"
        class="w-100 text-body-2 px-2 border rounded mb-1"
        style="height: 32px"
        type="text"
        @input="(event: any) => emit(`update:field`, { value: event.target.value, valueMapping: editableItem.valueMapping })"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import get from "lodash/get";
import { onMounted, ref, useAttrs } from "vue";

import { HeaderEditableObject, TableHeader } from "@/types/shared/Source";
import jsonata from "jsonata";

const props = defineProps<{
  header: TableHeader
  items: Array<HeaderEditableObject>;
  row: object;
}>();

const emit = defineEmits<{
  (e: "update:field", val: any): void;
}>();

const attrs = useAttrs();
const backgroundColor = ref("transparent");

async function getBackgroundColor(header: TableHeader, item) {
  if (header.color) {
    const mergedModel = {
      header: header,
      ...item,
    };
    const nata = jsonata(header.color);
    const result = await nata.evaluate(mergedModel);
    if (result) {
      return result;
    }
  }
  return "transparent";
}

onMounted( async  () => {
  backgroundColor.value = await getBackgroundColor(props.header, props.row);
})
</script>

<style lang="css" scoped></style>
