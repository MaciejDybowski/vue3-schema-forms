<template>
  <v-row>
    <v-col
      cols="12"
      class="d-flex flex-column"
    >
      <div class="d-flex align-center">
        <form-action-button
          color="success"
          value="Validate"
          @click="emit('validate')"
        />
        <form-valid-visualization v-if="formValid" />
      </div>
      <form-error-visualization :error-messages="errorMessages" />
      <form-action-button
        color="error"
        value="Reset Form"
        class="mt-4"
        @click="emit('reset')"
      />
      <form-action-button
        color="warning"
        value="Reset Validation"
        class="mt-4"
        @click="emit('resetValidation')"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ValidationFromError } from '@/types/engine/ValidationFromError';

import FormActionButton from './FormActionButton.vue';
import FormErrorVisualization from './FormErrorVisualization.vue';
import FormValidVisualization from './FormValidVisualization.vue';

const props = defineProps<{
  formValid: boolean | null;
  errorMessages: Array<ValidationFromError>;
}>();

const emit = defineEmits<{
  (e: 'validate'): void;
  (e: 'reset'): void;
  (e: 'resetValidation'): void;
}>();
</script>

<style scoped lang="css"></style>
