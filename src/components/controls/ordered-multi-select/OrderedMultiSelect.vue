<template>
  <div>
    <v-menu
      v-if="schema.variant == 'combobox'"
      v-model="menu"
      :close-on-content-click="false"
      width="600"
    >
      <template #activator="{ props }">
        <v-text-field
          :class="bindClass(schema) + requiredInputClass"
          :label="label"
          :model-value="formattedSelection"
          :readonly="true"
          :rules="!fieldProps.readonly ? rules : []"
          v-bind="{ ...props, ...fieldProps }"
          @click="menu = true"
        />
      </template>

      <v-card>
        <ordered-multiselect-lists
          :items="items"
          :selectedItems="localModel"
          :title="title"
          :value="value"
          @update:selected-items="(val) => updateOrderedList(val)"
        />
      </v-card>
    </v-menu>

    <v-input
      v-if="schema.variant == 'list'"
      v-model="localModel"
      :class="bindClass(schema) + requiredInputClass"
      :rules="!fieldProps.readonly ? rules : []"
    >
      <template #default>
        <div class="d-flex flex-column">
          <label
            v-if="label"
            class="v-label mb-1"
          >
            {{ label }}
          </label>
          <ordered-multiselect-lists
            v-if="!loading"
            :items="items"
            :selectedItems="localModel"
            :title="title"
            :value="value"
            @update:selected-items="(val) => updateOrderedList(val)"
          />
        </div>
      </template>
    </v-input>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import get from "lodash/get";
import { computed, onMounted, ref, watch } from "vue";

import OrderedMultiselectLists from "@/components/controls/ordered-multi-select/OrderedMultiselectLists.vue";

import { useClass, useFormModel, useLabel, useProps, useResolveVariables, useRules } from "@/core/composables";
import { EngineOrderedMultiSelect } from "@/types/engine/controls";

const { resolve } = useResolveVariables();

const menu = ref(false);
const { getValue, setValue } = useFormModel();
const { bindClass } = useClass();
const { bindRules, rules, requiredInputClass } = useRules();
const { bindProps, fieldProps } = useProps();

const { schema, model } = defineProps<{
  schema: EngineOrderedMultiSelect;
  model: object;
}>();
const { label, bindLabel } = useLabel(schema);

const localModel = computed({
  get(): any[] {
    const value = getValue(model, schema, []);
    return value != null ? value : [];
  },
  set(val: any[]) {
    setValue(val, schema);
  },
});

const items = ref<any[]>([]);

function updateOrderedList(val: any): void {
  localModel.value = val;
}

const formattedSelection = computed(() => localModel.value.map((item, idx) => `${item[title.value]}`).join(", "));

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
  await bindLabel(schema);
  await bindRules(schema);
  await bindProps(schema);

  title.value = schema.source.title ? schema.source.title : "title";
  value.value = schema.source.value ? schema.source.value : "value";
  await load();
});
</script>

<style scoped>
:deep(.v-input__control) {
  display: block;
}
</style>
