<template>
  <v-col
    v-if='isOffsetExist && shouldRender'
    :cols='offset'
  ></v-col>

  <v-col
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
  <v-col
    v-if='fillRow && shouldRender'
    :cols='completionOfRow'
  ></v-col>
</template>

<script setup lang='ts'>
import { EngineField } from '../../vocabulary/engine';
import { useConditionalRendering } from '../../core/composables/useConditionalRendering';
import { useSchemaCols } from '../../core/composables/useSchemaCols';

const props = defineProps<{
  schema: EngineField;
  model: object;
}>();

const { shouldRender } = useConditionalRendering(props.schema);
const { cols, completionOfRow, isOffsetExist, offset, fillRow, hideField } = useSchemaCols(props.schema);
console.debug(props.schema.key, cols.value, completionOfRow.value, fillRow.value, shouldRender.value);
</script>

<style scoped lang='css'></style>

<i18n lang='json'>
{
  "en": {},
  "pl": {}
}
</i18n>
