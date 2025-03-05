<template>
  <base-autocomplete
    v-model="localModel"
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
    :search="query"
    v-bind="{ ...fieldProps, clearable: !fieldProps.readonly }"
    @focusin="fetchDictionaryData"
    @loadMoreRecords="loadMoreRecords"
    @update:search="(val) => (!fieldProps.readonly ? updateQuery(val, false) : updateQuery(val, true))"
    @update:modelValue="onChange(schema, model)"
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
import { computed, onMounted, watch } from "vue";

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
} = useDictionary();

function singleOptionAutoSelectFunction() {
  const selectSingleOptionLogic = () => {
    if (data.value.length !== 1 || !singleOptionAutoSelect.value) return;
    const selectedValue = returnObject ? data.value[0] : data.value[0][title.value];

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
        updateQuery(localModel.value);
      }
    }
  }

  singleOptionAutoSelectFunction();
});

async function fetchDictionaryData() {
  if (!fieldProps.value.readonly) {
    updateQuery("", true);
    await load("autocomplete", localModel.value ? localModel.value : null);
  }
}
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
