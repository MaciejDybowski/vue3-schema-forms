<template>
  <v-chip
    :color="element.backgroundColor"
    :style="`color: ${element.textColor}; background-color: ${element.backgroundColor}`"
    v-bind="$attrs"
    variant="flat"
  >
    {{ getTranslatedTitle(element.title) }}
  </v-chip>
</template>

<script lang="ts" setup>
import { useLocale } from '@/core/composables';
import { DictionaryItemChip } from '@/types/engine/DictionaryItemChip';


export interface BuiltInTranslationLanguages {
  default?: string;
  pl?: string;
  en?: string;
  ru?: string;
  de?: string;
  es?: string;
  fr?: string;
}

const { locale } = useLocale();
const props = withDefaults(
  defineProps<{
    element: DictionaryItemChip;
  }>(),
  {},
);

function getTranslatedTitle(title: string | BuiltInTranslationLanguages) {
  if (typeof title === 'string') {
    return title;
  } else {
    return title[locale.value] ? title[locale.value] : title.default;
  }
}
</script>

<style lang="scss" scoped></style>
