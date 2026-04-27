<template>
  <component
    ref="innerRef"
    :is="component"
    v-model="model"
    :multiple="multiple"
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
  </component>
</template>

<script lang="ts" setup>
import { isArray } from 'lodash';

import { computed, ref, useAttrs } from 'vue';

import { Pagination } from './Pagination';

type ComponentType = 'v-autocomplete' | 'v-combobox';
const attrs = useAttrs();
const props = withDefaults(
  defineProps<{
    component: ComponentType;
    modelValue: any;
    lazy?: boolean;
    options?: Pagination;
    maxSelection?: number;
    multiple?: boolean;
  }>(),
  {
    component: 'v-autocomplete',
    lazy: false,
    multiple: false,
    maxSelection: 0,
  },
);

const model = computed({
  get(): any {
    return props.modelValue;
  },
  set(val: any[]) {
    if (props.multiple && props.maxSelection > 0 && isArray(val)) {
      val.length > props.maxSelection && val.shift();
    }
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
const innerRef = ref<any>(null);

defineExpose({
  validate: () => innerRef.value?.validate(),
  errors: computed(() => innerRef.value?.errors),
  errorMessages: computed(() => innerRef.value?.errorMessages),
});
</script>

<style lang="css" scoped></style>
