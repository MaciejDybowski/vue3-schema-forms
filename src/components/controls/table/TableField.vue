<template>
  <v-data-table
    :headers="headers"
    :items="items"
    density="compact"
  >
    <template
      v-for="header in headers"
      :key="header.key"
      #[`item.${header.key}`]="{ item, index }"
    >
      <span v-if="!header.editable">
        {{ item[header.key] }}
      </span>

      <editable-cell
        v-else
        v-model="items[index][header.key]"
        v-bind="fieldProps"
      />
    </template>
  </v-data-table>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

import EditableCell from "@/components/controls/table/EditableCell.vue";

import { useProps } from "@/core/composables";
import { EngineTextField } from "@/types/engine/controls";

const props = defineProps<{
  schema: EngineTextField;
  model: object;
}>();
const { bindProps, fieldProps } = useProps();

const headers = [
  {
    title: "Name",
    key: "name",
  },
  {
    title: "Location",
    key: "location",
    editable: true,
    minWidth: "150px",
    maxWidth: "150px",
  },
  {
    title: "Height",
    key: "height",
  },
  {
    title: "Base",
    key: "base",
  },
  {
    title: "Volume",
    key: "volume",
  },
];

const items = ref([
  {
    name: "🍎 Apple",
    location: "Washington",
    height: "0.1",
    base: "0.07",
    volume: "0.0001",
  },
  {
    name: "🍌 Banana",
    location: "Ecuador",
    height: "0.2",
    base: "0.05",
    volume: "0.0002",
  },
  {
    name: "🍇 Grapes",
    location: "Italy",
    height: "0.02",
    base: "0.02",
    volume: "0.00001",
  },
  {
    name: "🍉 Watermelon",
    location: "China",
    height: "0.4",
    base: "0.3",
    volume: "0.03",
  },
  {
    name: "🍍 Pineapple",
    location: "Thailand",
    height: "0.3",
    base: "0.2",
    volume: "0.005",
  },
  {
    name: "🍒 Cherries",
    location: "Turkey",
    height: "0.02",
    base: "0.02",
    volume: "0.00001",
  },
  {
    name: "🥭 Mango",
    location: "India",
    height: "0.15",
    base: "0.1",
    volume: "0.0005",
  },
  {
    name: "🍓 Strawberry",
    location: "USA",
    height: "0.03",
    base: "0.03",
    volume: "0.00002",
  },
  {
    name: "🍑 Peach",
    location: "China",
    height: "0.09",
    base: "0.08",
    volume: "0.0004",
  },
  {
    name: "🥝 Kiwi",
    location: "New Zealand",
    height: "0.05",
    base: "0.05",
    volume: "0.0001",
  },
]);

onMounted(async () => {
  await bindProps(props.schema);
});
</script>

<style lang="css" scoped></style>

<i18n lang="json">
{
  "en": {},
  "pl": {}
}
</i18n>
