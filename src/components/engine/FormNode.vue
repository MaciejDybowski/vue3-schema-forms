<template>
  <v-col
    v-if="shouldRender"
    v-show="shouldShow"
    :class="[layoutCssClass, schema.layout.cellClass]"
    :cols="cols"
  >
    <component
      :is="`node-${schema.layout.component}`"
      :validationsDisabled="shouldDisableRulesWhenFieldIsHidden"
      :model="model"
      :schema="schema"
    />
  </v-col>
  <div
    v-if="fillRow"
    class="fill-row"
  />
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';

import { useConditionalRendering } from '@/core/composables';
import { useConditionalHide } from '@/core/composables/useConditionalHide';
import { useSchemaCols } from '@/core/composables/useSchemaCols';
import { EngineField } from '@/types/engine/EngineField';

const props = defineProps<{
  schema: EngineField;
  model: object;
}>();

const { shouldRender, shouldRenderField } = useConditionalRendering();
const { shouldHide, shouldHideField } = useConditionalHide();
const { cols, isOffsetExist, offset, fillRow } = useSchemaCols(props.schema);

const shouldShow = computed(() => {
  return !shouldHide.value && shouldRender.value;
});

const shouldDisableRulesWhenFieldIsHidden = computed(() => {
  return (!shouldShow.value && props.schema.layout.disableValidationWhenHidden) || false;
});

const layoutCssClass = computed(() => {
  let cssString = '';
  if (isOffsetExist) {
    cssString += `offset-${offset.value}`;
  }
  return cssString;
});

onMounted(async () => {
  await shouldRenderField(props.schema, props.model);
  await shouldHideField(props.schema, props.model);
});
</script>

<style lang="css" scoped>
.fill-row {
  flex-basis: 100%;
  height: 0;
}
</style>
