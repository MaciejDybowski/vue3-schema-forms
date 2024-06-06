<template>
  <v-row>
    <v-col class="duplicated-section-item">
      <v-hover
        v-slot="{ isHovering, props }"
        open-delay="200"
      >
        <div
          class="d-flex"
          v-bind="props"
        >
          <slot
            name="box"
            :isHovering="isHovering"
          ></slot>
        </div>
      </v-hover>
      <v-divider
        v-if="showDivider"
        class="mt-6"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    showDivider: boolean;
  }>(),
  {
    showDivider: false,
  },
);
</script>

<style scoped lang="css"></style>
