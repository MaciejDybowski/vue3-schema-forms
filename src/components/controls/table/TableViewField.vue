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
    <template
      v-for="header in headers"
      :key="header.key"
      #[`item.${header.key}`]="{ item, index }"
    >
      <span v-if="!header.editable && !(header.key in actions)">
        {{ extractValueFromItem(header.key, item) }}
      </span>

      <span
        v-else-if="header.key in actions"
        class="link"
        @click="callAction(item, header.key)"
      >
        {{ extractValueFromItem(header.key, item) }}
      </span>

      <editable-cell
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
import get from "lodash/get";
import { ComputedRef, computed, onMounted, ref } from "vue";

import EditableCell from "@/components/controls/table/EditableCell.vue";
import { mapQuery, mapSort } from "@/components/controls/table/utils";

import { useLocale, useProps, useResolveVariables } from "@/core/composables";
import { variableRegexp } from "@/core/engine/utils";
import { EngineTableField } from "@/types/engine/EngineTableField";
import { TableHeader } from "@/types/shared/Source";
import { useEventBus } from "@vueuse/core";

const actionHandlerEventBus = useEventBus<string>("form-action");
const vueSchemaFormEventBus = useEventBus<string>("form-model");
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

const headers: ComputedRef<TableHeader[]> = computed(() => {
  return props.schema.source.headers.map((item: TableHeader) => {
    const header: TableHeader = {
      key: item.key,
      title: item.title,
      type: item.type,
    };

    if (item.editable) {
      header["editable"] = item.editable;
    }
    return header;
  });
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

function extractValueFromItem(key: string, item: object) {
  return get(item, key, null);
}

async function loadData(params: TableFetchOptions) {
  try {
    console.debug("Loading data for table field with params ", params);
    loading.value = true;

    const url = await resolve(props.schema, props.schema.source.data);

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

    /*
    items.value = mapContent(response.data);
    itemsTotalElements.value = mapSliceTotalElements(response.data);
     */
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
}

function callAction(item: any, key: string) {
  console.debug(`Action is enable on ${key} with action code ${actions[key]}`);

  let payloadObject = {
    code: actions[key],
    body: item,
  };

  actionHandlerEventBus.emit("form-action", payloadObject);
  console.debug("Action payload", payloadObject);
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

.link {
  cursor: pointer;
  // text-underline-offset: 4px;
  text-decoration: none;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.36) 0, rgba(0, 0, 0, 0.36) 8px, transparent 8px, transparent 100%) bottom
    left / 12px 1px repeat-x;
  display: inline;
  padding-bottom: 0px;
}

table .link {
  display: table-cell;
}

.link:hover {
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.36) 0, rgba(0, 0, 0, 0.36) 2px, transparent 2px, transparent 100%) bottom
    left / 1px 1px repeat-x;
}

.theme--dark {
  .link {
    // text-underline-offset: 4px;
    background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.36) 0,
        rgba(255, 255, 255, 0.36) 8px,
        transparent 8px,
        transparent 100%
      )
      bottom left / 12px 1px repeat-x;
  }

  .link:hover {
    background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.36) 0,
        rgba(255, 255, 255, 0.36) 2px,
        transparent 2px,
        transparent 100%
      )
      bottom left / 1px 1px repeat-x;
  }
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
