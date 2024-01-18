<template>
  <v-autocomplete
    v-model="model"
    v-bind="attrs"
  >
    <template
      v-for="(_, slot) in $slots"
      v-slot:[slot]="scope"
    >
      <slot
        :name="slot"
        v-bind="scope"
      />
    </template>

    <template #append-item>
      <div v-if="lazy && isNextPage">
        <v-list-item
          class="pa-0 d-flex justify-center"
          v-intersect="loadMore"
        >
          <div v-show="appending">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>
        </v-list-item>
      </div>
    </template>
  </v-autocomplete>
</template>

<script setup lang="ts">
import { Pagination } from "./Pagination";
import { computed, onMounted, ref, useAttrs } from "vue";

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
