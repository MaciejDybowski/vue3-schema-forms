<template>
  <v-radio-group
    v-model='localModel'
    :label='label'
    v-bind='fieldProps'
    :rules='rules'
    :class='bindClass(schema) + requiredInputClass'
    v-if='!loading'
  >
    <template
      v-for='(option, index) in data'
      :key='option[value]'
    >
      <v-radio
        v-bind='fieldProps'
        :value='option[value]'
        :class="index !== data.length - 1 && !fieldProps.inline ? 'mb-2' : ''"
      >
        <template #label='{ label }'>
          <div class='mr-2'>{{ option[title] }}</div>
        </template>
      </v-radio>
    </template>
  </v-radio-group>
</template>

<script setup lang='ts'>
import { computed, onMounted, watch } from 'vue';

import { RadioField } from '@/types/engine/controls';

import { useClass, useFormModel, useLabel, useProps, useRules, useSource } from '../../core/composables';

const props = defineProps<{
  schema: RadioField;
  model: object;
}>();
const { label } = useLabel(props.schema);
const { bindProps, fieldProps } = useProps();
const { title, value, loading, data, returnObject } = useSource(props.schema.source);
const { bindClass } = useClass();
const { getValue, setValue } = useFormModel();
const initValue: boolean = props.schema.initValue !== undefined ? props.schema.initValue : true;


const localModel = computed({
  get(): string | number {
    if (returnObject) {
      const obj = getValue(props.model, props.schema);
      return obj ? obj[value] : null;
    } else {
      return getValue(props.model, props.schema);
    }
  },
  set(val: any) {
    if (returnObject) {
      const obj = data.value.filter((item) => {
        return item[value] === val;
      })[0];
      setValue(obj, props.schema);
    } else {
      setValue(val, props.schema);
    }
  },
});

const { bindRules, rules, requiredInputClass } = useRules();

watch(loading, () => {
  if (data.value.length === 0) {
    console.warn(`Field ${props.schema.key} don't have any data/options/items`);
  }
  if (!loading.value && localModel.value == null && initValue) {
    localModel.value = data.value[0][value];
  }
});

onMounted(async () => {
  bindRules(props.schema);
  bindProps(props.schema);
  if (!loading.value && localModel.value == null && initValue) {
    localModel.value = data.value[0][value];
  }
});
</script>

<style scoped lang='css'>
:deep(.v-label) {
  margin-inline-start: 0 !important;
}

:deep(.v-selection-control-group) {
  padding-left: 0 !important;
}
</style>
