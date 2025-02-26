<template>
  <v-textarea
    v-model='localModel'
    :label='label'
    :rules="!fieldProps.readonly ? rules: []"
    v-bind='fieldProps'
    :class='bindClass(schema) + requiredInputClass'
  />
</template>

<script setup lang='ts'>
import { computed, onMounted } from 'vue';

import { useClass, useFormModel, useLabel, useProps, useRules } from '@/core/composables';
import { EngineField } from '@/types/engine/EngineField';

const props = defineProps<{
  schema: EngineField;
  model: object;
}>();
const { label, bindLabel } = useLabel(props.schema);
const { bindRules, rules, requiredInputClass } = useRules();
const { bindProps, fieldProps } = useProps();
const { bindClass } = useClass();
const { getValue, setValue } = useFormModel();

const localModel = computed({
  get(): string {
    return getValue(props.model, props.schema);
  },
  set(val: any) {
    setValue(val, props.schema);
  },
});

onMounted(async () => {
  await bindLabel(props.schema);
  await bindRules(props.schema);
  await bindProps(props.schema);
});

</script>

<style scoped lang='css'></style>
