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
      <span v-if="!header.editable">
        {{ item[header.key] }}
      </span>

      <editable-cell
        v-else
        v-model="items[index][header.key]"
        v-bind="fieldProps"
        @update:row="updateRow($event, index, header.key, items[index])"
      />
    </template>
  </v-data-table>
</template>

<script lang="ts" setup>
import axios from "axios";
import { debounce, merge } from "lodash";
import { computed, onMounted, ref } from "vue";

import EditableCell from "@/components/controls/table/EditableCell.vue";
import { mapQuery, mapSort } from "@/components/controls/table/utils";

import { useProps } from "@/core/composables";
import { variableRegexp } from "@/core/engine/utils";
import { EngineTableField } from "@/types/engine/EngineTableField";
import { useEventBus } from "@vueuse/core";

const vueSchemaFormEventBus = useEventBus<string>("form-model");
const props = defineProps<{
  schema: EngineTableField;
  model: object;
}>();
const { bindProps, fieldProps } = useProps();

const loading = ref(true);
const debounced = {
  load: debounce(loadData, 200),
};

const headers = [
  {
    title: "ID",
    key: "id",
  },
  {
    title: "Name",
    key: "name",
  },
  {
    title: "Location",
    key: "location",
    minWidth: "150px",
    maxWidth: "150px",
  },
  {
    title: "Height",
    editable: true,
    key: "height",
  },
  {
    title: "Base",
    key: "base",
  },
  {
    title: "Volume",
    key: "volume",
  },
];

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
    const url = ""; // TODO
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

    items.value = [
      // Existing items with IDs added
      {
        id: 1,
        name: "🍎 Apple",
        location: "Washington",
        height: "0.1",
        base: "0.07",
        volume: "0.0001",
      },
      {
        id: 2,
        name: "🍌 Banana",
        location: "Ecuador",
        height: "0.2",
        base: "0.05",
        volume: "0.0002",
      },
      {
        id: 3,
        name: "🍇 Grapes",
        location: "Italy",
        height: "0.02",
        base: "0.02",
        volume: "0.00001",
      },
      {
        id: 4,
        name: "🍉 Watermelon",
        location: "China",
        height: "0.4",
        base: "0.3",
        volume: "0.03",
      },
      {
        id: 5,
        name: "🍍 Pineapple",
        location: "Thailand",
        height: "0.3",
        base: "0.2",
        volume: "0.005",
      },
      {
        id: 6,
        name: "🍒 Cherries",
        location: "Turkey",
        height: "0.02",
        base: "0.02",
        volume: "0.00001",
      },
      {
        id: 7,
        name: "🥭 Mango",
        location: "India",
        height: "0.15",
        base: "0.1",
        volume: "0.0005",
      },
      {
        id: 8,
        name: "🍓 Strawberry",
        location: "USA",
        height: "0.03",
        base: "0.03",
        volume: "0.00002",
      },
      {
        id: 9,
        name: "🍑 Peach",
        location: "China",
        height: "0.09",
        base: "0.08",
        volume: "0.0004",
      },
      {
        id: 10,
        name: "🥝 Kiwi",
        location: "New Zealand",
        height: "0.05",
        base: "0.05",
        volume: "0.0001",
      },
      // New items with IDs added
      {
        id: 11,
        name: "🍋 Lemon",
        location: "Spain",
        height: "0.08",
        base: "0.06",
        volume: "0.0003",
      },
      {
        id: 12,
        name: "🍈 Melon",
        location: "France",
        height: "0.25",
        base: "0.2",
        volume: "0.01",
      },
      {
        id: 13,
        name: "🍐 Pear",
        location: "Argentina",
        height: "0.12",
        base: "0.08",
        volume: "0.0008",
      },
      {
        id: 14,
        name: "🍏 Green Apple",
        location: "Australia",
        height: "0.1",
        base: "0.07",
        volume: "0.0001",
      },
      {
        id: 15,
        name: "🍊 Orange",
        location: "Florida",
        height: "0.09",
        base: "0.08",
        volume: "0.0005",
      },
      {
        id: 16,
        name: "🍍 Jackfruit",
        location: "Philippines",
        height: "0.5",
        base: "0.4",
        volume: "0.1",
      },
      {
        id: 17,
        name: "🍏 Avocado",
        location: "Mexico",
        height: "0.2",
        base: "0.1",
        volume: "0.002",
      },
      {
        id: 18,
        name: "🍅 Tomato",
        location: "Italy",
        height: "0.04",
        base: "0.04",
        volume: "0.00003",
      },
      {
        id: 19,
        name: "🥥 Coconut",
        location: "Sri Lanka",
        height: "0.3",
        base: "0.25",
        volume: "0.02",
      },
      {
        id: 20,
        name: "🍋 Lime",
        location: "Brazil",
        height: "0.06",
        base: "0.05",
        volume: "0.0002",
      },
      {
        id: 21,
        name: "🍇 Blueberry",
        location: "Canada",
        height: "0.01",
        base: "0.01",
        volume: "0.000005",
      },
      {
        id: 22,
        name: "🍈 Honeydew",
        location: "South Korea",
        height: "0.3",
        base: "0.25",
        volume: "0.015",
      },
      {
        id: 23,
        name: "🍊 Clementine",
        location: "Morocco",
        height: "0.08",
        base: "0.06",
        volume: "0.0004",
      },
      {
        id: 24,
        name: "🍒 Cranberries",
        location: "USA",
        height: "0.02",
        base: "0.02",
        volume: "0.00001",
      },
      {
        id: 25,
        name: "🥭 Papaya",
        location: "Malaysia",
        height: "0.35",
        base: "0.2",
        volume: "0.005",
      },
      {
        id: 26,
        name: "🍓 Raspberry",
        location: "Poland",
        height: "0.02",
        base: "0.02",
        volume: "0.000015",
      },
      {
        id: 27,
        name: "🍑 Nectarine",
        location: "Greece",
        height: "0.08",
        base: "0.07",
        volume: "0.0004",
      },
      {
        id: 28,
        name: "🍐 Quince",
        location: "Iran",
        height: "0.1",
        base: "0.07",
        volume: "0.0006",
      },
      {
        id: 29,
        name: "🥝 Guava",
        location: "Vietnam",
        height: "0.1",
        base: "0.08",
        volume: "0.0007",
      },
      {
        id: 30,
        name: "🍎 Persimmon",
        location: "Japan",
        height: "0.12",
        base: "0.1",
        volume: "0.0008",
      },
      {
        id: 31,
        name: "🍌 Plantain",
        location: "Colombia",
        height: "0.25",
        base: "0.06",
        volume: "0.0003",
      },
      {
        id: 32,
        name: "🍇 Blackberries",
        location: "Germany",
        height: "0.03",
        base: "0.02",
        volume: "0.00002",
      },
    ];
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

onMounted(async () => {
  await bindProps(props.schema);
  debounced.load(fetchDataParams.value);
});
</script>

<style lang="css" scoped></style>

<i18n lang="json">
{
  "en": {},
  "pl": {}
}
</i18n>
