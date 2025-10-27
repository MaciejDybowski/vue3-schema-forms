<template>
  <v-tooltip location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn
        variant="tonal"
        density="comfortable"
        size="small"
        class="editor-button"
        :class="{ active }"
        :icon="`mdi-${icon}`"
        :disabled="disabled"
        v-bind="props"
        @click="$emit('click', $event)"
      />
    </template>
    <span>{{ name }}</span>
  </v-tooltip>
</template>

<script setup lang="ts">
interface Props {
  icon: string
  name: string
  active?: boolean
  disabled?: boolean
}

defineProps<Props>()
</script>

<style scoped lang="scss">
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
