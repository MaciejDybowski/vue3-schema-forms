<template>
  <div
    :class="'checkbox-root ' + bindClass(schema) + requiredInputClass"
    v-if='!loading'
  >
    <label
      v-if='label'
      class='v-label'
    >
      {{ label }}
    </label>
    <template
      v-for='(option, index) in data'
      :key='option[value]'
    >
      <v-checkbox
        v-model='localModel'
        v-bind='fieldProps'
        :rules="!fieldProps.readonly ? rules: []"
        :label='option[title]'
        :value='option[value]'
        :hide-details="index == data.length - 1 ? 'auto' : true"
      >
        <template #message='{ message }'>
          <div class='ml-4'>{{ message }}</div>
        </template>
      </v-checkbox>
    </template>
  </div>
</template>

<script setup lang='ts'>
import { computed, onMounted } from 'vue';

import { EngineSourceField } from '@/types/engine/controls';

import { useClass, useFormModel, useLabel, useProps, useRules, useSource } from '../../core/composables';

const props = defineProps<{
  schema: EngineSourceField;
  model: object;
}>();

const { label, bindLabel } = useLabel(props.schema);
const { title, value, loading, data, returnObject } = useSource(props.schema.source);
const { bindRules, rules, requiredInputClass } = useRules();
const { bindProps, fieldProps } = useProps();
const { bindClass } = useClass();
const { getValue, setValue } = useFormModel();


const localModel = computed({
  get(): string | number {
    if (returnObject) {
      return getValue(props.model, props.schema)?.map((item) => item[value]);
    } else {
      return getValue(props.model, props.schema);
    }
  },
  set(val: any) {
    if (returnObject) {
      const arrayOfObj = data.value.filter((obj) => val?.includes(obj[value])).map((item) => item);
      if (!fieldProps.value.multiple) {
        setValue(arrayOfObj.length > 0 ? arrayOfObj[0] : null, props.schema);
      } else {
        setValue(arrayOfObj.length > 0 ? arrayOfObj : null, props.schema);
      }
    } else {
      if (!fieldProps.value.multiple) {
        setValue(val, props.schema);
      } else {
        setValue(val.length > 0 ? val : null, props.schema);
      }
    }
  },
});

onMounted(async () => {
  await bindLabel(props.schema);
  await bindRules(props.schema);
  await bindProps(props.schema);
});
</script>

<style scoped lang='css'></style>
