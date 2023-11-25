<template>
  <draggable
    v-model='nodes'
    group='sections'
    @start='drag = true'
    @end='drag = false'
    @change='changePosition'
    handle='.draggable-icon'
    item-key='id'
    v-bind='dragOptions'
  >
    <template #item='{ element, index }'>
      <hover-wrapper :show-divider='isShowDivider && index <= nodes.length - 2'>
        <template #box='{ isHovering }'>
          <draggable-icon :show='isHovering' />
          <form-root
            :model='localModel[index]'
            @update:model='updateModel($event, index)'
            :options='schema.options'
            :schema='element as Schema'
            :root-model='model'
          />
          <draggable-context-menu
            :show='isHovering'
            @handle-action='handleDraggableContextAction($event, index)'
          />
        </template>
      </hover-wrapper>
    </template>
  </draggable>
  <v-btn
    prepend-icon='mdi-plus'
    color='primary'
    v-bind='schema.options.buttonProps'
    @click='addNode'
  >
    {{ getAddBtnText }}
  </v-btn>
</template>

<script setup lang='ts'>
import { computed, onMounted, ref } from 'vue';
import get from 'lodash/get';
import draggable from 'vuedraggable';

import { NodeUpdateEvent } from '../../../vocabulary/engine';
import { Schema } from '../../../vocabulary/schema';
import { produceUpdateEvent } from '../../../core/engine/utils';
import { EngineDuplicatedSection } from '../../../vocabulary/engine/controls';
import { v4 as uuidv4 } from 'uuid';
import { VueDragable } from '@/vocabulary/VueDragable';
import FormRoot from '../../engine/FormRoot.vue';
import DraggableIcon from './DraggableIcon.vue';
import HoverWrapper from './HoverWrapper.vue';
import DraggableContextMenu from './DraggableContextMenu.vue';
import { useI18n } from 'vue-i18n';
import { DuplicatedSectionOptions } from '@/vocabulary/schema/elements';
import { isArray } from 'lodash';

const props = defineProps<{
  schema: EngineDuplicatedSection
  model: object
}>();

const nodes = ref([] as Array<Schema>);
const localModel = ref([] as Array<any>);
const drag = ref(false);
const { t } = useI18n();
const dragOptions = ref({
  animation: 200,
  disabled: false,
  ghostClass: 'ghost',
});

const duplicatedSectionOptions = ref(
  props.schema.layout?.options as DuplicatedSectionOptions,
);

function updateModel(event: NodeUpdateEvent, indexOfArray: number) {
  const obj = localModel.value[indexOfArray]
  localModel.value[indexOfArray] = Object.assign({[event.key] : event.value}, obj)
  produceUpdateEvent(localModel, props.schema);
}

function handleDraggableContextAction(
  actionId: 'delete' | 'addBelow' | string,
  index: number,
) {
  switch (actionId) {
    case 'addBelow':
      nodes.value.splice(index + 1, 0, {
        id: uuidv4(),
        type: 'object',
        properties: props.schema.layout.items,
      } as Schema);
      localModel.value.splice(index + 1, 0, {});
      return;
    case 'delete':
      nodes.value = nodes.value.filter((item, i) => i !== index);
      localModel.value = localModel.value.filter((item, i) => i !== index);
      return;
    default:
      console.error('Unknown action di');
  }
}

function addNode(): void {
  nodes.value.push({
    id: uuidv4(),
    type: 'object',
    properties: props.schema.layout.items,
  } as Schema);
  localModel.value.push({});
}

function changePosition(drag: VueDragable<Schema>) {
  if (drag.moved) {
    let temp = localModel.value[drag.moved.newIndex];
    localModel.value[drag.moved.newIndex] =
      localModel.value[drag.moved.oldIndex];
    localModel.value[drag.moved.oldIndex] = temp;
  } else {
    console.warn('Error with draggable');
  }
}

const getAddBtnText = computed(() => {
  if (duplicatedSectionOptions.value?.addBtnText) {
    return duplicatedSectionOptions.value.addBtnText;
  } else {
    return t('addAction');
  }
});

const isShowDivider = computed(() => {
  if (duplicatedSectionOptions.value?.showDivider) {
    return duplicatedSectionOptions.value.showDivider;
  } else {
    return false;
  }
});

function init(): void {
  nodes.value = [];
  let arr: Array<any> = get(props.model, props.schema.key, []);
  if (arr.length === 0 && isArray(props.schema.default)) {
    console.log(props.schema.default);
    arr = props.schema.default as Array<any>;
  }
  if (arr.length > 0) {
    arr.forEach((item: any) => {
      nodes.value.push({
        id: uuidv4(),
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

<style scoped lang='scss'>
.ghost {
  opacity: 0.5;
  background: #d3d3d3;
}
</style>

<i18n lang='json'>
{
  "en": {
    "addAction": "Add"
  },
  "pl": {
    "addAction": "Dodaj"
  }
}
</i18n>
