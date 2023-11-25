<template>
  <div
    :class='"checkbox-root " + bindClass(schema)'
    v-if='!loading'
  >
    <label class='v-label'>
      {{ schema.label }}
    </label>
    <template
      v-for='(option, index) in data'
      :key='option[itemValue]'
    >
      <v-checkbox
        v-model='localModel'
        v-bind="{...defaultVuetifyProperties, ...bindProps(schema, 'checkbox')}"
        :rules='mapRules(schema.required)'
        :label='option[itemText]'
        :value='option[itemValue]'
        :hide-details='!(index==data.length-1 && schema.required)'
      >
        <template #message='{message}'>
          <div class='ml-4'>{{ message }}</div>
        </template>
      </v-checkbox>
    </template>
  </div>
</template>

<script setup lang='ts'>

import { EngineSourceField } from '@/vocabulary/engine/controls';
import { useApiData } from '@/core/composables/useApiData';
import { bindClass, bindProps, getValueFromModel, mapRules, produceUpdateEvent } from '@/core/engine/utils';
import { computed } from 'vue';

const props = defineProps<{
  schema: EngineSourceField
  model: object
}>();

const defaultVuetifyProperties = {
  density: 'compact',
  'hide-details': true,
  multiple: true,
};

const localModel = computed({
  get(): string | number {
    if (props.schema.source.returnObject) {
      return getValueFromModel(props.model, props.schema)
        ?.map(item => item[itemValue.value]);
    } else {
      return getValueFromModel(props.model, props.schema);
    }

  },
  set(val: any) {
    if (props.schema.source.returnObject) {
      const arrayOfObj = data.value.filter(obj => val?.includes(obj[itemValue.value])).map((item) => item);
      produceUpdateEvent(arrayOfObj.length > 0 ? arrayOfObj : null, props.schema);
    } else {
      produceUpdateEvent(val, props.schema);
    }
  },
});

const { itemText, itemValue, loading, data } = useApiData(props.schema.source);

</script>


<style scoped lang='css'>

</style>
