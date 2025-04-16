<template>
  <div :class="[theme.global.current.value.dark ? refClass.replaceAll('light', 'dark') : refClass]">
    <template
      v-for="(collectionItem, index) in header.items"
      v-if="header.type == 'COLLECTION'"
    >
      <table-editable-cell-group
        v-if="collectionItem.editable && (collectionItem.editable as any).length > 0"
        :header="collectionItem"
        :items="collectionItem.editable as any"
        :row="item"
        v-bind="fieldProps"
        @update:field="(event) => emit('updateRow', { value: event.value, path: event.valueMapping, item })"
      />

      <table-cell
        :actions="actions"
        :header="collectionItem"
        :item="item"
      >
      </table-cell>
    </template>

    <table-cell
      v-if="!header.editable"
      :actions="actions"
      :header="header"
      :item="item"
    >
    </table-cell>

    <table-editable-cell-group
      v-else-if="isArray(header.editable) && (header.editable as any).length > 0"
      :header="header"
      :items="header.editable"
      :row="item"
      v-bind="fieldProps"
      @update:field="(event) => emit('updateRow', { value: event.value, path: event.valueMapping, item })"
    />

    <table-action-menu-wrapper
      v-if="header.key == 'actions' && header.actions"
      :header="header"
      :item="item"
      v-bind="fieldProps"
      @run-table-action-logic="(event) => emit('runTableActionLogic', { ...event })"
    />
  </div>
</template>

<script lang="ts" setup>
import jsonata from "jsonata";
import { isArray } from "lodash";
import { onMounted, ref } from "vue";
import { useTheme } from "vuetify";

import TableActionMenuWrapper from "@/components/controls/table/TableActionMenuWrapper.vue";
import TableCell from "@/components/controls/table/TableCell.vue";
import TableEditableCellGroup from "@/components/controls/table/TableEditableCellGroup.vue";

import { TableHeader, TableHeaderAction } from "@/types/shared/Source";

const props = defineProps<{
  header: TableHeader;
  item: any;
  fieldProps: any;
  actions: Record<string, string>;
}>();

const emit = defineEmits<{
  (e: "updateRow", payload: { value: string; path: string; item: any }): void;
  (e: "runTableActionLogic", payload: { action: TableHeaderAction; item: object });
}>();

const theme = useTheme();

const refClass = ref("");

async function getCssClass(header: TableHeader, item) {
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
  return "";
}

onMounted(async () => {
  refClass.value = await getCssClass(props.header, props.item);
});
</script>

<style lang="css" scoped></style>
