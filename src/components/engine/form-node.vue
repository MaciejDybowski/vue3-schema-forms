<template>
  <v-col
    v-if='schema.layout.offset !== undefined'
    :cols='schema.layout.offset'
  ></v-col>
  <v-col
    :cols='getCols'
    v-if='render'
  >
    <component
      :is='`node-${schema.layout.component}`'
      :schema='schema'
      :model='model'
    />
  </v-col>
  <v-col
    v-if='schema.layout.fillRow'
    :cols='getFillRowCols'
  ></v-col>
</template>

<script setup lang='ts'>
import { computed, onMounted, ref } from 'vue';
import { useDisplay } from 'vuetify';

import { EngineField } from '@/vocabulary/engine';
import { Layout } from '@/vocabulary/schema/elements';
import { useConditionalRendering } from '@/core/composables/useConditionalRendering';
import { getColsByDisplay } from '@/core/engine/utils';

const props = defineProps<{
  schema: EngineField,
  model: object,
}>();

let render = ref(false);
const display = useDisplay();

function checkRenderCondition() {
  if (props.schema.layout.if) {
    useConditionalRendering(props.schema.layout.if, props.model, render);
  } else {
    render.value = true;
  }
}

const getFillRowCols = computed((): number => {
  return props.schema.layout.offset ? getCols.value - props.schema.layout.offset : 12 - getCols.value;
});

const getCols = computed((): number => {
  const layout: Layout = props.schema.layout;
  if (layout.cols === undefined) {
    return 12;
  }
  if (typeof layout.cols === 'object') {
    return getColsByDisplay(display.name.value, layout.cols);
  } else {
    return props.schema.layout.cols as number;
  }
});

onMounted(() => {
  checkRenderCondition();
});
</script>

<style scoped lang='css'></style>

<i18n lang='json'>
{
  "en": {},
  "pl": {}
}
</i18n>
