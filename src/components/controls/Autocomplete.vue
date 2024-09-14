<template>
  <base-autocomplete
    :label='label'
    v-model='localModel'
    v-bind='fieldProps'
    :class='bindClass(schema)'
    :rules='rules(schema)'
    :item-title='title'
    :item-value='value'
    :items='data'
    :loading='loading'
    :return-object='returnObject as any'
    :auto-select-first='true'
    :lazy='lazy'
    :options='paginationOptions'
    @loadMoreRecords='loadMoreRecords'
    :search='query'
    @update:search='updateQuery'
    :no-filter='true'
  >
    <template
      #item='{ item, props }'
      v-if='description !== null'
    >
      <v-list-item
        v-bind='props'
        :title='item.title'
        :subtitle='item.raw[description]'
      >
      </v-list-item>
    </template>
  </base-autocomplete>
</template>

<script setup lang='ts'>
import { computed, onMounted, watch } from 'vue';

import { EngineDictionaryField } from '@/types/engine/controls';

import { useClass, useDictionarySource, useFormModel, useLabel, useProps, useRules } from '../../core/composables';
import BaseAutocomplete from './base/BaseAutocomplete.vue';

const props = defineProps<{
  schema: EngineDictionaryField;
  model: object;
}>();
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
    if (val === null) {
      query.value = '';
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
  localModel.value ? updateQuery(localModel.value) : await load('autocomplete');

  if (data.value.length === 1 && singleOptionAutoSelect) {
    localModel.value = data.value[0];
  }

  watch(data, () => {
    if (data.value.length === 1 && singleOptionAutoSelect) {
      if (JSON.stringify(localModel.value) !== JSON.stringify(data.value[0])) {
        localModel.value = data.value[0];
      }
    }
  });
});

function updateQuery(val: object | string) {
  if (val && typeof val == 'object') {
    query.value = val[title];
  }
  if (val && typeof val == 'string') {
    query.value = val;
  }
}

onMounted(() => {
  bindProps(props.schema);
});
</script>

<style scoped lang='css'></style>
