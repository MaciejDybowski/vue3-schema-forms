<template>
  <v-tooltip location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn
        :class="{ active }"
        :disabled="disabled"
        :icon="`mdi-${icon}`"
        class="editor-button"
        density="comfortable"
        size="small"
        v-bind="props"
        variant="tonal"
        @click="$emit('click', $event)"
      />
    </template>
    <span>{{ name }}</span>
  </v-tooltip>
</template>

<script lang="ts" setup>
interface Props {
  icon: string;
  name: string;
  active?: boolean;
  disabled?: boolean;
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.editor-button {
  color: rgb(var(--v-theme-on-surface));
  background-color: rgb(var(--v-theme-surface));
  border: 1px solid rgb(var(--v-theme-outline-variant));
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(var(--v-theme-primary), 0.1);
    border-color: rgb(var(--v-theme-primary));
    color: rgb(var(--v-theme-primary));
  }

  &.active {
    background-color: rgb(var(--v-theme-primary));
    border-color: rgb(var(--v-theme-primary));
    color: rgb(var(--v-theme-on-primary));
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
