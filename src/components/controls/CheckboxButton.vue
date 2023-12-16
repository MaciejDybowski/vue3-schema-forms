<template>
  <div
    :class="'checkbox-root ' + bindClass(schema)"
    v-if='!loading'
  >
    <label class='v-label'>
      {{ schema.label }}
    </label>
    <template
      v-for='(option, index) in data'
      :key='option[value]'
    >
      <v-checkbox
        v-model='localModel'
        v-bind="useProps(schema, 'checkbox')"
        :rules='vuetifyRules'
        :label='option[title]'
        :value='option[value]'
        :hide-details='index == data.length - 1 ? "auto" : true'
      >
        <template #message='{ message }'>
          <div class='ml-4'>{{ message }}</div>
        </template>
      </v-checkbox>
    </template>
  </div>
</template>

<script setup lang='ts'>
import { EngineSourceField } from '../../vocabulary/engine/controls';
import { useSource } from '../../core/composables/useSource';
import { bindClass, getValueFromModel, produceUpdateEvent } from '../../core/engine/utils';
import { computed } from 'vue';
import { useRules } from '../..//core/composables/useRules';
import { useProps } from '../../core/composables/useProps';

const props = defineProps<{
  schema: EngineSourceField;
  model: object;
}>();

const localModel = computed({
  get(): string | number {
    if (props.schema.source.returnObject) {
      return getValueFromModel(props.model, props.schema)?.map((item) => item[value]);
    } else {
      return getValueFromModel(props.model, props.schema);
    }
  },
  set(val: any) {
    if (props.schema.source.returnObject) {
      const arrayOfObj = data.value.filter((obj) => val?.includes(obj[value])).map((item) => item);
      produceUpdateEvent(arrayOfObj.length > 0 ? arrayOfObj : null, props.schema);
    } else {
      produceUpdateEvent(val, props.schema);
    }
  },
});

const vuetifyRules = useRules(props.schema);
const { title, value, loading, data } = useSource(props.schema.source);
</script>

<style scoped lang='css'></style>
