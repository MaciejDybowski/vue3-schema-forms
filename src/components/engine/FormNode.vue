<template>
  <v-col
    :class='layoutCssClass'
    v-if='shouldRender'
    :cols='cols'
    v-show='hideField'
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
import { EngineField } from '@/types/engine';
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

  return cssString;
});

const mr = computed(() => {
  if (fillRow.value) {
    return `margin-right: ${((12-(offset+cols.value))/12)*100}%!important`
  }
})


</script>

<style scoped lang='css'></style>

<i18n lang='json'>
{
  "en": {},
  "pl": {}
}
</i18n>
