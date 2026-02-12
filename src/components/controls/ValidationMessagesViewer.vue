<template>
  <template
    v-for="messageDefinition in localModel"
    v-if="!validationsDisabled"
    :key="messageDefinition.code"
  >
    <v-alert
      :id="messageDefinition.code"
      :class="['mb-4', `${includeInValidation(messageDefinition.severity)}`]"
      v-bind="{ ...fieldProps, type: messageDefinition.severity }"
    >
      {{ messageDefinition.message }}
    </v-alert>
  </template>
</template>

<script lang="ts" setup>
import { ComputedRef, computed, onMounted } from 'vue';

import { useFormModel, useProps } from '@/core/composables';
import { Severity, ValidationMessage } from '@/types/engine/ValidationMessage';
import { ValidationMessageViewer } from '@/types/engine/controls';

const { schema, model } = defineProps<{
  schema: ValidationMessageViewer;
  model: object;
  validationsDisabled: boolean;
}>();

const { getValue } = useFormModel();
const { bindProps, fieldProps } = useProps();

const localModel: ComputedRef<ValidationMessage[] | null> = computed(() => getValue(model, schema));

function includeInValidation(severity: Severity): string {
  switch (severity) {
    case 'error':
      return 'include-in-validation';
    case 'warning':
      return 'include-in-validation';
    default:
      return '';
  }
}

onMounted(async () => {
  await bindProps(schema);
});

function generateId(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.slice(0, 3))
    .join('')
    .slice(0, 10);
}
</script>

<style lang="css" scoped></style>
