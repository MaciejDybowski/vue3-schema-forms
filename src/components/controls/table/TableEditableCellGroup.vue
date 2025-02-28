<template>
  <div
    class="cell-content"
    v-bind="attrs"
    :style="{ backgroundColor: computedBackgroundColor, gap: '4px' }"
  >
    <div v-for="item in items" :key="item.valueMapping" class="d-flex align-center justify-space-between ">
      <label :style="labelStyle">{{ item.label }}</label>
      <input
        v-bind="inputAttrs"
        :value="get(row, item.valueMapping, '')"
        @input="(e:any) => emit('update:field', { value: e.target.value, valueMapping: item.valueMapping })"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import jsonata from "jsonata";
import get from "lodash/get";
import { computed, onMounted, ref, useAttrs } from "vue";
import { useTheme } from "vuetify";
import type { HeaderEditableObject, TableHeader } from "@/types/shared/Source";

const { current } = useTheme();
const isDarkTheme = computed(() => current.value.dark);
const props = defineProps<{ header: TableHeader; items: HeaderEditableObject[]; row: object }>();
const emit = defineEmits<{ (e: "update:field", val: any): void }>();
const attrs = useAttrs();
const backgroundColor = ref("transparent");

const computedBackgroundColor = computed(() =>
  isDarkTheme.value && backgroundColor.value === "transparent" ? "#424242" : backgroundColor.value
);

const labelStyle = computed(() => ({
  color: isDarkTheme.value ? "#FFFFFF" : "#000000",
  minWidth: "100px",
  marginRight: "8px",
}));

const inputAttrs = computed(() => ({
  class: "flex-grow-1 text-body-2 px-2 border rounded mb-1",
  type: "text",
  style: {
    height: "32px",
    borderColor: isDarkTheme.value ? "#616161" : "#C0C0C0",
    backgroundColor: isDarkTheme.value ? "#616161" : "#FFFFFF",
    color: isDarkTheme.value ? "#FFFFFF" : "#000000",
    maxWidth: "120px",
    textAlign: "right",
  },
}));

async function getBackgroundColor(header: TableHeader, item: object) {
  if (header.color) {
    try {
      const result = await jsonata(header.color).evaluate({ header, ...item });
      return result || "transparent";
    } catch {
      return "transparent";
    }
  }
  return "transparent";
}

onMounted(async () => {
  backgroundColor.value = await getBackgroundColor(props.header, props.row);
});
</script>

<style scoped></style>
