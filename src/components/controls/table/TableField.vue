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
        @update:row="updateRow($event, index)"
      />
    </template>
  </v-data-table>
</template>

<script lang="ts" setup>
import axios from "axios";
import { debounce } from "lodash";
import { computed, onMounted, ref } from "vue";

import EditableCell from "@/components/controls/table/EditableCell.vue";
import { mapQuery, mapSort } from "@/components/controls/table/utils";

import { useProps } from "@/core/composables";
import { EngineTextField } from "@/types/engine/controls";

const props = defineProps<{
  schema: EngineTextField;
  model: object;
}>();
const { bindProps, fieldProps } = useProps();

const loading = ref(true);
const debounced = {
  load: debounce(loadData, 200),
};

const headers = [
  {
    title: "Name",
    key: "name",
  },
  {
    title: "Location",
    key: "location",
    editable: true,
    minWidth: "150px",
    maxWidth: "150px",
  },
  {
    title: "Height",
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

function updateRow(value: any, index: number) {
  items.value[index] = value;
}

async function loadData(params: TableFetchOptions) {
  try {
    console.debug("Loading data for table field with params ", params)
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
      // Existing items
      {
        name: "🍎 Apple",
        location: "Washington",
        height: "0.1",
        base: "0.07",
        volume: "0.0001",
      },
      {
        name: "🍌 Banana",
        location: "Ecuador",
        height: "0.2",
        base: "0.05",
        volume: "0.0002",
      },
      {
        name: "🍇 Grapes",
        location: "Italy",
        height: "0.02",
        base: "0.02",
        volume: "0.00001",
      },
      {
        name: "🍉 Watermelon",
        location: "China",
        height: "0.4",
        base: "0.3",
        volume: "0.03",
      },
      {
        name: "🍍 Pineapple",
        location: "Thailand",
        height: "0.3",
        base: "0.2",
        volume: "0.005",
      },
      {
        name: "🍒 Cherries",
        location: "Turkey",
        height: "0.02",
        base: "0.02",
        volume: "0.00001",
      },
      {
        name: "🥭 Mango",
        location: "India",
        height: "0.15",
        base: "0.1",
        volume: "0.0005",
      },
      {
        name: "🍓 Strawberry",
        location: "USA",
        height: "0.03",
        base: "0.03",
        volume: "0.00002",
      },
      {
        name: "🍑 Peach",
        location: "China",
        height: "0.09",
        base: "0.08",
        volume: "0.0004",
      },
      {
        name: "🥝 Kiwi",
        location: "New Zealand",
        height: "0.05",
        base: "0.05",
        volume: "0.0001",
      },
      // New items
      {
        name: "🍋 Lemon",
        location: "Spain",
        height: "0.08",
        base: "0.06",
        volume: "0.0003",
      },
      {
        name: "🍈 Melon",
        location: "France",
        height: "0.25",
        base: "0.2",
        volume: "0.01",
      },
      {
        name: "🍐 Pear",
        location: "Argentina",
        height: "0.12",
        base: "0.08",
        volume: "0.0008",
      },
      {
        name: "🍏 Green Apple",
        location: "Australia",
        height: "0.1",
        base: "0.07",
        volume: "0.0001",
      },
      {
        name: "🍊 Orange",
        location: "Florida",
        height: "0.09",
        base: "0.08",
        volume: "0.0005",
      },
      {
        name: "🍍 Jackfruit",
        location: "Philippines",
        height: "0.5",
        base: "0.4",
        volume: "0.1",
      },
      {
        name: "🍏 Avocado",
        location: "Mexico",
        height: "0.2",
        base: "0.1",
        volume: "0.002",
      },
      {
        name: "🍅 Tomato",
        location: "Italy",
        height: "0.04",
        base: "0.04",
        volume: "0.00003",
      },
      {
        name: "🥥 Coconut",
        location: "Sri Lanka",
        height: "0.3",
        base: "0.25",
        volume: "0.02",
      },
      {
        name: "🍋 Lime",
        location: "Brazil",
        height: "0.06",
        base: "0.05",
        volume: "0.0002",
      },
      {
        name: "🍇 Blueberry",
        location: "Canada",
        height: "0.01",
        base: "0.01",
        volume: "0.000005",
      },
      {
        name: "🍈 Honeydew",
        location: "South Korea",
        height: "0.3",
        base: "0.25",
        volume: "0.015",
      },
      {
        name: "🍊 Clementine",
        location: "Morocco",
        height: "0.08",
        base: "0.06",
        volume: "0.0004",
      },
      {
        name: "🍒 Cranberries",
        location: "USA",
        height: "0.02",
        base: "0.02",
        volume: "0.00001",
      },
      {
        name: "🥭 Papaya",
        location: "Malaysia",
        height: "0.35",
        base: "0.2",
        volume: "0.005",
      },
      {
        name: "🍓 Raspberry",
        location: "Poland",
        height: "0.02",
        base: "0.02",
        volume: "0.000015",
      },
      {
        name: "🍑 Nectarine",
        location: "Greece",
        height: "0.08",
        base: "0.07",
        volume: "0.0004",
      },
      {
        name: "🍐 Quince",
        location: "Iran",
        height: "0.1",
        base: "0.07",
        volume: "0.0006",
      },
      {
        name: "🥝 Guava",
        location: "Vietnam",
        height: "0.1",
        base: "0.08",
        volume: "0.0007",
      },
      {
        name: "🍎 Persimmon",
        location: "Japan",
        height: "0.12",
        base: "0.1",
        volume: "0.0008",
      },
      {
        name: "🍌 Plantain",
        location: "Colombia",
        height: "0.25",
        base: "0.06",
        volume: "0.0003",
      },
      {
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
