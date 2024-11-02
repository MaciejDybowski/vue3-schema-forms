<template>
  <base-autocomplete
    v-model="localModel"
    :auto-select-first="true"
    :class="bindClass(schema)"
    :item-title="title"
    :item-value="value"
    :items="data"
    :label="label"
    :lazy="lazy"
    :loading="loading"
    :no-filter="true"
    :options="paginationOptions"
    :return-object="returnObject as any"
    :rules="rules(schema)"
    :search="query"
    v-bind="fieldProps"
    @focus="fetchDictionaryData"
    @loadMoreRecords="loadMoreRecords"
    @update:search="updateQuery"
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
import { useI18n } from "vue-i18n";

import { EngineDictionaryField } from "@/types/engine/controls";

import { useClass, useDictionarySource, useFormModel, useLabel, useProps, useRules } from "../../core/composables";
import BaseAutocomplete from "./base/BaseAutocomplete.vue";

const props = defineProps<{
  schema: EngineDictionaryField;
  model: object;
}>();
const { t } = useI18n();
const { label } = useLabel(props.schema);
const { fieldProps, bindProps } = useProps();
const { rules } = useRules();
const { bindClass } = useClass();
const { getValue, setValue } = useFormModel();

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
} = useDictionarySource(props.schema);

onMounted(async () => {
  bindProps(props.schema);
  if (localModel.value) {
    updateQuery(localModel.value);
  }

  if (data.value.length === 1 && singleOptionAutoSelect) {
    if(returnObject){
      localModel.value = data.value[0];
    } else {
      localModel.value = data.value[0][value]
    }
  }

  watch(data, () => {
    if (data.value.length === 1 && singleOptionAutoSelect) {
      if (JSON.stringify(localModel.value) !== JSON.stringify(data.value[0])) {
        if(returnObject){
          localModel.value = data.value[0];
        } else {
          localModel.value = data.value[0][value]
        }
      }
    }
  });
});

function updateQuery(val: any) {
  if (val === null || val === "") {
    query.value = "";
  }
  if (val && typeof val == "object") {
    data.value.push(localModel.value);
    query.value = val[title];
  }
  if (val && typeof val == "string") {
    query.value = val;
  }
}

async function fetchDictionaryData() {
  if (data.value.length == 0) {
    await load("autocomplete");
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
