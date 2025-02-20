<template>
  <div
    :style="{
      backgroundColor: isDarkTheme && backgroundColor == 'transparent' ? '#424242' : backgroundColor,
      gap: '4px',
    }"
    v-bind="attrs"
  >
    <div
      v-for="editableItem in items"
      :key="editableItem.valueMapping"
      class="d-flex align-center justify-space-between"
    >
      <label
        :style="{ color: isDarkTheme ? '#FFFFFF' : '#000000', minWidth: '100px', marginRight: '8px' }"
      >
        {{ editableItem.label }}
      </label>
      <input
        :style="{
          height: '32px',
          borderColor: isDarkTheme ? '#616161' : '#C0C0C0',
          backgroundColor: isDarkTheme ? '#616161' : '#FFFFFF',
          color: isDarkTheme ? '#FFFFFF' : '#000000',
          maxWidth: '170px'
        }"
        :value="get(row, editableItem.valueMapping, null)"
        class="flex-grow-1 text-body-2 px-2 border rounded mb-1"
        type="text"
        @input="(event: any) => emit('update:field', { value: event.target.value, valueMapping: editableItem.valueMapping })"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import jsonata from "jsonata";
import get from "lodash/get";
import { computed, onMounted, ref, useAttrs } from "vue";
import { useTheme } from "vuetify";

import { HeaderEditableObject, TableHeader } from "@/types/shared/Source";

const { current } = useTheme();

const isDarkTheme = computed(() => current.value.dark);

const props = defineProps<{
  header: TableHeader;
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

onMounted(async () => {
  backgroundColor.value = await getBackgroundColor(props.header, props.row);
});
</script>

<style lang="css" scoped></style>
