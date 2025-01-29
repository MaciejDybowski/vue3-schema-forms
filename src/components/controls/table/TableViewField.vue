<template>
  <v-data-table
    v-model:items-per-page="tableOptions.itemsPerPage"
    v-model:loading="loading"
    v-model:page="tableOptions.page"
    v-model:sort-by="tableOptions.sortBy"
    :headers="headers"
    :items="items"
    class="bg-transparent"
    density="compact"
  >
    <template #top>
      <v-row dense>
        <v-col
          v-for="button in buttons"
          cols="auto"
        >
          <v-btn
            v-bind="{ ...tableButtonDefaultProps, ...button.btnProps }"
            @click="runTableBtnLogic(button)"
          >
            {{ button.label }}
          </v-btn>
        </v-col>
      </v-row>
    </template>

    <template
      v-for="header in headers"
      :key="header.key"
      #[`header.${header.key}`]
    >
      <div :class="header.type === 'NUMBER' ? 'text-right' : ''">
        {{ header.title }}
      </div>
    </template>

    <template
      v-for="header in headers"
      :key="header.key"
      #[`item.${header.key}`]="{ item, index }"
    >
      <div v-if="header.key == 'actions'">
        <v-btn
          v-for="action in header.actions"
          :size="24"
          flat
          rounded
          @click="runTableActionLogic(action)"
        >
          <v-icon v-bind="action.props"> {{ action.icon }}</v-icon>
        </v-btn>
      </div>

      <table-cell
        v-if="!header.editable"
        :actions="actions"
        :header="header"
        :item="item"
      >
      </table-cell>

      <table-editable-cell
        v-else
        v-model="items[index][header.key]"
        v-bind="fieldProps"
        @update:row="updateRow($event, index, header.key, items[index])"
      />
    </template>

    <template v-slot:body.append="{}">
      <tr
        v-for="(aggregateKey, i) in Object.keys(aggregates)"
        class="v-data-table__tr-aggregates"
      >
        <td
          v-for="(header, headerIndex) in headers"
          :key="i"
        >
          <div v-if="headerIndex == 0">
            {{ parseAggregateKey(aggregateKey as AggregateTypes) }}
          </div>

          <div v-if="header.key in aggregates[aggregateKey]">
            {{ aggregates[aggregateKey][header.key] }}
          </div>

          <div v-else>
            <!-- empty table cells for columns that don't need a sum -->
          </div>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script lang="ts" setup>
import axios from "axios";
import { debounce, merge } from "lodash";
import { ComputedRef, computed, onMounted, ref } from "vue";

import TableCell from "@/components/controls/table/TableCell.vue";
import TableEditableCell from "@/components/controls/table/TableEditableCell.vue";
import { mapQuery, mapSort } from "@/components/controls/table/utils";

import { useLocale, useProps, useResolveVariables } from "@/core/composables";
import { variableRegexp } from "@/core/engine/utils";
import { EngineTableField } from "@/types/engine/EngineTableField";
import { TableButton, TableHeader } from "@/types/shared/Source";
import { useEventBus } from "@vueuse/core";

const actionHandlerEventBus = useEventBus<string>("form-action");
const vueSchemaFormEventBus = useEventBus<string>("form-model");

vueSchemaFormEventBus.on(async (event, payload) => {
  if (payload == "action-callback" || payload == "table-aggregates" || payload == "table-refresh") {
    debounced.load(fetchDataParams.value);
  }
});

const props = defineProps<{
  schema: EngineTableField;
  model: object;
}>();

const { bindProps, fieldProps } = useProps();
const { resolve } = useResolveVariables();

const loading = ref(true);
const debounced = {
  load: debounce(loadData, 200),
};

const tableButtonDefaultProps = {
  rounded: true,
  size: "small",
  color: "primary",
};

//  TODO - czy potrzebne to wgl takie mapowania bo i tak lecimy 1:1
const headers: ComputedRef<TableHeader[]> = computed(() => {
  return props.schema.source.headers.map((item: TableHeader) => {
    const header: TableHeader = {
      key: item.key,
      title: item.title,
      type: item.type,
    };

    if (item.properties) {
      for (const [key, value] of Object.entries(item.properties)) {
        header[key] = value;
        //console.log(`${key}: ${value}`);
      }
    }

    if (item.editable) {
      header["editable"] = item.editable;
    }

    if (item.key == "actions") {
      header["actions"] = item.actions;
    }

    return header;
  });
});

const buttons: ComputedRef<TableButton[]> = computed(() => {
  if (props.schema.source.buttons) {
    return props.schema.source.buttons;
  } else {
    return [] as TableButton[];
  }
});

const aggregates = {};
/*const aggregates = {
  sum: {
    height: 400,
    base: 3,
  },
  avg: {
    height: 200,
    base: 1.5,
  },
};*/

const actions = props.schema.actions ? props.schema.actions : {};

const { t } = useLocale();
type AggregateTypes = "sum" | "avg";

function parseAggregateKey(code: AggregateTypes): string {
  switch (code) {
    case "sum":
      return t("sum");
    case "avg":
      return t("avg");
  }
}

const items = ref<any[]>([]);
const itemsTotalElements = ref(0);

export type TableOptions = {
  groupBy?: Array<any>;
  groupDesc?: Array<any>;
  itemsPerPage: number;
  multiSort?: boolean;
  mustSort?: boolean;
  page: number;
  sortBy?: Array<any>;
  sortDesc?: Array<boolean>;
};

export type TableFetchOptions = {
  page: number;
  size: number;
  sort?: SortItem[] | null;
  filter?: TableFilter | null;
  query?: string | null;
};
export type SortItem = { key: string; order?: boolean | "asc" | "desc" };
export type TableFilter = Map<string, string>;

const tableOptions = ref<TableOptions>({
  page: 1,
  sortBy: [],
  itemsPerPage: 10,
});

const fetchDataParams = computed<TableFetchOptions>(() => {
  return {
    page: tableOptions.value ? tableOptions.value.page : 1,
    size: tableOptions.value ? tableOptions.value.itemsPerPage : 25,
    sort: tableOptions.value ? tableOptions.value.sortBy : [],
    filter: null, // TODO
    query: null, // TODO
  };
});

function updateRow(value: any, index: number, headerKey: string, row: any) {
  try {
    const payload = {};
    payload[headerKey] = value;

    let updateRowURL = props.schema.source.updateRow;
    if (props.schema.source.updateRow.match(variableRegexp)) {
      const matches = props.schema.source.updateRow.match(variableRegexp);
      if (matches) {
        matches.forEach((variable) => {
          const unwrapped = variable.slice(1, -1);
          updateRowURL = updateRowURL.replaceAll(variable, row[unwrapped]);
        });
      }
    }
    console.debug(`Save new value by calling API endpoint ${updateRowURL} with payload`, payload);
    //axios.put(props.schema.source.updateRow, payload)
    // temp code
    const response = row;
    response[headerKey] = value;
    items.value[index] = merge(items.value[index], response);
    // end temp code
  } catch (e) {
    console.error(e);
  }

  if (props.schema.aggregates) {
    console.debug("Wołam API o agregaty do wyświetlenia");
    /* 
      powiedzmy że api zwraca obiekt z agregatami
      
     */
    const response = {
      fieldA: 1,
      fieldB: 100,
      fieldC: 1000,
      fieldD: {
        fieldE: "test",
      },
      fieldF: [
        {
          fieldG: "test1",
        },
        {
          fieldG: "test2",
        },
        {
          fieldG: "test3",
        },
      ],
    };

    merge(props.model, response);
    vueSchemaFormEventBus.emit("model-changed", "table-aggregates");
  }
}

async function loadData(params: TableFetchOptions) {
  try {
    console.debug("Loading data for table field with params ", params);
    loading.value = true;

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
    itemsTotalElements.value = items.value.length;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
}

function runTableBtnLogic(btn: TableButton) {
  switch (btn.mode) {
    case "action":
      let payloadObject = {
        code: btn.config.code,
        body: null,
        params: {
          featureId: btn.config.featureId,
          viewId: btn.config.viewId,
          batchAddAttributePath: btn.config.batchAddAttributePath,
          scriptName: btn.config.scriptName,
        },
      };
      actionHandlerEventBus.emit("form-action", payloadObject);
      break;
  }
}

function runTableActionLogic(action) {
  console.debug("TODO", action);
}

onMounted(async () => {
  await bindProps(props.schema);
  debounced.load(fetchDataParams.value);
});
</script>

<style lang="scss" scoped>
.v-data-table__tr-aggregates {
  background-color: lightgrey;
}
</style>

<i18n lang="json">
{
  "en": {
    "sum": "Total",
    "avg": "Average"
  },
  "pl": {
    "sum": "Suma",
    "avg": "Średnia"
  }
}
</i18n>
