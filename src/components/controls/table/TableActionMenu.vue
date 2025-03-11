<template>
  <v-menu
    :persistent="false"
    location="bottom"
    offset="0 -12"
    transition="scale-transition"
    v-bind="$attrs"
  >
    <template #activator="{ isActive, props: p }">
      <v-btn
        class="table-cell-context-actions"
        v-show="show || isActive"
        :icon="icon"
        density="compact"
        v-bind="p"
        variant="plain"
        @click="prevent($event)"
      >
      </v-btn>
    </template>
    <slot></slot>
  </v-menu>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    show: boolean;
    icon: string;
  }>(),
  {
    icon: "mdi-dots-vertical",
  },
);

function prevent(ev) {
  ev.stopPropagation();
  ev.preventDefault();
}
</script>
