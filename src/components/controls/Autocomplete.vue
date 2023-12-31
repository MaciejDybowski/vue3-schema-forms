<template>
  <base-autocomplete
    :label='schema.label'
    v-model='localModel'
    v-bind="useProps(props.schema, props.model, 'select')"
    :class='bindClass(schema)'
    :rules='vuetifyRules'
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
      #item='{ item, props}'
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

import BaseAutocomplete from './base/BaseAutocomplete.vue';
import { computed, onMounted } from 'vue';
import { bindClass, getValueFromModel, produceUpdateEvent } from '../../core/engine/utils';
import { EngineDictionaryField } from '../../vocabulary/engine/controls';
import { useDictionarySource } from '../../core/composables/useDictionarySource';
import { useProps } from '../../core/composables/useProps';
import { useRules } from '../../core/composables/useRules';

const props = defineProps<{
  schema: EngineDictionaryField;
  model: object;
}>();

const vuetifyRules = useRules(props.schema);

const localModel = computed({
  get(): any {
    return getValueFromModel(props.model, props.schema);
  },
  set(val: any) {
    updateQuery(val)
    produceUpdateEvent(val, props.schema);
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
} = useDictionarySource(props.schema.source, props.schema.formId);

onMounted(async () => {
  localModel.value ? updateQuery(localModel.value[title]) : await load();

  if (data.value.length === 1 && singleOptionAutoSelect) {
    localModel.value = data.value[0];
  }
});

function updateQuery(val: string) {
  query.value = val
}
</script>

<style scoped lang='css'>

</style>
