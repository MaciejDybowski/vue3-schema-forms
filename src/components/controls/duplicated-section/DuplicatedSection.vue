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
                :form-id="schema.formId"
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
        color="primary"
        prepend-icon="mdi-plus"
        v-bind="schema.options.buttonProps"
        @click="runDuplicatedSectionButtonLogic(false)"
      >
        {{ getAddBtnText }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { cloneDeep, isArray } from "lodash";
import get from "lodash/get";
import set from "lodash/set";
import { v4 as uuidv4 } from "uuid";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import draggable from "vuedraggable";

import { useFormModel } from "@/core/composables";
import { VueDragable } from "@/types/VueDragable";
import { NodeUpdateEvent } from "@/types/engine/NodeUpdateEvent";
import { EngineDuplicatedSection } from "@/types/engine/controls";
import { Schema } from "@/types/schema/Schema";
import { SchemaField } from "@/types/schema/SchemaField";
import { DuplicatedSectionOptions } from "@/types/shared/DuplicatedSectionOptions";

import FormRoot from "../../engine/FormRoot.vue";
import DraggableContextMenu from "./DraggableContextMenu.vue";
import DraggableIcon from "./DraggableIcon.vue";
import DuplicatedSectionItem from "./DuplicatedSectionItem.vue";
import { addons } from "@storybook/manager-api";

const props = defineProps<{
  schema: EngineDuplicatedSection;
  model: object;
}>();

const nodes = ref([] as Array<Schema>);
const localModel = ref([] as Array<any>);
const drag = ref(false);
const { t } = useI18n();
const dragOptions = ref({
  animation: 200,
  disabled: false,
  ghostClass: "ghost",
});

const duplicatedSectionOptions = ref(props.schema.layout?.options as DuplicatedSectionOptions);

const { getValue, setValue } = useFormModel();

const isEditable: boolean = "editable" in props.schema ? (props.schema.editable as boolean) : true;
const showSectionElements = computed(() => {
  if (isEditable) {
    return "showElements" in props.schema ? (props.schema.showElements as boolean) : true;
  } else {
    return false;
  }
});

const ordinalNumberInModel: boolean =
  duplicatedSectionOptions.value !== undefined && "ordinalNumberInModel" in duplicatedSectionOptions.value
    ? duplicatedSectionOptions.value.ordinalNumberInModel
    : false;

const computedOptions = computed(() => {
  const options = JSON.parse(JSON.stringify(props.schema.options));

  if (!isEditable) {
    if (!("fieldProps" in options)) {
      options.fieldProps = {};
    }
    options.fieldProps["readonly"] = true;
  }
  return options;
});

function updateModel(event: NodeUpdateEvent, indexOfArray: number) {
  set(localModel.value[indexOfArray], event.key, event.value);
  setValue(localModel.value, props.schema, indexOfArray);
}

function handleDraggableContextAction(actionId: "delete" | "addBelow" | string, index: number) {
  switch (actionId) {
    case "addBelow":
      nodes.value.splice(index + 1, 0, getClearNode.value);
      localModel.value.splice(index + 1, 0, getClearModel.value);
      setValue(localModel.value, props.schema, index);
      return;
    case "delete":
      nodes.value = nodes.value
        .filter((item, i) => i !== index)
        .map((item, index) => {
          wrapPropertiesWithIndexAndPath(item.properties, index);
          return item;
        });

      localModel.value = localModel.value
        .filter((item, i) => i !== index)
        .map((item, index) => {
          if (ordinalNumberInModel) {
            item["ordinalNumber"] = index + 1;
          }
          return item;
        });
      setValue(localModel.value, props.schema, index);
      return;
    case "copyBelow":
      nodes.value.splice(index + 1, 0, getClearNode.value);
      const copiedModel = ref(cloneDeep(localModel.value[index]));

      if (ordinalNumberInModel) {
        copiedModel.value["ordinalNumber"] = ++copiedModel.value["ordinalNumber"];
        localModel.value.splice(index + 1, 0, copiedModel.value);
        for (let i = index + 2; i < localModel.value.length; i++) {
          localModel.value[i]["ordinalNumber"] = localModel.value[i]["ordinalNumber"] + 1;
        }
      }

      setValue(localModel.value, props.schema, index);
      return;
    default:
      console.error("Unknown action");
  }
}

const getClearNode = computed((): Schema => {
  return {
    id: uuidv4(),
    type: "object",
    properties: wrapPropertiesWithIndexAndPath(
      JSON.parse(JSON.stringify(props.schema.layout.schema?.properties)),
      nodes.value.length,
    ),
    required: props.schema.layout.schema?.required,
  } as Schema;
});

const getClearModel = computed(() => {
  const newLocalModel = {};
  if (ordinalNumberInModel) {
    newLocalModel["ordinalNumber"] = nodes.value.length;
  }
  return newLocalModel;
});

function runDuplicatedSectionButtonLogic(init = false): void {
  if (getAddBtnMode.value == "add") {
    nodes.value.push(getClearNode.value);
    localModel.value.push({ ...getClearModel.value });
  }
  if (getAddBtnMode.value == "copy") {
    nodes.value.push(getClearNode.value);
    addNewModelToDuplicatedSectionWhenCopyBtnMode(init)
  }

  if (ordinalNumberInModel) {
    setValue(localModel.value, props.schema, nodes.value.length - 1);
  }
}

function addNewModelToDuplicatedSectionWhenCopyBtnMode(init = false){
  if (init) {
    localModel.value.push({ ...getClearModel.value });
  } else {
    const copiedLastRowModel = { ...localModel.value[localModel.value.length - 1] };
    if (ordinalNumberInModel) {
      copiedLastRowModel["ordinalNumber"] = ++copiedLastRowModel["ordinalNumber"];
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
      const tempOrdinal = localModel.value[drag.moved.newIndex]["ordinalNumber"];
      localModel.value[drag.moved.newIndex]["ordinalNumber"] = localModel.value[drag.moved.oldIndex]["ordinalNumber"];
      localModel.value[drag.moved.oldIndex]["ordinalNumber"] = tempOrdinal;
    }

    nodes.value = nodes.value.map((item, index) => {
      wrapPropertiesWithIndexAndPath(item.properties, index);
      return item;
    });
  } else {
    console.warn("Error with draggable");
  }
}

const getAddBtnText = computed(() => {
  if (duplicatedSectionOptions.value?.addBtnText) {
    return duplicatedSectionOptions.value.addBtnText;
  } else {
    return t("addAction");
  }
});

const getAddBtnMode = computed(() => {
  if (duplicatedSectionOptions.value?.addBtnMode) {
    return duplicatedSectionOptions.value.addBtnMode;
  } else {
    return "add";
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
  let isDefaultExist = false;
  let sections: Object[] = get(props.model, props.schema.key, []) || []; //lodash error with default value = array
  if (sections.length === 0 && isArray(props.schema.default)) {
    sections = props.schema.default as Array<any>;
    isDefaultExist = true;
  }
  if (sections.length > 0) {
    sections.forEach((item: any, index: number) => {
      nodes.value.push({
        id: uuidv4(),
        type: "object",
        properties: isDefaultExist
          ? mapPropertiesIfDefault(props.schema.layout.schema?.properties as Record<any, SchemaField>, sections[index])
          : wrapPropertiesWithIndexAndPath(JSON.parse(JSON.stringify(props.schema.layout.schema?.properties)), index),
        required: props.schema.layout.schema?.required,
      } as Schema);
      localModel.value.push(isDefaultExist ? {} : sections[index]);
    });
  } else {
    runDuplicatedSectionButtonLogic(true);
  }
}

function wrapPropertiesWithIndexAndPath(properties: Record<string, SchemaField>, index: number): Record<string, SchemaField> {
  for (let [key, value] of Object.entries(properties)) {
    if ("properties" in value) {
      wrapPropertiesWithIndexAndPath(value.properties as any, index);
    } else {
      value["path"] = props.schema.key;
      value["index"] = index;
    }
  }

  return properties;
}

function mapPropertiesIfDefault(fieldDefinition: Record<string, SchemaField>, defaultValue: object) {
  let itemsWithDefault = {};
  for (let [key, value] of Object.entries(fieldDefinition)) {
    itemsWithDefault[key] = Object.assign({ ...value, default: defaultValue[key] });
  }
  return itemsWithDefault;
}

onMounted(() => {
  init();
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
    "addAction": "Add"
  },
  "pl": {
    "addAction": "Dodaj"
  }
}
</i18n>
