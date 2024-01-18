<template>
  <v-icon
    v-if="show"
    class="draggable-icon"
  >
    mdi-drag-vertical
  </v-icon>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    show: boolean;
  }>(),
  {
    show: false,
  },
);
</script>

<style scoped lang="css">
.draggable-icon {
  min-width: 0;
  max-width: 0;
  position: relative;
  left: -12px;
  top: 0;
  cursor: pointer;
}
</style>
