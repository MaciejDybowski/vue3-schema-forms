<template>
  <v-textarea
    v-model="localModel"
    :label="label"
    :rules="activeRules"
    v-bind="fieldProps"
    :class="bindClass(schema) + requiredInputClass"
    @update:model-value="onChange(schema, model)"
  />
</template>

<script setup lang="ts">
import { computed, onMounted, toRef } from 'vue';

import { useClass, useFormModel, useLabel, useProps, useRules } from '@/core/composables';
import { useActiveRules } from '@/core/composables/useActiveRules';
import { EngineField } from '@/types/engine/EngineField';
import { useEventHandler } from '@/core/composables/useEventHandler';

const props = defineProps<{
  schema: EngineField;
  model: object;
  validationsDisabled: boolean;
}>();
const { label, bindLabel } = useLabel(props.schema);
const { bindRules, rules, requiredInputClass } = useRules();
const { bindProps, fieldProps } = useProps();
const { bindClass } = useClass();
const { getValue, setValue } = useFormModel();
const { activeRules } = useActiveRules({
  fieldProps,
  validationsDisabled: toRef(() => props.validationsDisabled),
  rules,
});
const { onChange } = useEventHandler();

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

<style scoped lang="css"></style>
