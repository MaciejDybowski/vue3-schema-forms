<template>
  <table-field
    :aggregates="aggregates"
    :items="items"
    :items-total-elements="itemsTotalElements"
    :load-data="loadData"
    :loading="loading"
    :schema="schema"
    :table-action-popup-update="tableActionPopupUpdate"
    :update-row="updateRow"
    @btnModeInternalRemoveRecord="removeRow"
    @btn-mode-internal-duplicate-record="duplicateRecord"
    @btn-mode-internal-add-record="(payload) => addRecord(payload)"
  />
</template>

<script lang="ts" setup>
import axios from 'axios';
import jsonata from 'jsonata';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';

import { computed, ref } from 'vue';

import TableField from '@/components/controls/table/TableField.vue';
import { TableFetchOptions } from '@/components/controls/table/table-types';

import { useFormModel, useResolveVariables } from '@/core/composables';
import { useEventHandler } from '@/core/composables/useEventHandler';
import { variableRegexp } from '@/core/engine/utils';
import { EngineTableField } from '@/types/engine/EngineTableField';
import { EventVariable } from '@/types/shared/EventHandlerDefinition';
import { HeaderEditableObject } from '@/types/shared/Source';

const { onChange } = useEventHandler();
const { getValue, setValue } = useFormModel();

const { schema, model } = defineProps<{
  schema: EngineTableField;
  model: object;
}>();

const localModel = computed({
  get(): any[] {
    return getValue(model, schema);
  },
  set(val: any) {
    setValue(val, schema);
  },
});

const loading = ref(true);
const items = ref<any[]>([]);
const itemsTotalElements = ref(0);
const aggregates = ref(null);
const visibleRowIndexes = ref<number[]>([]);
const { resolve, fillPath } = useResolveVariables();
const lastFetchParams = ref<TableFetchOptions>({
  page: 1,
  size: 10,
  sort: [],
  filter: null,
  query: null,
});

async function loadData(params: TableFetchOptions) {
  loading.value = true;
  lastFetchParams.value = params;
  await refreshVisibleItems(params);

  aggregates.value = null; // TODO

  loading.value = false;
}

async function refreshVisibleItems(params: TableFetchOptions = lastFetchParams.value) {
  const modelItems = localModel.value ?? [];
  const filteredByItemsFilter = await applyItemsFilter(modelItems);
  const condition = schema.source.rowVisibleCondition;
  let filteredItems = filteredByItemsFilter.items;
  let filteredIndexes = filteredByItemsFilter.indexes;

  if (condition) {
    const rowVisibleItems: any[] = [];
    const rowVisibleIndexes: number[] = [];
    let nata;

    try {
      nata = jsonata(condition);
    } catch (e) {
      console.warn('compile rowVisibleCondition error', e);
      paginateItems(filteredItems, filteredIndexes, params);
      return;
    }

    for (let index = 0; index < filteredItems.length; index++) {
      const item = filteredItems[index];

      try {
        const result = await nata.evaluate(item);

        if (Boolean(result)) {
          rowVisibleItems.push(item);
          rowVisibleIndexes.push(filteredIndexes[index]);
        }
      } catch (e) {
        console.warn('evaluate rowVisibleCondition error', e);
        rowVisibleItems.push(item);
        rowVisibleIndexes.push(filteredIndexes[index]);
      }
    }

    filteredItems = rowVisibleItems;
    filteredIndexes = rowVisibleIndexes;
  }

  paginateItems(filteredItems, filteredIndexes, params);
}

async function applyItemsFilter(modelItems: any[]) {
  const itemsFilter = schema.source.itemsFilter;

  if (!itemsFilter) {
    return {
      items: modelItems,
      indexes: modelItems.map((_, index) => index),
    };
  }

  try {
    const resolvedFilter = await resolveItemsFilterExpression(itemsFilter);
    const result = await jsonata(resolvedFilter).evaluate({ items: modelItems });
    const filteredItems = Array.isArray(result) ? result : result == null ? [] : [result];

    return {
      items: filteredItems,
      indexes: mapFilteredIndexes(modelItems, filteredItems),
    };
  } catch (e) {
    console.warn('evaluate itemsFilter error', e);
    return {
      items: modelItems,
      indexes: modelItems.map((_, index) => index),
    };
  }
}

async function resolveItemsFilterExpression(expression: string) {
  const matches = expression.match(variableRegexp);

  if (!matches) return expression;

  let resolvedExpression = expression;

  for await (const match of matches) {
    let variable = match.slice(1, -1);
    variable = fillPath(schema.path, schema.index, variable);

    const value = await jsonata(variable).evaluate(model);
    resolvedExpression = resolvedExpression.replace(match, JSON.stringify(value ?? null));
  }

  return resolvedExpression;
}

function mapFilteredIndexes(modelItems: any[], filteredItems: any[]) {
  const usedIndexes = new Set<number>();
  const idMapper = schema.source.idMapper;

  return filteredItems.map((item, fallbackIndex) => {
    const itemId = idMapper ? get(item, idMapper) : null;
    const index = modelItems.findIndex((modelItem, modelIndex) => {
      if (usedIndexes.has(modelIndex)) return false;
      if (idMapper && itemId != null && get(modelItem, idMapper) === itemId) return true;
      return isEqual(modelItem, item);
    });

    const resolvedIndex = index >= 0 ? index : fallbackIndex;
    usedIndexes.add(resolvedIndex);
    return resolvedIndex;
  });
}

function paginateItems(filteredItems: any[], filteredIndexes: number[], params: TableFetchOptions) {
  itemsTotalElements.value = filteredItems.length;
  const start = (params.page - 1) * params.size;
  const end = start + params.size;

  items.value = filteredItems.slice(start, end);
  visibleRowIndexes.value = filteredIndexes.slice(start, end);
}

function getModelRowIndex(visibleIndex: number) {
  return visibleRowIndexes.value[visibleIndex] ?? visibleIndex;
}

async function updateRow(value: any, header: HeaderEditableObject, rowData: any, rowIndex: number) {
  /* console.debug(`Index = ${index}, newValue = `, value);
  console.debug(`row = `, row);
  console.debug(`headerDefinition = `, tableHeader);*/
  const tempRow = { ...rowData, [header.valueMapping.split(':')[0]]: value };

  if (header.onChange) {
    header.onChange.variables?.forEach((variable: EventVariable) => {
      tempRow[variable.path] = variable.value;
    });
  }

  const modelItems = localModel.value ?? [];
  modelItems[getModelRowIndex(rowIndex)] = { ...tempRow };
  localModel.value = modelItems;

  if (schema.source.itemsFilter || schema.source.rowVisibleCondition) {
    await refreshVisibleItems();
  } else {
    items.value[rowIndex] = { ...tempRow };
  }

  await onChange(schema, model);
}

async function createUpdateRowURL(item: any) {
  let resolved = (await resolve(schema, schema.source.data)).resolvedText;

  let [updateRowURL] = resolved.split('?');

  updateRowURL += '/{dataId}';
  const rawWithDataId = resolved + '/{dataId}';
  const matches = rawWithDataId.match(variableRegexp);

  if (matches) {
    matches.forEach((variable) => {
      const unwrapped = variable.slice(1, -1);
      updateRowURL = updateRowURL.replaceAll(variable, get(item, unwrapped, null));
    });
  }

  return updateRowURL;
}

async function tableActionPopupUpdate(actionPopup: any) {
  const payload = actionPopup.model;
  const updateRowURL = await createUpdateRowURL(actionPopup.item);
  const response = await axios.post(updateRowURL, payload);
  const modelItems = [...(localModel.value ?? [])];
  modelItems[getModelRowIndex(actionPopup.itemIndex)] = response.data.content;
  localModel.value = modelItems;
  await refreshVisibleItems();
}

async function removeRow(payload: { index: number }) {
  const modelIndex = getModelRowIndex(payload.index);
  localModel.value = (localModel.value ?? []).filter((i, idx) => idx !== modelIndex);
  await refreshVisibleItems();
  await onChange(schema, model);
}

async function duplicateRecord(payload: { index: number; rowData: any }) {
  const modelItems = [...(localModel.value ?? [])];
  modelItems.splice(getModelRowIndex(payload.index) + 1, 0, payload.rowData);
  localModel.value = modelItems;
  await refreshVisibleItems();
  await onChange(schema, model);
}

async function addRecord(payload: any) {
  localModel.value = [...(localModel.value ?? []), payload];
  await refreshVisibleItems();
  await onChange(schema, model);
}
</script>

<style lang="css" scoped></style>
