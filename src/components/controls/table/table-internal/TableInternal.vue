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

async function loadData(params: TableFetchOptions) {
  await refreshVisibleItems();

  aggregates.value = null; // TODO

  loading.value = false;
}

async function refreshVisibleItems() {
  const modelItems = localModel.value ?? [];
  const condition = schema.source.rowVisibleCondition;

  if (!condition) {
    items.value = modelItems;
    visibleRowIndexes.value = modelItems.map((_, index) => index);
    itemsTotalElements.value = modelItems.length;
    return;
  }

  const filteredItems: any[] = [];
  const filteredIndexes: number[] = [];
  let nata;

  try {
    nata = jsonata(condition);
  } catch (e) {
    console.warn('compile rowVisibleCondition error', e);
    items.value = modelItems;
    visibleRowIndexes.value = modelItems.map((_, index) => index);
    itemsTotalElements.value = modelItems.length;
    return;
  }

  for (let index = 0; index < modelItems.length; index++) {
    const item = modelItems[index];

    try {
      const result = await nata.evaluate(item);

      if (Boolean(result)) {
        filteredItems.push(item);
        filteredIndexes.push(index);
      }
    } catch (e) {
      console.warn('evaluate rowVisibleCondition error', e);
      filteredItems.push(item);
      filteredIndexes.push(index);
    }
  }

  items.value = filteredItems;
  visibleRowIndexes.value = filteredIndexes;
  itemsTotalElements.value = filteredItems.length;
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

  const modelItems = [...(localModel.value ?? [])];
  modelItems[getModelRowIndex(rowIndex)] = { ...tempRow };
  localModel.value = modelItems;
  await refreshVisibleItems();
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
