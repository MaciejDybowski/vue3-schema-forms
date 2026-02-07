<template>
  <v-tabs
    v-model="localModel"
    :class="[bindClass(schema)]"
    :stacked="schema?.stacked ?? false"
    center-active
    data-testid="bookmarks"
    v-bind="{ ...defaultProps }"
  >
    <v-tab
      v-for="(item, index) in data"
      :key="index"
      :data-testid="`bookmark-icon-${index}`"
      :prepend-icon="item.icon"
      :value="returnObject ? item : item[value]"
    >
      {{ item[title] }}
    </v-tab>
  </v-tabs>
</template>

<script lang="ts" setup>
import { useTheme } from 'vuetify';

import { computed, onMounted } from 'vue';

import { useClass, useFormModel, useProps, useRules, useSource } from '@/core/composables';
import { useEventHandler } from '@/core/composables/useEventHandler';
import { adjustColorForDarkMode } from '@/core/engine/utils';
import { EngineBookmarkField } from '@/types/engine/controls';

const { schema, model } = defineProps<{
  schema: EngineBookmarkField;
  model: object;
}>();

const { title, value, loading, data, returnObject } = useSource(schema.source);
const { bindProps, fieldProps } = useProps();
const { bindClass } = useClass();
const { getValue, setValue } = useFormModel();
const { onChange } = useEventHandler();
const theme = useTheme();

const defaultProps = computed(() => {
  return {
    color: schema.color
      ? theme.name.value == 'light'
        ? schema.color
        : adjustColorForDarkMode(schema.color)
      : 'primary',
    'bg-color': schema['bg-color']
      ? theme.name.value == 'light'
        ? schema['bg-color']
        : adjustColorForDarkMode(schema['bg-color'])
      : null,
    direction: schema['direction'] || 'horizontal',
    'slider-color': schema['slider-color'] || null,
  };
});

const localModel = computed({
  get(): any {
    return getValue(model, schema);
  },
  set(val: any) {
    setValue(val, schema);
    onChange(schema, model);
  },
});

onMounted(async () => {
  await bindProps(schema);
});
</script>

<style lang="css" scoped>
:deep(.v-tab) {
  text-transform: none;
  /*  font-size: 0.8rem;
  min-width: unset;
  padding: 4px 8px;
  height: auto !important;
  line-height: 1.2em;
  white-space: normal;
  word-break: break-word;
  text-align: center;*/
}
</style>
