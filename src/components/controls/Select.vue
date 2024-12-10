<template>
  <v-select
    v-model='localModel'
    :label='label'
    v-bind='fieldProps'
    :rules='rules'
    :class='bindClass(schema) + requiredInputClass'
    :item-title='title'
    :item-value='value'
    :items='data'
    :loading='loading'
    :return-object='returnObject as any'
  ></v-select>
</template>

<script setup lang='ts'>
import { computed, onMounted } from 'vue';

import { EngineSourceField } from '@/types/engine/controls';

import { useClass, useFormModel, useLabel, useProps, useRules, useSource } from '../../core/composables';

const props = defineProps<{
  schema: EngineSourceField;
  model: object;
}>();
const { label } = useLabel(props.schema);
const { title, value, loading, data, returnObject } = useSource(props.schema.source);
const { bindProps, fieldProps } = useProps();
const { bindRules, rules, requiredInputClass } = useRules();
const { bindClass } = useClass();
const { getValue, setValue } = useFormModel();


const localModel = computed({
  get(): string | number {
    return getValue(props.model, props.schema);
  },
  set(val: any) {
    setValue(val, props.schema);
  },
});

onMounted(async () => {
  await bindRules(props.schema);
  await bindProps(props.schema);
});
</script>

<style scoped lang='css'></style>
