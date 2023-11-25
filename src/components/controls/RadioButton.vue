<template>
  <v-radio-group
    v-model='localModel'
    :label='schema.label'
    v-bind="bindProps(schema, 'radio-button')"
    :rules='mapRules(schema.required)'
    :class='bindClass(schema)'
    v-if='!loading'
  >
    <template
      v-for='option in data'
      :key='option[itemValue]'
    >
      <v-radio
        :label='option[itemText]'
        :value='option[itemValue]'
      />
    </template>
  </v-radio-group>
</template>

<script setup lang='ts'>
import { EngineSourceField } from '@/vocabulary/engine/controls';
import { computed, watch } from 'vue';
import { bindClass, bindProps, getValueFromModel, mapRules, produceUpdateEvent } from '@/core/engine/utils';
import { useApiData } from '@/core/composables/useApiData';

const props = defineProps<{
  schema: EngineSourceField
  model: object
}>();

const localModel = computed({
  get(): string | number {
    if (props.schema.source.returnObject) {
      const obj = getValueFromModel(props.model, props.schema);
      return obj ? obj[itemValue.value] : null;
    } else {
      return getValueFromModel(props.model, props.schema);
    }
  },
  set(val: any) {
    if (props.schema.source.returnObject) {
      const obj = data.value.filter((item) => {
        return item[itemValue.value] === val;
      })[0];
      produceUpdateEvent(obj, props.schema);
    } else {
      produceUpdateEvent(val, props.schema);
    }
  },
});

const { itemText, itemValue, loading, data } = useApiData(props.schema.source);

watch(loading, () => {
  if (data.value.length === 0) {
    console.warn(`Field ${props.schema.key} don't have any data/options/items`);
  }
  if (!loading.value && localModel.value == null) {
    localModel.value = data.value[0][itemValue.value];
  }
});

</script>

<style scoped lang='css'>

</style>
