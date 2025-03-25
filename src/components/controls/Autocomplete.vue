<template>
  <base-autocomplete
    v-model="localModel"
    v-model:search="query"
    :auto-select-first="false"
    :class="bindClass(schema) + requiredInputClass"
    :item-title="title"
    :item-value="returnObject ? value : title"
    :items="data"
    :label="label"
    :lazy="lazy"
    :loading="loading"
    :no-filter="true"
    :options="paginationOptions"
    :return-object="returnObject as any"
    :rules="!fieldProps.readonly ? rules : []"
    v-bind="{ ...fieldProps, clearable: !fieldProps.readonly }"
    @focusin="fetchDictionaryData"
    @loadMoreRecords="loadMoreRecords"
    @update:search="queryUpdate"
    @update:modelValue="changeUpdate"
    @update:menu="menuUpdate"
  >
    <template #no-data>
      <v-list-item v-if="loading">
        <v-progress-linear
          color="primary"
          indeterminate
        ></v-progress-linear>
      </v-list-item>
      <v-list-item
        v-else
        :title="t('noData')"
      />
    </template>
    <template
      v-if="description !== null"
      #item="{ item, props }"
    >
      <v-list-item
        :subtitle="item.raw[description]"
        :title="item.title"
        v-bind="props"
      >
      </v-list-item>
    </template>
  </base-autocomplete>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";

import { useDictionary } from "@/core/composables/useDictionary";
import { useEventHandler } from "@/core/composables/useEventHandler";
import { variableRegexp } from "@/core/engine/utils";
import { EngineDictionaryField } from "@/types/engine/controls";

import { useClass, useFormModel, useLabel, useLocale, useProps, useResolveVariables, useRules } from "../../core/composables";
import BaseAutocomplete from "./base/BaseAutocomplete.vue";

const props = defineProps<{
  schema: EngineDictionaryField;
  model: object;
}>();
const { t } = useLocale();
const { label, bindLabel } = useLabel(props.schema);
const { bindClass } = useClass();
const { bindRules, rules, requiredInputClass } = useRules();
const { bindProps, fieldProps } = useProps();
const { getValue, setValue } = useFormModel();
const { onChange } = useEventHandler();
const { resolve } = useResolveVariables();

const localModel = computed({
  get(): any {
    return getValue(props.model, props.schema);
  },
  set(val: any) {
    setValue(val, props.schema);
  },
});

const {
  title,
  value,
  loading,
  data,
  returnObject,
  description,
  query,
  lazy,
  paginationOptions,
  load,
  loadMoreRecords,
  singleOptionAutoSelect,
  initState,
  updateQuery,
  loadCounter,
} = useDictionary();

function singleOptionAutoSelectFunction() {
  const selectSingleOptionLogic = () => {
    if (data.value.length !== 1 || !singleOptionAutoSelect.value || loadCounter.value > 1) return;
    const selectedValue = returnObject.value ? data.value[0] : data.value[0][title.value];

    if (JSON.stringify(localModel.value) !== JSON.stringify(selectedValue)) {
      localModel.value = selectedValue;
    }
  };

  selectSingleOptionLogic();
  watch(data, selectSingleOptionLogic, { deep: true, immediate: true });
}

async function resolveIfLocalModelHasDependencies() {
  if (typeof localModel.value == "string" && localModel.value.match(variableRegexp)) {
    const result = await resolve(props.schema, localModel.value);
    if (result.allVariablesResolved) {
      localModel.value = result.resolvedText;
    }
  }
}

onMounted(async () => {
  await initState(props.schema);
  await bindLabel(props.schema);
  await bindRules(props.schema);
  await bindProps(props.schema);

  if (localModel.value) {
    if (typeof localModel.value == "object") {
      data.value.push(localModel.value);
    } else {
      await resolveIfLocalModelHasDependencies();
      if (!fieldProps.value.readonly) {
        updateQuery(localModel.value, false);
      }
    }
  }

  singleOptionAutoSelectFunction();

  console.debug(`[v-mounted] => items.size = ${data.value.length}, localModel = ${localModel.value}, query = ${query.value}`);
});

async function fetchDictionaryData() {
  if (!fieldProps.value.readonly) {
    console.debug(`[v-focus] => items.size = ${data.value.length}, localModel = ${localModel.value}, query = ${query.value}`);
    updateQuery("", true);
    if (data.value.length < paginationOptions.value._state.itemsPerPage) {
      await load("autocomplete");
    }
  }
}

// Tricky query management......
// TODO
function changeUpdate() {
  console.debug(
    `[v-updateModelValue] => items.size = ${data.value.length}, localModel = ${localModel.value}, query = ${query.value}`,
  );
  blockQuery.value = false;
  onChange(props.schema, props.model);
}

const blockQuery = ref(false);
const menuUpdate = async (val) => {
  console.debug(`[v-menuUpdate] => items.size = ${data.value.length}, localModel = ${localModel.value}, query = ${query.value}`);
  if (val) {
    blockQuery.value = val;
    if (data.value.length < paginationOptions.value._state.itemsPerPage) {
      updateQuery("", val);
      await load("autocomplete");
    }
  }
};

const queryUpdate = (val) => {
  console.debug(`[v-queryUpdate] => items.size = ${data.value.length}, localModel = ${localModel.value}, query = ${query.value}`);

  if (blockQuery.value) {
    updateQuery(val, true);
    blockQuery.value = false;
  } else {
    !fieldProps.value.readonly ? updateQuery(val, false) : updateQuery(val, true);
  }
};
</script>

<style lang="css" scoped></style>

<i18n lang="json">
{
  "en": {
    "noData": "No data available."
  },
  "pl": {
    "noData": "Brak danych."
  }
}
</i18n>
