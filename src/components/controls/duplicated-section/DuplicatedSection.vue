<template>
  <draggable
    v-model="nodes"
    group="sections"
    @start="drag = true"
    @end="drag = false"
    @change="changePosition"
    handle=".draggable-icon"
    item-key="id"
    v-bind="dragOptions"
  >
    <template #item="{ element, index }">
      <duplicated-section-item :show-divider="isShowDivider && index <= nodes.length - 2">
        <template #box="{ isHovering }">
          <draggable-icon :show="isHovering" />
          <form-root
            class="mb-3"
            :model="localModel[index]"
            @update:model="updateModel($event, index)"
            :options="schema.options"
            :schema="element as Schema"
            :form-id="schema.formId"
          />
          <draggable-context-menu
            :show="isHovering"
            @handle-action="handleDraggableContextAction($event, index)"
          />
        </template>
      </duplicated-section-item>
    </template>
  </draggable>
  <v-btn
    prepend-icon="mdi-plus"
    color="primary"
    v-bind="schema.options.buttonProps"
    @click="addNode"
  >
    {{ getAddBtnText }}
  </v-btn>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import get from "lodash/get";
import draggable from "vuedraggable";

import { NodeUpdateEvent } from "../../../vocabulary/engine";
import { Schema } from "../../../vocabulary/schema";

import { EngineDuplicatedSection } from "../../../vocabulary/engine/controls";
import { v4 as uuidv4 } from "uuid";
import { VueDragable } from "@/vocabulary/VueDragable";
import FormRoot from "../../engine/FormRoot.vue";
import DraggableIcon from "./DraggableIcon.vue";
import DraggableContextMenu from "./DraggableContextMenu.vue";
import { useI18n } from "vue-i18n";
import { DuplicatedSectionOptions, SchemaField } from "@/vocabulary/schema/elements";
import { isArray } from "lodash";
import DuplicatedSectionItem from "./DuplicatedSectionItem.vue";
import set from "lodash/set";
import { useFormModel } from '../../../core/composables';

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

const {getValue, setValue} = useFormModel()
function updateModel(event: NodeUpdateEvent, indexOfArray: number) {
  set(localModel.value[indexOfArray], event.key, event.value);
  setValue(localModel, props.schema);
}

function handleDraggableContextAction(actionId: "delete" | "addBelow" | string, index: number) {
  switch (actionId) {
    case "addBelow":
      nodes.value.splice(index + 1, 0, getClearNode.value);
      localModel.value.splice(index + 1, 0, {});
      return;
    case "delete":
      nodes.value = nodes.value.filter((item, i) => i !== index);
      localModel.value = localModel.value.filter((item, i) => i !== index);
      return;
    default:
      console.error("Unknown action");
  }
}

const getClearNode = computed((): Schema => {
  return {
    id: uuidv4(),
    type: "object",
    properties: props.schema.layout.schema?.properties,
    required: props.schema.layout.schema?.required,
  } as Schema;
});

function addNode(): void {
  nodes.value.push(getClearNode.value);
  localModel.value.push({});
}

function changePosition(drag: VueDragable<Schema>) {
  if (drag.moved) {
    let temp = localModel.value[drag.moved.newIndex];
    localModel.value[drag.moved.newIndex] = localModel.value[drag.moved.oldIndex];
    localModel.value[drag.moved.oldIndex] = temp;
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
  let sections: Object[] = get(props.model, props.schema.key, []);
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
          : props.schema.layout.schema?.properties,
        required: props.schema.layout.schema?.required,
      } as Schema);
      localModel.value.push(isDefaultExist ? {} : sections[index]);
    });
  } else {
    addNode();
  }
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

<style scoped lang="scss">
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
