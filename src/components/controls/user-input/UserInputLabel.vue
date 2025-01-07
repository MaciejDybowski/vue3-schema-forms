<template>
  <v-chip
    :color="element.backgroundColor"
    :style="`color: ${element.textColor}; background-color: ${element.backgroundColor}`"
    v-bind="$attrs"
    variant="flat"
  >
    {{ element.title }}
  </v-chip>
</template>

<script lang="ts" setup>
import { Label } from "@/types/engine/Label";

const props = withDefaults(
  defineProps<{
    element: Label;
  }>(),
  {},
);
</script>

<style lang="scss" scoped></style>
