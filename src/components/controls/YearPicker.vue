<template>
  <v-select
    v-model="localModel"
    :class="bindClass(schema) + requiredInputClass"
    :items="years"
    :label="label"
    :rules="activeRules"
    clearable
    v-bind="fieldProps"
  />
</template>

<script lang="ts" setup>
import jsonata from 'jsonata';

import { computed, onMounted, ref, toRef } from 'vue';

import { useClass, useFormModel, useLabel, useProps, useRules } from '@/core/composables';
import { useActiveRules } from '@/core/composables/useActiveRules';
import { YearPicker } from '@/types/engine/YearPicker';

const currentYear = new Date().getFullYear();
const years = ref(Array.from({ length: 50 }, (_, i) => currentYear - i));

const { schema, model, validationsDisabled } = defineProps<{
  schema: YearPicker;
  model: object;
  validationsDisabled: boolean;
}>();

const { bindClass } = useClass();
const { bindRules, rules, requiredInputClass } = useRules();
const { bindProps, fieldProps } = useProps();
const { label, bindLabel } = useLabel(schema);
const { getValue, setValue } = useFormModel();
const { activeRules } = useActiveRules({
  fieldProps,
  validationsDisabled: toRef(() => validationsDisabled),
  rules,
});

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

  if (schema.expression) {
    const model = { currentYear: currentYear };
    years.value = await jsonata(schema.expression).evaluate(model);
  } else {
    const a = currentYear - 25;
    const b = currentYear + 25;
    years.value = rangeDescending(Math.max(a, b), Math.min(a, b));
  }
});
</script>

<style lang="css" scoped></style>
