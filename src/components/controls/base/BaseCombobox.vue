<template>
  <v-combobox
    v-model="model"
    v-bind="attrs"
  >

    <template #item="{ item, props }">
      <slot name="item" :item="item" :props="props" />
    </template>


    <template
      v-for="(_, slot) in ($slots as VComboboxSlots)"
      v-slot:[slot]="scope"
    >
      <slot
        :name="slot"
        v-bind="scope"
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


  </v-combobox>
</template>

<script lang="ts" setup>
import { computed, ref, useAttrs } from 'vue';

import { Pagination } from './Pagination';
import { VCombobox } from "vuetify/components";

type VComboboxSlots = InstanceType<typeof VCombobox>['$slots'];

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
    emit('update:modelValue', val);
  },
});

const emit = defineEmits<{
  (e: 'update:modelValue', val: any[]): void;
  (e: 'loadMoreRecords'): void;
}>();

const appending = ref(false);

const isNextPage = computed(() => {
  return props.options?.isNextPage();
});

function loadMore(isIntersecting: boolean) {
  appending.value = isIntersecting;
  if (isIntersecting) {
    emit('loadMoreRecords');
  }
}
</script>

<style lang="css" scoped></style>
