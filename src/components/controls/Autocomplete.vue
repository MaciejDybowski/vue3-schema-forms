<template>
  <base-autocomplete
    :label="label"
    v-model="localModel"
    v-bind="bindProps(schema)"
    :class="bindClass(schema)"
    :rules="rules(schema)"
    :item-title="title"
    :item-value="value"
    :items="data"
    :loading="loading"
    :return-object="returnObject as any"
    :auto-select-first="true"
    :lazy="lazy"
    :options="paginationOptions"
    @loadMoreRecords="loadMoreRecords"
    :search="query"
    @update:search="updateQuery"
    :no-filter="true"
  >
    <template
      #item="{ item, props }"
      v-if="description !== null"
    >
      <v-list-item
        v-bind="props"
        :title="item.title"
        :subtitle="item.raw[description]"
      >
      </v-list-item>
    </template>
  </base-autocomplete>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";

import { EngineDictionaryField } from "@/types/engine/controls";

import { useClass, useDictionarySource, useFormModel, useLabel, useProps, useRules } from "../../core/composables";
import BaseAutocomplete from "./base/BaseAutocomplete.vue";

const props = defineProps<{
  schema: EngineDictionaryField;
  model: object;
}>();
const { label } = useLabel(props.schema);
const { bindProps } = useProps();
const { rules } = useRules();
const { bindClass } = useClass();
const { getValue, setValue } = useFormModel();

const localModel = computed({
  get(): any {
    return getValue(props.model, props.schema);
  },
  set(val: any) {
    if (val && typeof val === "object") {
      updateQuery(returnObject ? val[title] : val);
    } else {
      updateQuery(returnObject ? null : val);
    }

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
  localModel.value ? updateQuery(localModel.value[title]) : await load();

  if (data.value.length === 1 && singleOptionAutoSelect) {
    localModel.value = data.value[0];
  }
});

function updateQuery(val: string) {
  query.value = val;
}
</script>

<style scoped lang="css"></style>
