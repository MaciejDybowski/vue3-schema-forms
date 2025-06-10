<template>
  <div class="footer">
    <v-menu location="bottom">
      <template #activator="{ props: p, isActive }">
        <v-chip
          class="px-2"
          label
          v-bind="p"
          variant="outlined"
        >
          {{ itemsPerPage }}
          <v-icon
            :class="{ rotate: isActive }"
            class="toggle-menu"
          >
            mdi-chevron-down
          </v-icon>
        </v-chip>
      </template>
      <v-list
        :selected="[itemsPerPage]"
        select-strategy="leaf"
      >
        <v-list-item
          v-for="option in itemsPerPageOptions"
          :key="option"
          :title="option"
          :value="option"
          @click="emit('update:itemsPerPage', option)"
        />
      </v-list>
    </v-menu>

    <div class="pagination-wrapper">
      <div class="pagination">
        <v-btn
          :disabled="prevDisabled"
          icon="mdi-chevron-left"
          size="small"
          variant="text"
          @click="changePage(page - 1)"
        ></v-btn>
        <span class="page-info">{{ page }}</span>
        <v-btn
          :disabled="nextDisabled"
          icon="mdi-chevron-right"
          size="small"
          variant="text"
          @click="changePage(page + 1)"
        ></v-btn>
      </div>
    </div>
    <span class="item-info">{{ startItem }} - {{ endItem }} of {{ totalItems }}</span>
  </div>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue';

const props = defineProps<{
  page: number;
  itemsPerPage: number;
  pageCount: number;
  totalItems: number;
  itemsPerPageOptions: any[];
}>();

const emit = defineEmits(['update:page', 'update:itemsPerPage']);

const { page, itemsPerPage, pageCount, totalItems } = toRefs(props);

const prevDisabled = computed(() => page.value <= 1);
const nextDisabled = computed(() => page.value >= pageCount.value);

const changePage = (newPage: number) => {
  if (newPage >= 1 && newPage <= pageCount.value) {
    emit('update:page', newPage);
  }
};

const startItem = computed(() => {
  if (props.totalItems == 0) {
    return 0;
  } else {
    return (page.value - 1) * itemsPerPage.value + 1;
  }
});
const endItem = computed(() => Math.min(page.value * itemsPerPage.value, totalItems.value));
</script>

<style scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 16px;
  gap: 10px;
  width: 100%;
}

.pagination-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.pagination {
  display: flex;
  align-items: center;
  gap: 6px;
}

.page-info {
  min-width: 24px;
  text-align: center;
  font-size: 14px;
}

.item-info {
  font-size: 14px;
}

.items-per-page {
  max-width: 100px;
}
</style>
