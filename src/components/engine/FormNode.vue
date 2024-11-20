<template>
  <v-col
    :class='layoutCssClass'
    v-if='shouldRender'
    :cols='cols'
    v-show='hideField && shouldRender'
    :style='mr'
  >
    <component
      :is='`node-${schema.layout.component}`'
      :schema='schema'
      :model='model'
    />
  </v-col>
</template>

<script setup lang='ts'>
import { computed, onMounted } from 'vue';

import { useCustomIfExpression } from '@/core/composables/useCustomIfExpression';
import { EngineField } from '@/types/engine/EngineField';

import { useConditionalRendering } from '@/core/composables';
import { useSchemaCols } from '@/core/composables/useSchemaCols';

const props = defineProps<{
  schema: EngineField;
  model: object;
}>();

const {customIfExpressionResolve} = useCustomIfExpression();

customIfExpressionResolve('component', props.schema.layout, props.schema);

const { shouldRender, shouldRenderField } = useConditionalRendering();
const { cols, completionOfRow, isOffsetExist, offset, fillRow, hideField } = useSchemaCols(props.schema);

const layoutCssClass = computed(() => {
  let cssString = '';

  if (isOffsetExist) {
    cssString += `offset-${offset}`;
  }

  return cssString;
});

const mr = computed(() => {
  if (fillRow.value) {
    return `margin-right: ${((12 - (offset + cols.value)) / 12) * 100}%!important`;
  }
});

onMounted(async () => {
  await shouldRenderField(props.schema);
});

</script>

<style scoped lang='css'></style>

<i18n lang='json'>
{
  "en": {},
  "pl": {}
}
</i18n>
