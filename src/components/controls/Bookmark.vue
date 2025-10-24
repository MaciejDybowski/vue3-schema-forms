<template>
  <v-tabs
    v-model="localModel"
    :class="[bindClass(schema), requiredInputClass]"
    :stacked="schema?.stacked ?? false"
    center-active
    v-bind="{ ...defaultProps }"
  >
    <!--  <v-tab prepend-icon="mdi-account" text="Option 1" value="option-1"></v-tab> -->
    <v-tab
      v-for="(item, index) in data"
      :key="index"
      :value="returnObject ? item : item[value]"
    >
      {{ item[title] }}
    </v-tab>
  </v-tabs>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';

import { useEventHandler } from '@/core/composables/useEventHandler';
import { EngineBookmarkField } from '@/types/engine/controls';

import { useClass, useFormModel, useProps, useRules, useSource } from '../../core/composables';

const { schema, model } = defineProps<{
  schema: EngineBookmarkField;
  model: object;
}>();

const { title, value, loading, data, returnObject } = useSource(schema.source);
const { bindProps, fieldProps } = useProps();
const { bindRules, rules, requiredInputClass } = useRules();
const { bindClass } = useClass();
const { getValue, setValue } = useFormModel();
const { onChange } = useEventHandler();

const defaultProps = computed(() => {
  return {
    color: schema.color || 'primary',
    'bg-color': schema['bg-color'] || null,
    horizontal: schema['horizontal'] || 'vertical',
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
  await bindRules(schema);
  await bindProps(schema);
});
</script>

<style lang="css" scoped>
.v-tab {
  text-transform: none;
}
</style>
