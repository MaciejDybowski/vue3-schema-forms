<template>
  <table-action-menu
    v-if="header.mode == 'menu' || header.mode == undefined"
    :disabled="attrs.readonly == true"
    :show="true"
    icon="mdi-dots-vertical"
  >
    <v-list density="compact">
      <v-list-item
        v-for="action in filteredActions"
        v-if="filteredActions.length > 0"
        :disabled="action.disabled as boolean"
        density="compact"
        link
        @click="emit('runTableActionLogic', { action: action, item: item })"
      >
        <v-list-item-title class="d-flex align-center">
          <v-icon
            class="mr-2"
            v-bind="action.props"
          >
            {{ action.icon }}
          </v-icon>
          <span>{{ action.title }}</span>
        </v-list-item-title>
      </v-list-item>
      <v-list-item
        v-else
        density="compact"
      >
        {{ t('noActions') }}
      </v-list-item>
    </v-list>
  </table-action-menu>

  <template v-else-if="header?.mode == 'inline'">
    <div class="d-flex">
      <template v-if="filteredActions.length > 0">
        <v-tooltip
          v-for="action in filteredActions"
          :key="action.title+''"
          :disabled="!action.title"
        >
          <template #activator="{ props }">
            <v-btn
              :disabled="action.disabled as boolean"
              :icon="action.icon"
              class="px-0"
              flat
              rounded
              size="small"
              v-bind="props"
              @click="emit('runTableActionLogic', { action: action, item: item })"
            />
          </template>
          <span>{{ action.title }}</span>
        </v-tooltip>
      </template>

      <template v-else>
        <span>{{ t('noActions') }}</span>
      </template>
    </div>
  </template>
</template>

<script lang="ts" setup>
import jsonata from 'jsonata';

import { onMounted, ref, useAttrs } from 'vue';

import TableActionMenu from '@/components/controls/table/TableActionMenu.vue';

import { useLocale } from '@/core/composables';
import { TableHeader, TableHeaderAction } from '@/types/shared/Source';

const attrs = useAttrs();
const props = defineProps<{
  item: object;
  header: TableHeader;
}>();

const emit = defineEmits<{
  (e: 'runTableActionLogic', payload: { action: TableHeaderAction; item: object }): void;
}>();

const { t } = useLocale();
const filteredActions = ref<TableHeaderAction[]>([]);

async function filteredHeaderActions(header: TableHeader, model: object) {
  const tempActions = await Promise.all(
    header.actions?.map(async (action: TableHeaderAction) => {
      let include = true;

      if (action.condition) {
        const conditionExpr = jsonata(`$boolean(${action.condition})`);
        const conditionResult = await conditionExpr.evaluate(model);
        include = conditionResult === true;
      }

      if (include) {
        if (action.disabled) {
          const disabledExpr = jsonata(`$boolean(${action.disabled})`);
          const disabledResult = await disabledExpr.evaluate(model);
          action.disabled = disabledResult;
        }
        return action;
      }
      return null;
    }) ?? [],
  );

  return tempActions.filter((item) => item !== null);
}

onMounted(async () => {
  filteredActions.value = await filteredHeaderActions(props.header, props.item);
});
</script>

<style lang="css" scoped></style>
