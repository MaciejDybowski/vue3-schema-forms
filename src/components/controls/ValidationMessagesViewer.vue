<template>
  <template
    v-for="messageDefinition in localModel"
    :key="messageDefinition.code"
  >
    <v-alert
      v-bind="{ ...fieldProps, type: messageDefinition.severity }"
      class="mb-2"
    >
      {{ messageDefinition.message }}
    </v-alert>
  </template>
</template>

<script lang="ts" setup>
import { ComputedRef, computed, onMounted } from 'vue';

import { useFormModel, useProps } from '@/core/composables';
import { ValidationMessageViewer } from '@/types/engine/controls';

const { schema, model } = defineProps<{
  schema: ValidationMessageViewer;
  model: object;
}>();

const { getValue } = useFormModel();
const { bindProps, fieldProps } = useProps();

interface ValidationMessage {
  code: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
  inputId?: string;
}

const localModel: ComputedRef<ValidationMessage[] | null> = computed(() => getValue(model, schema));

onMounted(async () => {
  await bindProps(schema);
});
</script>

<style lang="css" scoped></style>
