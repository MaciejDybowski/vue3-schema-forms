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
    @btn-mode-internal-add-record="(payload) => items.push(payload)"
  />
</template>

<script lang="ts" setup>
import axios from 'axios';
import get from 'lodash/get';

import { computed, ref } from 'vue';

import TableField from '@/components/controls/table/TableField.vue';
import { TableFetchOptions } from '@/components/controls/table/table-types';

import { useFormModel, useResolveVariables } from '@/core/composables';
import { variableRegexp } from '@/core/engine/utils';
import { EngineTableField } from '@/types/engine/EngineTableField';

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

async function updateRow(value: any, index: number, headerKey: string, row: any) {
  console.debug(value, index, headerKey, row)
  items.value[index] = { ...row, [headerKey.split(":")[0]]: value };
  localModel.value = items.value;
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
</script>

<style lang="css" scoped></style>
