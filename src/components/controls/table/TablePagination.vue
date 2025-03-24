<template>
  <div class="footer">

    <v-menu location="bottom">
      <template #activator="{ props: p, isActive }">
        <v-chip
          v-bind="p"
          label
          variant="outlined"

          class="px-2"
        >
          {{ itemsPerPage }}
          <v-icon
            class="toggle-menu"
            :class="{ rotate: isActive }"
          >
            mdi-chevron-down
          </v-icon>
        </v-chip>
      </template>
      <v-list
        select-strategy="leaf"
        :selected="[itemsPerPage]"
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
        <v-btn icon="mdi-chevron-left" size="small" variant="text" @click="changePage(page - 1)"
               :disabled="prevDisabled"></v-btn>
        <span class="page-info">{{ page }}</span>
        <v-btn icon="mdi-chevron-right" size="small" variant="text" @click="changePage(page + 1)"
               :disabled="nextDisabled"></v-btn>
      </div>

    </div>
    <span class="item-info">{{ startItem }} - {{ endItem }} of {{ totalItems }}</span>
  </div>
</template>

<script setup>
import { computed, toRefs } from 'vue';

const props = defineProps({
  page: Number,
  itemsPerPage: Number,
  pageCount: Number,
  itemsPerPageOptions: Array,
  totalItems: Number,
});
const emit = defineEmits(['update:page', 'update:itemsPerPage']);

const { page, itemsPerPage, pageCount, totalItems } = toRefs(props);

const prevDisabled = computed(() => page.value <= 1);
const nextDisabled = computed(() => page.value >= pageCount.value);

const changePage = (newPage) => {
  if (newPage >= 1 && newPage <= pageCount.value) {
    emit('update:page', newPage);
  }
};

const startItem = computed(() => (page.value - 1) * itemsPerPage.value + 1);
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
