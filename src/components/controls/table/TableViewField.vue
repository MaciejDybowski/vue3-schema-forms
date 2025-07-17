<template>
  <div>
    <v-data-table-server
      v-model:items-per-page="tableOptions.itemsPerPage"
      v-model:loading="loading"
      v-model:page="tableOptions.page"
      v-model:sort-by="tableOptions.sortBy"
      :headers="headers"
      :hover="true"
      :items="items"
      :items-length="itemsTotalElements"
      class="custom-table"
      density="compact"
      @update:options="updateOptions"
    >
      <template #top>
        <v-row dense>
          <v-col
            v-for="button in filteredButtons"
            cols="auto"
          >
            <v-btn
              v-bind="{
                ...tableButtonDefaultProps,
                ...button.btnProps,
                disabled: button.disabled as boolean,
              }"
              @click="runTableBtnLogic(button)"
            >
              {{
                typeof button.label == 'string'
                  ? button.label
                  : '#' + button.label.$ref.split('/').pop()
              }}
            </v-btn>
          </v-col>
        </v-row>
      </template>

      <!-- Poniższy template dotyczy nagłówków tabeli -->
      <template
        v-for="header in headers"
        :key="header.key"
        #[`header.${header.key}`]
      >
        <div :class="header.type === 'NUMBER' ? 'text-right' : ''">
          {{ header.title }}
        </div>
      </template>

      <!-- Każda komórka -->
      <template
        v-for="header in headers"
        :key="header.key"
        #[`item.${header.key}`]="{ item, index }"
      >
        <table-cell-wrapper
          :actions="actions"
          :field-props="fieldProps"
          :header="header"
          :item="item"
          @update-row="(event) => debounced.updateRow(event.value, index, event.path, item)"
          @run-table-action-logic="(event) => runTableActionLogic(event, index)"
        />
      </template>

      <!-- miejsce przygotowane na agregaty -->

      <template
        v-if="!loading && aggregates"
        v-slot:body.append="{}"
      >
        <tr
          :class="[
            theme.global.current.value.dark
              ? 'v-data-table__tr-aggregates-dark'
              : 'v-data-table__tr-aggregates-light',
          ]"
        >
          <td v-for="(header, headerIndex) in headers">
            <table-footer-cell
              v-if="header.footerMapping"
              :aggregates="aggregates"
              :footer-mapping="header.footerMapping"
            />
          </td>
        </tr>
      </template>

      <template #bottom="{ page, itemsPerPage, pageCount }">
        <TablePagination
          :itemsPerPage="itemsPerPage"
          :itemsPerPageOptions="[5, 10, 20]"
          :page="page"
          :pageCount="pageCount"
          :total-items="itemsTotalElements"
          @update:page="(val: number) => (tableOptions.page = val)"
          @update:itemsPerPage="(val: number) => (tableOptions.itemsPerPage = val)"
        />
      </template>
    </v-data-table-server>

    <v-dialog
      v-model="actionPopup.show"
      max-width="650"
    >
      <template v-slot:default="{ isActive }">
        <v-card :title="actionPopup.title">
          <v-card-text>
            <vue-schema-forms
              ref="actionPopupReference"
              v-model="actionPopup.model"
              :options="actionPopup.options"
              :schema="actionPopup.schema"
            />
          </v-card-text>
          <v-card-actions class="mx-4">
            <v-spacer></v-spacer>

            <v-btn
              :text="t('close')"
              v-bind="{ ...tableButtonDefaultProps, color: '', variant: 'elevated' }"
              @click="isActive.value = false"
            ></v-btn>

            <v-btn
              :text="actionPopup.acceptText"
              v-bind="{ ...tableButtonDefaultProps, variant: 'elevated' }"
              @click="saveDialogForm(isActive)"
            />
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { useEventBus } from '@vueuse/core';
import axios from 'axios';
import jsonata from 'jsonata';
import { cloneDeep, debounce } from 'lodash';
import get from 'lodash/get';
import set from 'lodash/set';
import { useTheme } from 'vuetify';

import { ComputedRef, Ref, computed, onMounted, reactive, ref } from 'vue';

import TableCellWrapper from '@/components/controls/table/TableCellWrapper.vue';
import TableFooterCell from '@/components/controls/table/TableFooterCell.vue';
import TablePagination from '@/components/controls/table/TablePagination.vue';
import { TableFetchOptions, TableOptions } from '@/components/controls/table/table-types';
import { mapQuery, mapSort } from '@/components/controls/table/utils';
import VueSchemaForms from '@/components/engine/VueSchemaForms.vue';

import { useLocale, useProps, useResolveVariables } from '@/core/composables';
import { useVariableParser } from '@/core/composables/useVariableParser';
import { variableRegexp } from '@/core/engine/utils';
import { EngineTableField } from '@/types/engine/EngineTableField';
import { NodeUpdateEvent } from '@/types/engine/NodeUpdateEvent';
import { Schema } from '@/types/schema/Schema';
import { TableButton, TableHeader, TableHeaderAction } from '@/types/shared/Source';

const actionHandlerEventBus = useEventBus<string>('form-action');
const vueSchemaFormEventBus = useEventBus<string>('form-model');

vueSchemaFormEventBus.on(async (event, payload: NodeUpdateEvent | string) => {
  if (payload == 'action-callback') {
    debounced.load(fetchDataParams.value);
  }
  if (typeof payload == 'object' && triggers.includes(payload.key)) {
    actionHandlerEventBus.emit('form-action', { code: 'refresh-table', callback: refreshTable });
  }
});

function refreshTable() {
  debounced.load(fetchDataParams.value);
}

const props = defineProps<{
  schema: EngineTableField;
  model: object;
}>();

const theme = useTheme();
const { t } = useLocale();
const { bindProps, fieldProps } = useProps();
const { resolve } = useResolveVariables();
const { parse } = useVariableParser();
const items = ref<any[]>([]);
const itemsTotalElements = ref(0);
const loading = ref(true);
const debounced = {
  load: debounce(loadData, 200),
  updateRow: debounce(updateRow, 300),
};

const aggregates = ref(null);
const actions = props.schema.actions ? props.schema.actions : {};

const triggers: string[] = props.schema.triggers ? props.schema.triggers : [];

const actionPopupReference = ref();
const actionPopup = reactive<{
  errorMessages: Ref<any[]>;
  show: boolean;
  title: string;
  model: object;
  schema: Schema;
  options: object;
  item: object;
  itemIndex: number;
  acceptFunction: Function;
  acceptText: string;
}>({
  errorMessages: ref([]),
  show: false,
  title: '',
  model: {},
  schema: {} as Schema,
  options: props.schema.options,
  item: {},
  itemIndex: 0,
  acceptFunction: () => {},
  acceptText: t('save'),
});

const tableButtonDefaultProps = {
  rounded: true,
  size: 'small',
  color: 'primary',
};

const headers: ComputedRef<TableHeader[]> = computed(() => {
  return props.schema.source.headers.map(buildHeader);
});

const buildHeader = (item: TableHeader): TableHeader => {
  const {
    key,
    title,
    type,
    valueMapping,
    color,
    footerMapping,
    properties,
    items,
    editable,
    actions,
  } = item;
  //@ts-ignore - builder purpose
  const titleRef = typeof title == 'string' ? title : '#' + title.$ref.split('/').pop();
  const header: TableHeader = {
    key,
    title: titleRef,
    type,
    valueMapping,
    color,
    footerMapping,
    editable,
    items,
    actions,
  };

  if (properties) {
    Object.assign(header, properties);
  }

  return header;
};

const buttons: ComputedRef<TableButton[]> = computed(() => {
  if (props.schema.source.buttons) {
    return props.schema.source.buttons;
  } else {
    return [] as TableButton[];
  }
});
const filteredButtons = ref<TableButton[]>([]);

async function filteredButtonsFunction() {
  const tempActions = await Promise.all(
    buttons.value?.map(async (button: TableButton) => {
      // For readonly mode when whole form is in this state
      if (fieldProps.value.readonly == true) {
        button.disabled = true;
        return button;
      }

      if (button.disabled) {
        const condition = button.disabled as string;
        const nata = jsonata(condition);
        button.disabled = await nata.evaluate(items.value);
        return button;
      } else {
        return button;
      }
    }) ?? [],
  );
  return tempActions.filter((item) => item != null);
}

const tableOptions = ref<TableOptions>({
  page: 1,
  sortBy: [],
  itemsPerPage: 10,
});

const fetchDataParams = computed<TableFetchOptions>(() => {
  return {
    page: tableOptions.value.page,
    size: tableOptions.value.itemsPerPage,
    sort: tableOptions.value.sortBy,
    filter: null,
    query: null,
  };
});

async function updateOptions() {
  await loadData(fetchDataParams.value);
}

async function loadData(params: TableFetchOptions) {
  try {
    loading.value = true;
    items.value = [];

    const url = (await resolve(props.schema, props.schema.source.data)).resolvedText;

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
    filteredButtons.value = await filteredButtonsFunction();
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
}

function mapTotalElements(data: any) {
  return data.page.totalElements;
}

async function runTableBtnLogic(btn: TableButton) {
  switch (btn.mode) {
    case 'action':
      const btnConfigWithoutCode: Record<string, any> = cloneDeep(btn.config);
      delete btnConfigWithoutCode.code;
      delete btnConfigWithoutCode.body;
      const body = await createBodyObjectFromFormModel(btn.config.body);

      let payloadObject = {
        code: btn.config.code,
        body: body,
        params: { ...btnConfigWithoutCode },
      };
      actionHandlerEventBus.emit('form-action', payloadObject);
      break;
    case 'form-and-action':
      actionPopup.errorMessages = [];
      actionPopup.title = btn.config.title as string;
      actionPopup.model = {};
      actionPopup.schema = btn.schema;
      actionPopup.acceptFunction = () => {
        let payloadObject = {
          code: btn.config.code,
          body: actionPopup.model,
          params: { script: btn.config.scriptName },
        };
        actionHandlerEventBus.emit('form-action', payloadObject);
      };
      actionPopup.acceptText = btn.config.acceptText ? btn.config.acceptText : t('save');
      actionPopup.show = true;
  }
}

async function runTableActionLogic(
  payload: { action: TableHeaderAction; item: any },
  index: number,
) {
  const action = payload.action;
  switch (action.mode) {
    case 'action':
      const actionHandlerEventBus = useEventBus<string>('form-action');

      const obj = {
        mode: 'action',
        body: action.config.body,
        params: action.config.params,
      };

      let body = await createBodyObjectFromRow(obj as any, payload.item);
      let params = await createParamsObjectFromRow(obj as any, payload.item);

      let payloadObject = {
        code: action.code,
        body: body,
        params: params,
      };

      actionHandlerEventBus.emit('form-action', payloadObject);
      //console.debug("Action payload", payloadObject);
      break;

    case 'popup':
      actionPopup.errorMessages = [];
      actionPopup.title = action.title;
      set(
        actionPopup.model,
        action.modelReference ? action.modelReference : '',
        payload.item[action.modelReference as string],
      );
      actionPopup.schema = action.schema;
      actionPopup.item = payload.item;
      actionPopup.itemIndex = index;
      actionPopup.acceptFunction = async () => {
        const payload = actionPopup.model;
        const updateRowURL = await createUpdateRowURL(actionPopup.item);
        const response = await axios.post(updateRowURL, payload);
        items.value[actionPopup.itemIndex] = response.data.content;
      };
      actionPopup.show = true;
      break;
    default:
      console.warn('unknown action mode');
  }
}

async function createParamsObjectFromRow(actionObj: any, row: any) {
  let params: Record<string, any> = {};
  for (const [key, value] of Object.entries(actionObj.params)) {
    if (typeof value === 'string' && variableRegexp.test(value)) {
      const { resolvedText, allVariablesResolved } = await parse(value, row);
      console.warn(`[vue-schema-forms] Key: ${key} with Value:${value} was not resolved properly.`);
      allVariablesResolved ? (params[key] = resolvedText) : null;
    } else {
      params[key] = value;
    }
  }
  return params;
}

async function createBodyObjectFromFormModel(btnBody: object | undefined) {
  let body: Record<string, any> = {};
  if (btnBody == undefined) return body;
  const entries = Object.entries(btnBody);
  const resolvedEntries = await Promise.all(
    entries.map(async ([key, value]) => {
      if (typeof value === 'string' && variableRegexp.test(value)) {
        const { resolvedText, allVariablesResolved } = await resolve(props.schema, value as string);
        return [key, allVariablesResolved ? resolvedText : null];
      } else {
        return [key, value];
      }
    }),
  );

  resolvedEntries.forEach(([key, value]) => {
    body[key as string] = value;
  });

  return body;
}

async function createBodyObjectFromRow(actionObj: any, row: any) {
  let body: Record<string, any> = {};
  for (const [key, value] of Object.entries(actionObj.body)) {
    if (typeof value === 'string' && variableRegexp.test(value)) {
      const { resolvedText, allVariablesResolved } = await parse(value, row);
      console.warn(`[vue-schema-forms] Key: ${key} with Value:${value} was not resolved properly.`);
      allVariablesResolved ? (body[key] = resolvedText) : null;
    } else {
      body[key] = value;
    }
  }
  return body;
}

async function saveDialogForm(isActive: Ref<boolean>) {
  const { valid, messages } = await actionPopupReference.value.validate('messages');
  actionPopup.errorMessages = messages;
  if (valid) {
    actionPopup.acceptFunction();
    //const modelReference = actionPopup.action.modelReference as string;
    isActive.value = false;
  }
}

async function createUpdateRowURL(item: any) {
  let updateRowURL = props.schema.source.data;
  updateRowURL = (await resolve(props.schema, props.schema.source.data)).resolvedText;
  updateRowURL += '/{dataId}';
  if ((props.schema.source.data + '/{dataId}').match(variableRegexp)) {
    const matches = (props.schema.source.data + '/{dataId}').match(variableRegexp);
    if (matches) {
      matches.forEach((variable) => {
        const unwrapped = variable.slice(1, -1);
        updateRowURL = updateRowURL.replaceAll(variable, get(item, unwrapped, null));
      });
    }
  }
  return updateRowURL;
}

async function updateRow(value: any, index: number, headerKey: string, row: any) {
  headerKey = headerKey.split(':')[0];
  try {
    const payload: Record<string, any> = {};
    payload[headerKey] = value;

    const updateRowURL = await createUpdateRowURL(row);
    //console.debug(`Save new value by calling API endpoint ${updateRowURL} with payload`, payload);
    const response = await axios.post(updateRowURL, payload);
    items.value[index] = response.data.content;

    if (aggregates.value != null) {
      aggregates.value = response.data.aggregates;
      await new Promise((r) => setTimeout(r, 1));
      vueSchemaFormEventBus.emit('model-changed', 'table-aggregates');
    }
  } catch (e) {
    console.error(e);
  }
}

onMounted(async () => {
  await bindProps(props.schema);
  //debounced.load(fetchDataParams.value);
});

// Ustaw kolor dynamicznie
</script>

<style lang="scss" scoped>
.v-data-table__tr-aggregates-light {
  background-color: #f5f5f5;
  vertical-align: top;
}

.v-data-table__tr-aggregates-dark {
  background-color: #424242;
  vertical-align: top;
}

.custom-table :deep(.v-data-table__td:has(.table-cell-background-grey-light)) {
  background-color: #f5f5f5;
}

.custom-table :deep(.v-data-table__td:has(.table-cell-background-grey-dark)) {
  background-color: #424242;
}

.custom-table :deep(.v-data-table__td:has(.table-cell-background-blue)) {
  background-color: #2196f3;
}

.custom-table :deep(.v-data-table__td:has(.table-cell-background-yellow)) {
  background-color: #ffeb3b;
}

.custom-table :deep(.v-data-table__td:has(.table-cell-background-red)) {
  background-color: #f44336;
}

.custom-table :deep(.v-data-table__td:has(.table-cell-background-blue-light-4)) {
  background-color: #bbdefb;
}

.custom-table :deep(.v-data-table__td:has(.table-cell-background-yellow-light-4)) {
  background-color: #fff9c4;
}

.custom-table :deep(.v-data-table__td:has(.table-cell-background-red-light-4)) {
  background-color: #ffcdd2;
}

.custom-table :deep(.v-data-table__td:has(.table-cell-background-blue-dark-4)) {
  background-color: #1e88e5;
}

.custom-table :deep(.v-data-table__td:has(.table-cell-background-yellow-dark-4)) {
  background-color: #fdd835;
}

.custom-table :deep(.v-data-table__td:has(.table-cell-background-red-dark-4)) {
  background-color: #e53935;
}

.custom-table :deep(.v-data-table__td:has(.table-cell-alert-type)) {
  padding: 0 0;
  align-items: center;
  justify-content: center;
}

.custom-table :deep(.v-data-table__td:has(.table-cell-context-actions)) {
  padding: 0 0;
  align-items: center;
  justify-content: center;
}

:deep(.text-color-red) {
  color: #e53935;
}

:global(.v-theme--dark .text-color-red) {
  color: #ffcdd2;
}
</style>
