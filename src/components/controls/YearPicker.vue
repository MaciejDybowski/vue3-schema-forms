<template>
  <v-select
    v-model="localModel"
    :class="bindClass(schema) + requiredInputClass"
    :items="years"
    :label="label"
    :rules="!fieldProps.readonly ? rules : []"
    clearable
    v-bind="fieldProps"
  />
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';

import { useClass, useFormModel, useLabel, useProps, useRules } from '@/core/composables';
import { YearPicker } from '@/types/engine/YearPicker';

const currentYear = new Date().getFullYear();
const years = ref(Array.from({ length: 50 }, (_, i) => currentYear - i));

const { schema, model } = defineProps<{
  schema: YearPicker;
  model: object;
}>();

const { bindClass } = useClass();
const { bindRules, rules, requiredInputClass } = useRules();
const { bindProps, fieldProps } = useProps();
const { label, bindLabel } = useLabel(schema);
const { getValue, setValue } = useFormModel();

const localModel = computed({
  get(): number {
    return getValue(model, schema);
  },
  set(val: any) {
    setValue(val, schema);
  },
});

function rangeDescending(start: number, end: number) {
  return Array.from({ length: start - end + 1 }, (_, i) => start - i);
}

onMounted(async () => {
  await bindLabel(schema);
  await bindRules(schema);
  await bindProps(schema);

  if (schema.range && schema.range.length == 2) {
    const [a, b] = schema.range;
    years.value = rangeDescending(Math.max(a, b), Math.min(a, b));
  }
});
</script>

<style lang="css" scoped></style>
