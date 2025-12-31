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
import { useEventBus } from '@vueuse/core';
import axios from 'axios';
import get from 'lodash/get';

import { ref } from 'vue';

import TableField from '@/components/controls/table/TableField.vue';
import { TableFetchOptions } from '@/components/controls/table/table-types';
import { mapQuery, mapSort } from '@/components/controls/table/utils';

import { useResolveVariables } from '@/core/composables';
import { variableRegexp } from '@/core/engine/utils';
import { toast } from '@/main';
import { EngineTableField } from '@/types/engine/EngineTableField';
import { HeaderEditableObject } from '@/types/shared/Source';

const { schema } = defineProps<{
  schema: EngineTableField;
}>();

const vueSchemaFormEventBus = useEventBus<string>('form-model');

const loading = ref(true);
const items = ref<any[]>([]);
const itemsTotalElements = ref(0);
const aggregates = ref(null);

const { resolve, fillPath } = useResolveVariables();

async function loadData(params: TableFetchOptions) {
  try {
    loading.value = true;
    items.value = [];

    const url = (await resolve(schema, schema.source.data)).resolvedText;
    const sort = params.sort ? mapSort(params.sort) : null;
    const query = mapQuery(params.query);
    const filter = params.filter ? params.filter : null;

    const response = await axios.get(`${url}`, {
      params: {
        page: params.page - 1,
        size: params.size,
        query: query,
        sort: sort,
        filter: filter,
      },
    });

    items.value = response.data.content;
    itemsTotalElements.value = mapTotalElements(response.data);
    aggregates.value =
      'aggregates' in response.data && response.data.aggregates != null
        ? response.data.aggregates
        : null;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
}

function mapTotalElements(data: any) {
  return data.page.totalElements;
}

async function updateRow(value: any, header: HeaderEditableObject, rowData: any, rowIndex:number) {
  const headerKey = header.valueMapping.split(':')[0];

  try {
    const payload: Record<string, any> = {};
    payload[headerKey] = value;

    const updateRowURL = await createUpdateRowURL(rowData);
    //console.debug(`Save new value by calling API endpoint ${updateRowURL} with payload`, payload);
    const response = await axios.post(updateRowURL, payload);
    items.value[rowIndex] = response.data.content;

    if (aggregates.value != null) {
      aggregates.value = response.data.aggregates;
      await new Promise((r) => setTimeout(r, 1));
      vueSchemaFormEventBus.emit('model-changed', 'table-aggregates');
    }
  } catch (e: any) {
    if (toast != null) {
      // debounced.showToast(e.response.data.message);
      // TODO
    }
  }
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
