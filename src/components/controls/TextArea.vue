<template>
  <v-textarea
    v-model='localModel'
    :label='label'
    :rules='rules(schema)'
    v-bind='fieldProps'
    :class='bindClass(schema)'
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
const { label } = useLabel(props.schema);
const { rules } = useRules();
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

onMounted(() => {
  bindProps(props.schema);
});

</script>

<style scoped lang='css'></style>
