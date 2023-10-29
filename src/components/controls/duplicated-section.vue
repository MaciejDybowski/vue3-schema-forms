<template>
  <template v-for='(node, i) in nodes'>
    <form-root
      :model='localModel[i]'
      @update:model='updateModel($event, i)'
      :options='schema.options'
      :schema='node as Schema'
    />
  </template>
</template>

<script setup lang='ts'>
import FormRoot from '../engine/form-root.vue';
import { onMounted, ref } from 'vue';
import get from 'lodash/get';

import { NodeUpdateEvent } from '@/vocabulary/engine';
import { Schema } from '@/vocabulary/schema';
import { produceUpdateEvent } from '@/core/engine/utils';
import { EngineDuplicatedSection } from '@/vocabulary/engine/controls';

const props = defineProps<{
  schema: EngineDuplicatedSection
  model: object
}>();

const nodes = ref([] as Array<Schema>);
const localModel = ref([] as Array<any>);

function updateModel(event: NodeUpdateEvent, indexOfArray: number) {
  localModel.value[indexOfArray][event.key] = event.value;
  produceUpdateEvent(localModel, props.schema);
}

function init(): void {
  nodes.value = [];
  const arr: Array<any> = get(props.model, props.schema.key, []);
  if (arr.length > 0) {
    arr.forEach((item: any) => {
      nodes.value.push({
        type: 'object',
        properties: props.schema.layout.items,
      } as Schema);
      localModel.value.push(item);
    });
  } else {
    nodes.value.push({
      type: 'object',
      properties: props.schema.layout.items,
    } as Schema);
    localModel.value.push({});
  }
}

onMounted(() => {
  init();
});
</script>

<style scoped lang='scss'></style>
