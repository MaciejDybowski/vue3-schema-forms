<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    width="300"
  >
    <template #activator="{ props }">
      <v-text-field
        v-bind="props"
        :model-value="formattedSelection"
        label="Wybierz i uporządkuj"
        readonly
        @click="menu = true"
      />
    </template>

    <v-card>
      <v-card-title class="text-subtitle-2">Wybrane (przeciągnij)</v-card-title>

      <draggable v-model="selectedItems" item-key="id" handle=".handle">
        <template #item="{ element }">
          <v-list-item>
            <template #prepend>
              <v-icon class="handle mr-2" style="cursor: grab;">mdi-drag</v-icon>
            </template>
            <v-list-item-title>{{ element.name }}</v-list-item-title>
            <template #append>
              <v-icon small @click.stop="removeItem(element)">mdi-close</v-icon>
            </template>
          </v-list-item>
        </template>
      </draggable>

      <v-divider class="my-2" />

      <v-card-title class="text-subtitle-2">Dostępne</v-card-title>
      <v-list class="max-h-60 overflow-y-auto">
        <v-list-item
          v-for="item in items"
          :key="item.id"
          @click="toggleItem(item)"
        >
          <template #prepend>
            <v-checkbox-btn :model-value="isSelected(item)" />
          </template>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import draggable from 'vuedraggable'

const menu = ref(false)

const items = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  name: `Element ${i + 1}`
}))

const selectedItems = ref<typeof items>([])

const isSelected = (item: typeof items[number]) =>
  selectedItems.value.some(i => i.id === item.id)

const toggleItem = (item: typeof items[number]) => {
  const idx = selectedItems.value.findIndex(i => i.id === item.id)
  if (idx === -1) {
    selectedItems.value.push(item)
  } else {
    selectedItems.value.splice(idx, 1)
  }
}

const removeItem = (item: typeof items[number]) => {
  selectedItems.value = selectedItems.value.filter(i => i.id !== item.id)
}

const formattedSelection = computed(() =>
  selectedItems.value.map((item, idx) => `${idx + 1} - ${item.name}`).join(', ')
)
</script>

<style scoped>
.max-h-60 {
  max-height: 240px;
}
</style>
