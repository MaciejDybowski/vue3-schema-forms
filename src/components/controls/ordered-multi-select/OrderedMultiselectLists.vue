<template>
  <v-row
    class="d-flex bg-surface"
    no-gutters
    style="border: 1px rgb(0, 0, 0, 0.12) solid"
  >
    <v-col cols="6">
      <v-card-title class="text-subtitle-2 text-high-emphasis bg-surface"
        >{{ t('available') }}
      </v-card-title>
      <v-divider class="mt-1" />
      <v-list
        class="overflow-y-auto pa-0 ma-0"
        style="max-height: 350px"
      >
        <v-list-item
          v-for="item in items"
          :key="item[value]"
          @click="toggleItem(item)"
        >
          <template #prepend>
            <v-checkbox
              :hide-details="true"
              :model-value="isSelected(item)"
              density="compact"
              @click.stop="toggleItem(item)"
            />
          </template>
          <v-list-item-title>{{ item[title] }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-col>
    <v-col
      cols="6"
      style="border-left: 1px rgb(0, 0, 0, 0.12) solid"
    >
      <v-card-title class="text-subtitle-2 text-high-emphasis bg-surface"
        >{{ t('selected') }}
      </v-card-title>
      <v-divider class="mt-1" />

      <draggable
        :group="{ name: 'items', pull: 'clone', put: true }"
        :item-key="value"
        :model-value="selectedItems"
        :sort="true"
        class="overflow-y-auto"
        handle=".handle"
        style="max-height: 350px"
        @update:modelValue="(newItems) => emit('update:selectedItems', newItems)"
      >
        <template #item="{ element }">
          <v-list-item
            class="bg-surface"
            height="48px"
          >
            <template #prepend>
              <v-icon
                class="handle"
                style="cursor: grab"
                >mdi-drag
              </v-icon>
            </template>
            <v-list-item-title>{{ element[title] }}</v-list-item-title>
            <template #append>
              <v-icon
                small
                @click.stop="removeItem(element)"
                >mdi-close
              </v-icon>
            </template>
          </v-list-item>
        </template>
      </draggable>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable';

import { defineEmits, ref, watch } from 'vue';

import { useLocale } from '@/core/composables';

const { items, selectedItems, title, value } = defineProps<{
  items: any[];
  selectedItems: any[];
  title: string;
  value: string;
}>();

const internalSelectedItems = ref([...selectedItems]);

watch(
  () => selectedItems,
  (newVal) => {
    internalSelectedItems.value = [...newVal];
  },
);

const { t } = useLocale();

const emit = defineEmits<{
  (e: 'update:selectedItems', value: any[]): void;
}>();

const removeItem = (item: (typeof items)[number]) => {
  const updatedItems = selectedItems.filter((i) => i[value] !== item[value]);
  emit('update:selectedItems', updatedItems);
};

const toggleItem = (item: (typeof items)[number]) => {
  const idx = selectedItems.findIndex((i) => i[value] === item[value]);
  const updatedItems = [...selectedItems];
  if (idx === -1) {
    updatedItems.push(item);
  } else {
    updatedItems.splice(idx, 1);
  }
  emit('update:selectedItems', updatedItems);
};

const isSelected = (item: (typeof items)[number]) => {
  return internalSelectedItems.value?.some((i) => i[value] === item[value]);
};
</script>

<style lang="scss" scoped>
:deep(.v-list-item__prepend) {
  display: block;
}
</style>
