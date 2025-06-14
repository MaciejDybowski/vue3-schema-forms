<template>
  <v-row>
    <v-col cols="12">
      <draggable
        v-model="nodes"
        group="sections"
        handle=".draggable-icon"
        item-key="id"
        v-bind="dragOptions"
        @change="changePosition"
        @end="drag = false"
        @start="drag = true"
      >
        <template #item="{ element, index }">
          <duplicated-section-item :show-divider="isShowDivider && index <= nodes.length - 2">
            <template #box="{ isHovering }">
              <draggable-icon
                v-if="isEditable && showSectionElements"
                :show="isHovering ? isHovering : false"
              />
              <form-root
                :model="localModel[index]"
                :options="computedOptions"
                :schema="element as Schema"
                @update:model="updateModel($event, index)"
              />
              <draggable-context-menu
                v-if="isEditable && showSectionElements"
                :show="isHovering ? isHovering : false"
                @handle-action="handleDraggableContextAction($event, index)"
              />
            </template>
          </duplicated-section-item>
        </template>
      </draggable>
    </v-col>
    <v-col>
      <v-btn
        v-if="isEditable && showSectionElements"
        :id="getAddBtnMode === 'feature' ? 'addBtnRef' : 'addBtn'"
        color="primary"
        prepend-icon="mdi-plus"
        v-bind="schema.options.buttonProps"
        @click="runDuplicatedSectionButtonLogic(false)"
      >
        {{ getAddBtnText }}
      </v-btn>

      <v-dialog
        activator="#addBtnRef"
        max-width="900"
      >
        <template v-slot:default="{ isActive }">
          <v-card title="Title">
            <v-card-text>
              <component
                :is="batchAddComponent['batch-add-dialog-body']"
                menu-feature-id="waluty"
                view-id="20519-tabela"
                @selected-items="selectedItems"
              />
            </v-card-text>
            <template v-slot:actions>
              <v-btn
                class="ml-auto"
                color="primary"
                v-bind="schema.options.buttonProps"
                variant="elevated"
                @click="closeAndAddBatch(isActive)"
              >
                {{ t('closeAndAdd') }}
              </v-btn>
            </template>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { useEventBus } from '@vueuse/core';
import { cloneDeep, isArray } from 'lodash';
import get from 'lodash/get';
import set from 'lodash/set';
import { useI18n } from 'vue-i18n';
import draggable from 'vuedraggable';

import { Ref, computed, onMounted, ref } from 'vue';

import { useFormModel, useProps } from '@/core/composables';
import { duplicatedSectionBatchAddComponent } from '@/main';
import { VueDragable } from '@/types/VueDragable';
import { NodeUpdateEvent } from '@/types/engine/NodeUpdateEvent';
import { EngineDuplicatedSection } from '@/types/engine/controls';
import { Schema } from '@/types/schema/Schema';
import { SchemaField } from '@/types/schema/SchemaField';
import { DuplicatedSectionOptions } from '@/types/shared/DuplicatedSectionOptions';

import FormRoot from '../../engine/FormRoot.vue';
import DraggableContextMenu from './DraggableContextMenu.vue';
import DraggableIcon from './DraggableIcon.vue';
import DuplicatedSectionItem from './DuplicatedSectionItem.vue';

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const props = defineProps<{
  schema: EngineDuplicatedSection;
  model: object;
}>();

const actionHandlerEventBus = useEventBus<string>('form-action');
const nodes = ref([] as Array<Schema>);
const localModel = ref([] as Array<any>);
const drag = ref(false);
const { t } = useI18n();
const dragOptions = ref({
  animation: 200,
  disabled: false,
  ghostClass: 'ghost',
});
const { bindProps, fieldProps } = useProps();

const batchAddComponent = duplicatedSectionBatchAddComponent;
const batchItems = ref([]);

function selectedItems(selectedItems: []) {
  batchItems.value = selectedItems;
}

function closeAndAddBatch(isActive: Ref<boolean>) {
  isActive.value = false;
  batchItems.value.forEach((item) => {
    localModel.value.push(item);
    nodes.value.push(getClearNode.value);
  });
}

const duplicatedSectionOptions = ref(props.schema.layout?.options as DuplicatedSectionOptions);

const { getValue, setValue } = useFormModel();

const vueSchemaFormEventBus = useEventBus<string>('form-model');
vueSchemaFormEventBus.on(async (event, payload) => {
  if (
    payload == 'action-callback' ||
    payload == 'table-aggregates' /* &&
    JSON.stringify(localModel.value) !== JSON.stringify(get(props.model, props.schema.key, []))*/
  ) {
    init();
  }
});

let isEditable: Ref<boolean> = ref(
  'editable' in props.schema ? (props.schema.editable as boolean) : true,
);
const showSectionElements = computed(() => {
  if (isEditable.value) {
    return 'showElements' in props.schema ? (props.schema.showElements as boolean) : true;
  } else {
    return false;
  }
});

const ordinalNumberInModel: boolean =
  duplicatedSectionOptions.value !== undefined &&
  'ordinalNumberInModel' in duplicatedSectionOptions.value
    ? duplicatedSectionOptions.value.ordinalNumberInModel
    : false;

const showFirstInitRow: boolean =
  duplicatedSectionOptions.value && 'showFirstInitRow' in duplicatedSectionOptions.value
    ? (duplicatedSectionOptions.value.showFirstInitRow as boolean)
    : true;

const computedOptions = computed(() => {
  const options = JSON.parse(JSON.stringify(props.schema.options));

  if (!isEditable.value) {
    if (!('fieldProps' in options)) {
      options.fieldProps = {};
    }
    options.fieldProps['readonly'] = true;
  }
  return options;
});

function updateModel(event: NodeUpdateEvent, indexOfArray: number) {
  set(localModel.value[indexOfArray], event.key, event.value);
  setValue(localModel.value, props.schema, indexOfArray);
}

function handleDraggableContextAction(actionId: 'delete' | 'addBelow' | string, index: number) {
  switch (actionId) {
    case 'addBelow':
      nodes.value.splice(index + 1, 0, getClearNode.value);
      localModel.value.splice(index + 1, 0, getClearModel.value);
      setValue(localModel.value, props.schema, index);
      return;
    case 'delete':
      nodes.value = nodes.value
        .filter((item, i) => i !== index)
        .map((item, index) => {
          wrapPropertiesWithIndexAndPath(item.properties, index);
          return item;
        });

      localModel.value = cloneDeep(localModel.value)
        .filter((item, i) => i !== index)
        .map((item, index) => {
          if (ordinalNumberInModel) {
            item['ordinalNumber'] = index + 1;
          }
          return item;
        });
      setValue(localModel.value, props.schema, index);
      return;
    case 'copyBelow':
      nodes.value.splice(index + 1, 0, getClearNode.value);
      const copiedModel = ref(cloneDeep(localModel.value[index]));
      if (ordinalNumberInModel) {
        copiedModel.value['ordinalNumber'] = ++copiedModel.value['ordinalNumber'];
        localModel.value.splice(index + 1, 0, copiedModel.value);
        for (let i = index + 2; i < localModel.value.length; i++) {
          localModel.value[i]['ordinalNumber'] = localModel.value[i]['ordinalNumber'] + 1;
        }
      } else {
        localModel.value.splice(index + 1, 0, copiedModel.value);
      }

      setValue(localModel.value, props.schema, index);
      return;
    default:
      console.error('Unknown action');
  }
}

const getClearNode = computed((): Schema => {
  return {
    id: generateUUID(),
    type: 'object',
    properties: wrapPropertiesWithIndexAndPath(
      JSON.parse(JSON.stringify(props.schema.layout.schema?.properties)),
      nodes.value.length,
    ),
    required: props.schema.layout.schema?.required,
  } as Schema;
});

const getClearModel = computed(() => {
  const newLocalModel = {} as Record<string, any>;
  if (ordinalNumberInModel) {
    newLocalModel['ordinalNumber'] = nodes.value.length;
  }
  return newLocalModel;
});

function runDuplicatedSectionButtonLogic(init = false): void {
  if (getAddBtnMode.value == 'action' && duplicatedSectionOptions.value.action) {
    let payloadObject = {
      code: duplicatedSectionOptions.value.action.code,
      body: null,
      params: null,
    };

    actionHandlerEventBus.emit('form-action', payloadObject);
  }
  if (getAddBtnMode.value == 'add') {
    if (init && !showFirstInitRow && localModel.value.length == 0) return;

    nodes.value.push(getClearNode.value);
    localModel.value.push({ ...getClearModel.value });
  }
  if (getAddBtnMode.value == 'copy') {
    nodes.value.push(getClearNode.value);
    addNewModelToDuplicatedSectionWhenCopyBtnMode(init);
  }

  if (ordinalNumberInModel) {
    setValue(localModel.value, props.schema, nodes.value.length - 1);
  }
}

function addNewModelToDuplicatedSectionWhenCopyBtnMode(init = false) {
  if (init) {
    localModel.value.push({ ...getClearModel.value });
  } else {
    const copiedLastRowModel = { ...localModel.value[localModel.value.length - 1] };
    if (ordinalNumberInModel) {
      copiedLastRowModel['ordinalNumber'] = ++copiedLastRowModel['ordinalNumber'];
    }
    localModel.value.push(copiedLastRowModel);
  }
}

function changePosition(drag: VueDragable<Schema>) {
  if (drag.moved) {
    let temp = localModel.value[drag.moved.newIndex];
    localModel.value[drag.moved.newIndex] = localModel.value[drag.moved.oldIndex];
    localModel.value[drag.moved.oldIndex] = temp;

    if (ordinalNumberInModel) {
      const tempOrdinal = localModel.value[drag.moved.newIndex]['ordinalNumber'];
      localModel.value[drag.moved.newIndex]['ordinalNumber'] =
        localModel.value[drag.moved.oldIndex]['ordinalNumber'];
      localModel.value[drag.moved.oldIndex]['ordinalNumber'] = tempOrdinal;
    }

    nodes.value = nodes.value.map((item, index) => {
      wrapPropertiesWithIndexAndPath(item.properties, index);
      return item;
    });
  } else {
    console.warn('Error with draggable');
  }
}

const getAddBtnText = computed(() => {
  const isRef =
    duplicatedSectionOptions.value &&
    typeof duplicatedSectionOptions.value.addBtnText === 'object' &&
    '$ref' in duplicatedSectionOptions.value.addBtnText;
  if (isRef) {
    //@ts-ignore
    return '#' + duplicatedSectionOptions.value.addBtnText.$ref.split('/').pop();
  }

  if (duplicatedSectionOptions.value?.addBtnText) {
    return duplicatedSectionOptions.value.addBtnText;
  } else {
    return t('addAction');
  }
});

const getAddBtnMode = computed(() => {
  if (duplicatedSectionOptions.value?.addBtnMode) {
    return duplicatedSectionOptions.value.addBtnMode;
  } else {
    return 'add';
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
  localModel.value = [];
  let isDefaultExist = false;
  let sections: Record<any, any>[] = get(props.model, props.schema.key, []) || []; //lodash error with default value = array
  if (sections.length === 0 && isArray(props.schema.defaultValue)) {
    sections = props.schema.defaultValue as Array<any>;
    isDefaultExist = true;
  }

  if (sections.length > 0) {
    sections.forEach((item: any, index: number) => {
      nodes.value.push({
        id: generateUUID(),
        type: 'object',
        properties: isDefaultExist
          ? mapPropertiesIfDefault(
              props.schema.layout.schema?.properties as Record<any, SchemaField>,
              sections[index],
            )
          : wrapPropertiesWithIndexAndPath(
              JSON.parse(JSON.stringify(props.schema.layout.schema?.properties)),
              index,
            ),
        required: props.schema.layout.schema?.required,
      } as Schema);

      if (ordinalNumberInModel) {
        sections[index]['ordinalNumber'] = index + 1;
      }
      localModel.value.push(isDefaultExist ? {} : sections[index]);
    });
  } else if (getAddBtnMode.value !== 'feature') {
    runDuplicatedSectionButtonLogic(true);
  }
}

/*
  na potrzeby draggable/ustawiania modeli/rozwiązywania zaleznosci
  pole dostaje swoją scieżkę i index aby móc np się odwołać do pola w takiej postaci {products[].dataId}, sam index pola
  jest uzupełniany dynamicznie. Sprawdzałem na zagnieżdzonych tablicach typu: {products[].items[].item} w połączeniu z logiką
  w useResolveVariable daje niezłe możliwości
*/
function wrapPropertiesWithIndexAndPath(
  properties: Record<string, SchemaField>,
  index: number,
  rootSchema: any = null,
): Record<string, SchemaField> {
  for (let [key, value] of Object.entries(properties)) {
    if ('properties' in value) {
      wrapPropertiesWithIndexAndPath(value.properties as any, index);
    } else if (value.layout?.schema) {
      value['path'] = props.schema.key;
      value['index'] = index;
      wrapPropertiesWithIndexAndPath(value.layout.schema.properties as any, index, value);
    } else {
      if (props.schema['path'] !== undefined && props.schema['index'] != undefined) {
        if (props.schema.layout.schema) {
          // jesteśmy w sekcji powielanej i napotykamy sekcje powielana
          value['path'] =
            props.schema['path'] + '[' + props.schema['index'] + '].' + props.schema.key + '[]';
        } else {
          value['path'] =
            props.schema['path'] + '[' + props.schema['index'] + '].' + props.schema.key;
        }
      } else {
        value['path'] = props.schema.key + '[]';
      }
      value['index'] = index;
    }
  }
  return properties;
}

function mapPropertiesIfDefault(
  fieldDefinition: Record<string, SchemaField>,
  defaultValue: Record<string, any>,
) {
  let itemsWithDefault: Record<string, any> = {};
  for (let [key, value] of Object.entries(fieldDefinition)) {
    itemsWithDefault[key] = Object.assign({ ...value, defaultValue: defaultValue[key] });
  }
  return itemsWithDefault;
}

onMounted(async () => {
  init();
  await bindProps(props.schema);
  if (isEditable.value) {
    isEditable.value = !fieldProps.value.readonly;
  }
});
</script>

<style lang="scss" scoped>
.ghost {
  opacity: 0.5;
  background: #d3d3d3;
}
</style>

<i18n lang="json">
{
  "en": {
    "addAction": "Add",
    "close": "Close",
    "closeAndAdd": "Close and add"
  },
  "pl": {
    "addAction": "Dodaj",
    "close": "Zamknij",
    "closeAndAdd": "Dodaj i zamknij"
  }
}
</i18n>
