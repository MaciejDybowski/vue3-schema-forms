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
  color: #333;
  background-color: #fff;
  border: 1px solid #ddd;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e0e7ff;
    border-color: #4f46e5;
    color: #4f46e5;
  }

  &.active {
    background-color: #4f46e5;
    border-color: #4f46e5;
    color: #fff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
