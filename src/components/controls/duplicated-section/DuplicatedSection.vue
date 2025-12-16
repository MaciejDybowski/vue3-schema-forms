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
                {{ t('duplicatedSection.closeAndAdd') }}
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
import { cloneDeep, isArray, isEqual } from 'lodash';
import get from 'lodash/get';
import set from 'lodash/set';
import draggable from 'vuedraggable';

import { Ref, computed, onMounted, ref } from 'vue';

import { useFormModel, useLocale, useProps } from '@/core/composables';
import { useGeneratorCache } from '@/core/composables/useGeneratorCache';
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

const cache = useGeneratorCache();

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
const { t } = useLocale();
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
  const modelFromProps = JSON.stringify(
    get(props.model, props.schema.key, showFirstInitRow ? [{}] : []),
  );
  const actualModel = JSON.stringify(localModel.value);

  if (
    (payload == 'action-callback' ||
      // -> tabela w sekcji powielanej z agregatami wywoływała ten event i za każdym razem się przeładowywałą od nowa
      // odkomentowałem AND i porównanie modelu przychodzącego po ew. modyfikacji
      payload == 'table-aggregates') &&
    modelFromProps !== actualModel
  ) {
    init();
  }

  await resolveDependenciesBetweenTwoDuplicatedSections(payload);
});

async function resolveDependenciesBetweenTwoDuplicatedSections(payload: NodeUpdateEvent) {
  if (props.schema.sourcePath !== undefined && props.schema.key !== payload.key) {
    await new Promise((r) => setTimeout(r, 100));
    let source = props.schema.sourcePath;
    let sections: Record<any, any>[] = cloneDeep(get(props.model, source, []));

    // Obsługa dodania lub usunięcia sekcji
    if (localModel.value.length !== sections.length) {
      const missingCount = sections.length - localModel.value.length;
      if (missingCount > 0) {
        const missingItems = sections.slice(-missingCount);
        localModel.value.push(...missingItems);

        // Dodaj odpowiednią liczbę czystych węzłów
        for (let i = 0; i < missingCount; i++) {
          nodes.value.push(getClearNode.value);
        }
      } else {
        localModel.value.splice(sections.length);
        nodes.value.splice(sections.length);
      }
      setValue(localModel.value, props.schema);
    }

    // update existed rows by updateTriggers array and keyToVariable:comparator syntax
    // updateTriggers: ["select:value"],
    if (
      payload?.index !== undefined &&
      Array.isArray(props.schema.updateTriggers) &&
      props.schema.updateTriggers.length > 0
    ) {
      const index = payload.index;
      const newItem = sections[index];
      const currentItem = localModel.value[index];

      const shouldUpdate = props.schema.updateTriggers.some((triggerPath: string) => {
        const pathToValue = triggerPath.split(':')[0];
        const comparator = triggerPath.split(':')[1];

        const oldVal = get(currentItem, pathToValue);
        const newVal = get(newItem, pathToValue);

        if (comparator) {
          const comp1 = get(oldVal, comparator);
          const comp2 = get(newVal, comparator);
          return !isEqual(comp1, comp2);
        }

        return !isEqual(oldVal, newVal);
      });

      if (shouldUpdate) {
        localModel.value[index] = cloneDeep(newItem);
        setValue(localModel.value, props.schema);
      }
    }
  }
}

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

const duplicatedSectionEventBus = useEventBus<string>('form-duplicated-section');

function updateModel(event: NodeUpdateEvent, indexOfArray: number) {
  informAboutUpdateSpecifiedFieldInDuplicatedSection(event, indexOfArray);

  set(localModel.value[indexOfArray], event.key, event.value);
  setValue(localModel.value, props.schema, indexOfArray);
}

/*
  W celu poinformowania elementów zagnieżdżonych w sekcjach powielanych, które mogą być uzależnione od innych pól w modelu formularza
  problem pojawił się gdy chcieliśmy uzależnić przeładowanie tabeli od pola powyżej + wrzucone wszystko w sekcje powielane
  dodałem osobną komunikację event busem dedykowanym tylko pod to aby nie dublować zdarzeń na form-model bo mogłoby to jakieś inne
  listener'y triggerować podwójnie. W TableView łapię tego event busa i sprawdzam czy po wypełnieniu zgadza się klucz z tym co jest w sekcji zdefiniowane
*/
function informAboutUpdateSpecifiedFieldInDuplicatedSection(
  event: NodeUpdateEvent,
  indexOfArray: number,
) {
  //console.log('Update poszczególnego pola', `${props.schema.key}[${indexOfArray}].${event.key}`);
  duplicatedSectionEventBus.emit('form-duplicated-section', {
    key: `${props.schema.key}[${indexOfArray}].${event.key}`,
  });
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
      let copiedModel = ref(cloneDeep(localModel.value[index]));
      copiedModel.value = processObjectWithCache(copiedModel.value, cache);

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
    let copiedLastRowModel = { ...localModel.value[localModel.value.length - 1] };

    copiedLastRowModel = processObjectWithCache(copiedLastRowModel, cache);
    if (ordinalNumberInModel) {
      copiedLastRowModel['ordinalNumber'] = ++copiedLastRowModel['ordinalNumber'];
    }
    localModel.value.push(copiedLastRowModel);
  }
}

function processObjectWithCache(obj: any, cache: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }
  if (typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => processObjectWithCache(item, cache));
  }

  const result: any = {};

  for (const [key, value] of Object.entries(obj)) {
    if (cache.has(key)) {
      result[key] = null;
    } else if (typeof value === 'object' && value !== null) {
      result[key] = processObjectWithCache(value, cache);
    } else {
      result[key] = value;
    }
  }

  return result;
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
    return t('duplicatedSection.addAction');
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

  // obsluga listy zaleznej od innej tablicy w modelu formularza np w celu wyswietlania innych danych
  let source = props.schema.sourcePath;

  let sections: Record<any, any>[] =
    cloneDeep(get(props.model, source ? source : props.schema.key, [])) || []; //lodash error with default value = array
  if (source) {
    setValue(sections, props.schema);
  }

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
function wrapPropertiesWithIndexAndPathOld(
  properties: Record<string, SchemaField>,
  index: number,
  rootSchema: any = null,
): Record<string, SchemaField> {
  for (let [key, value] of Object.entries(properties)) {
    if ('properties' in value) {
      wrapPropertiesWithIndexAndPath(value.properties as any, index);
    } else if (value.layout?.schema && value.layout.component !== 'fields-group') {
      // dla grupy nie dodajemy klucza jest przeźroczysta
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

function wrapPropertiesWithIndexAndPath(
  properties: Record<string, SchemaField>,
  index: number,
  rootSchema: any = null,
): Record<string, SchemaField> {
  for (let [key, value] of Object.entries(properties)) {
    const isNestedFieldExist = value.properties;
    const isDuplicatedSection =
      value.layout && value.layout.schema && value.layout.component == 'duplicated-section';
    const isFieldGroup =
      value.layout && value.layout.schema && value.layout.component == 'fields-group';

    if (isNestedFieldExist) {
      wrapPropertiesWithIndexAndPath(value.properties as any, index);
    }

    if (isDuplicatedSection || isFieldGroup) {
      if (isDuplicatedSection) {
        value['path'] = props.schema.key + '[]';
        value['index'] = index;
      }
      // @ts-ignore
      wrapPropertiesWithIndexAndPath(value.layout.schema.properties, index, value);
    }

    if (props.schema['path'] !== undefined && props.schema['index'] != undefined) {
      const rootPath = props.schema.path?.replace('[]', '');
      value['path'] = rootPath + '[' + props.schema['index'] + '].' + props.schema.key + '[]';
    } else {
      value['path'] = props.schema.key + '[]';
    }

    value['index'] = index;
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
