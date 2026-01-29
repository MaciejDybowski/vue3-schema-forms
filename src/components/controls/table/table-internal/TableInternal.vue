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
const { resolve, fillPath } = useResolveVariables();

async function loadData(params: TableFetchOptions) {
  if (localModel.value) {
    items.value = localModel.value;
    itemsTotalElements.value = localModel.value.length;
  }

  aggregates.value = null; // TODO

  loading.value = false;
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
  items.value[rowIndex] = { ...tempRow };

  localModel.value = items.value;
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
  items.value[actionPopup.itemIndex] = response.data.content;
}

async function removeRow(payload: { index: number }) {
  items.value = items.value.filter((i, idx) => idx !== payload.index);
  localModel.value = items.value;
  await onChange(schema, model);
}

async function duplicateRecord(payload: { index: number; rowData: any }) {
  items.value.splice(payload.index + 1, 0, payload.rowData);
  localModel.value = items.value;
  await onChange(schema, model);
}

async function addRecord(payload: any) {
  items.value.push(payload);
  await onChange(schema, model);
}
</script>

<style lang="css" scoped></style>
