<template>
  <v-combobox
    v-model="model"
    v-bind="attrs"
  >
    <template
      v-for="(_, slot) in $slots"
      v-slot:[slot]
    >
      <slot :name="slot"></slot>
    </template>

    <template #append-item>
      <div v-if="lazy && isNextPage">
        <v-list-item v-intersect="loadMore">
          <v-progress-linear
            v-show="appending"
            color="primary"
            indeterminate
          ></v-progress-linear>
        </v-list-item>
      </div>
    </template>
  </v-combobox>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from "vue";

import { Pagination } from "./Pagination";

const attrs = useAttrs();
const props = withDefaults(
  defineProps<{
    modelValue: any;
    lazy?: boolean;
    options?: Pagination;
  }>(),
  {
    lazy: false,
  },
);

const model = computed({
  get(): any {
    return props.modelValue;
  },
  set(val: any[]) {
    emit("update:modelValue", val);
  },
});

const emit = defineEmits<{
  (e: "update:modelValue", val: any[]);
  (e: "loadMoreRecords");
}>();

const appending = ref(false);

const isNextPage = computed(() => {
  return props.options?.isNextPage();
});

function loadMore(isIntersecting) {
  appending.value = isIntersecting;
  if (isIntersecting) {
    emit("loadMoreRecords");
  }
}
</script>

<style scoped lang="css"></style>
