<template>
  <v-menu
    v-if="schema.variant == 'combobox'"
    v-model="menu"
    :close-on-content-click="false"
    width="600"
  >
    <template #activator="{ props }">
      <v-text-field
        :label="label"
        :model-value="formattedSelection"
        readonly
        v-bind="props"
        @click="menu = true"
      />
    </template>

    <v-card>
      <ordered-multiselect-lists
        :items="items"
        :selectedItems="selectedItems"
        :title="title"
        :value="value"
        @update:selected-items="(val) => updateOrderedList(val)"
      />
    </v-card>
  </v-menu>

  <div v-if="schema.variant == 'list' && !loading">
    <label
      v-if="label"
      class="v-label mb-1"
    >
      {{ label }}
    </label>
    <ordered-multiselect-lists
      :items="items"
      :selectedItems="selectedItems"
      :title="title"
      :value="value"
      @update:selected-items="(val) => updateOrderedList(val)"
    />
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import get from "lodash/get";
import { computed, onMounted, ref } from "vue";

import OrderedMultiselectLists from "@/components/controls/ordered-multi-select/OrderedMultiselectLists.vue";

import { useFormModel, useLabel, useResolveVariables } from "@/core/composables";
import { EngineOrderedMultiSelect } from "@/types/engine/controls";

const { resolve } = useResolveVariables();

const menu = ref(false);
const { getValue, setValue } = useFormModel();

const { schema, model } = defineProps<{
  schema: EngineOrderedMultiSelect;
  model: object;
}>();
const { label, bindLabel } = useLabel(schema);

const localModel = computed({
  get(): any[] {
    return getValue(model, schema);
  },
  set(val: any[]) {
    setValue(val, schema);
  },
});

const items = ref<any[]>([]);

const selectedItems = ref<any[]>([]);

function updateOrderedList(val: any): void {
  selectedItems.value = val;
  localModel.value = selectedItems.value;
}

const formattedSelection = computed(() => selectedItems.value.map((item, idx) => `${item[title.value]}`).join(", "));

// pobrane ze wspoldzielonego
let title = ref("title");
let value = ref("value");

const loading = ref(false);

async function load() {
  const endpoint = await resolve(schema, schema.source.url, schema.source.title, true);

  if (endpoint.allVariablesResolved) {
    loading.value = true;
    const response = await axios.get(`${endpoint.resolvedText}`, {
      params: {},
    });

    items.value = get(response.data, "content", []);
    loading.value = false;
  }
}

onMounted(async () => {
  if (schema.label) {
    await bindLabel(schema);
  }

  title.value = schema.source.title ? schema.source.title : "title";
  value.value = schema.source.value ? schema.source.value : "value";
  await load();

  if (localModel.value) {
    selectedItems.value = localModel.value;
  }
});
</script>

<style scoped></style>
