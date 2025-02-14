<template>
  <table-action-menu
    :show="true"
    icon="mdi-dots-vertical"
  >
    <v-list density="compact">
      <v-list-item
        v-for="action in filteredActions"
        v-if="filteredActions.length > 0"
        density="compact"
        link
        @click="emit('runTableActionLogic', { action: action, item: item })"
      >
        <v-list-item-title class="d-flex align-center">
          <v-icon v-bind="action.props" class="mr-2"> {{ action.icon }}</v-icon>
          <span>{{ action.title }}</span>
        </v-list-item-title>
      </v-list-item>
      <v-list-item
        v-else
        density="compact"
      >
        {{ t("noActions") }}
      </v-list-item>
    </v-list>
  </table-action-menu>
</template>

<script lang="ts" setup>
import jsonata from "jsonata";
import { onMounted, ref } from "vue";

import TableActionMenu from "@/components/controls/table/TableActionMenu.vue";

import { useLocale } from "@/core/composables";
import { TableHeader, TableHeaderAction } from "@/types/shared/Source";

const props = defineProps<{
  item: object;
  header: TableHeader;
}>();

const emit = defineEmits<{
  (e: "runTableActionLogic", payload: { action: TableHeaderAction; item: object }): void;
}>();

const { t } = useLocale();
const filteredActions = ref<TableHeaderAction[]>([]);

async function filteredHeaderActions(header: TableHeader, model: object) {
  const tempActions = await Promise.all(
    header.actions?.map(async (action: TableHeaderAction) => {
      if (action.condition) {
        const condition = "$boolean(" + action.condition + ")";
        const nata = jsonata(condition);
        const result = await nata.evaluate(model);
        return result == true ? action : null;
      } else {
        return action;
      }
    }) ?? [],
  );
  return tempActions.filter((item) => item != null);
}

onMounted(async () => {
  filteredActions.value = await filteredHeaderActions(props.header, props.item);
});
</script>

<style lang="css" scoped></style>
