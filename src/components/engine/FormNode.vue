<template>
  <v-col
    :class='layoutCssClass'
    v-if='shouldRender'
    :cols='cols'
    v-show='hideField'
  >
    <component
      :is='`node-${schema.layout.component}`'
      :schema='schema'
      :model='model'
    />
  </v-col>
</template>

<script setup lang='ts'>
import { EngineField } from '../../vocabulary/engine';
import { useConditionalRendering } from '../../core/composables/useConditionalRendering';
import { useSchemaCols } from '../../core/composables/useSchemaCols';
import { computed } from 'vue';

const props = defineProps<{
  schema: EngineField;
  model: object;
}>();

const { shouldRender } = useConditionalRendering(props.schema);
const { cols, completionOfRow, isOffsetExist, offset, fillRow, hideField } = useSchemaCols(props.schema);

const layoutCssClass = computed(() => {
  let cssString = '';

  if (isOffsetExist) {
    cssString += `offset-${offset}`;
  }
  if (fillRow.value) {
    cssString += ' mr-auto';
  }
  return cssString;
});


</script>

<style scoped lang='css'></style>

<i18n lang='json'>
{
  "en": {},
  "pl": {}
}
</i18n>
