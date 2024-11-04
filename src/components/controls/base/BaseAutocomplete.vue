<template>
  <v-autocomplete
    v-model="model"
    v-bind="attrs"
  >
    <template
      v-for="(_, name) in $slots"
      #[name]="scope"
    >
      <slot
        :name
        v-bind="scope ?? {}"
      />
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
  </v-autocomplete>
</template>

<script lang="ts" setup>
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

<style lang="css" scoped></style>
