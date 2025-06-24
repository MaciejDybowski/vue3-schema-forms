<template>
  <div class="draggable-context-menu">
    <v-menu
      location="end"
      offset="10"
    >
      <template v-slot:activator="{ isActive, props }">
        <v-btn
          density="compact"
          icon
          size="small"
          v-bind="props"
          variant="text"
        >
          <v-icon v-if="isActive || show">mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <slot>
        <v-list density="compact">
          <v-list-item
            v-for="item in actions"
            :key="item.actionId"
            :link="true"
            @click="emit('handleAction', item.actionId)"
          >
            <div class="d-flex align-center">
              <v-icon
                :color="item.iconColor"
                class="mr-1"
                size="small"
              >
                {{ item.icon }}
              </v-icon>
              <span>{{ t(`${item.translationKey}`) }}</span>
            </div>
          </v-list-item>
        </v-list>
      </slot>
    </v-menu>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';

import { useLocale } from '@/core/composables';

const { t } = useLocale();
const actions = reactive([
  {
    actionId: 'delete',
    icon: 'mdi-trash-can-outline',
    iconColor: 'error',
    translationKey: 'duplicatedSection.deleteAction',
  },
  {
    actionId: 'copyBelow',
    icon: 'mdi-content-copy',
    iconColor: 'success',
    translationKey: 'duplicatedSection.copyBelowAction',
  },
  {
    actionId: 'addBelow',
    icon: 'mdi-playlist-plus',
    iconColor: 'success',
    translationKey: 'duplicatedSection.addBelowAction',
  },
]);

const props = withDefaults(
  defineProps<{
    show: boolean;
  }>(),
  {
    show: false,
  },
);

const emit = defineEmits<{
  (e: 'handleAction', actionId: string): void;
}>();
</script>

<style lang="scss" scoped>
.draggable-context-menu {
  min-width: 0;
  max-width: 0;
  position: relative;
  right: -12px;
  top: 0;
}
</style>
