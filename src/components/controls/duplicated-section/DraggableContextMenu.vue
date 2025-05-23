<template>
  <div class="draggable-context-menu">
    <v-menu
      location="end"
      offset="10"
    >
      <template v-slot:activator="{ isActive, props }">
        <v-btn
          v-bind="props"
          icon
          size="small"
          variant="text"
          density="compact"
        >
          <v-icon v-if="isActive || show">mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <slot>
        <v-list density="compact">
          <v-list-item
            :link="true"
            v-for="item in actions"
            :key="item.actionId"
            @click="emit('handleAction', item.actionId)"
          >
            <div class="d-flex align-center">
              <v-icon
                size="small"
                :color="item.iconColor"
                class="mr-1"
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
<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import { reactive } from 'vue';

const { t } = useI18n();
const actions = reactive([
  {
    actionId: 'delete',
    icon: 'mdi-trash-can-outline',
    iconColor: 'error',
    translationKey: 'deleteAction',
  },
  {
    actionId: 'copyBelow',
    icon: 'mdi-content-copy',
    iconColor: 'success',
    translationKey: 'copyBelowAction',
  },
  {
    actionId: 'addBelow',
    icon: 'mdi-playlist-plus',
    iconColor: 'success',
    translationKey: 'addBelowAction',
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

<style scoped lang="scss">
.draggable-context-menu {
  min-width: 0;
  max-width: 0;
  position: relative;
  right: -12px;
  top: 0;
}
</style>

<i18n lang="json">
{
  "en": {
    "deleteAction": "Delete",
    "addBelowAction": "Add below",
    "copyBelowAction": "Copy below"
  },
  "pl": {
    "deleteAction": "Usuń",
    "addBelowAction": "Dodaj poniżej",
    "copyBelowAction": "Kopiuj poniżej"
  }
}
</i18n>
