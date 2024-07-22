<template>
  <div class="editable-section d-flex">
    <v-btn
      class="editable"
      position="absolute"
      variant="outlined"
      size="20"
      @click="transformSchema"
    >
      <v-icon size="16"> mdi-pencil </v-icon>
    </v-btn>
    <form-root
      :schema="wrappedSchema"
      :model="model"
      :options="schema.options"
      @update:model="updateModel"
      :form-id="schema.formId"
    />
  </div>
</template>

<script setup lang="ts">
import set from "lodash/set";
import { computed, ref } from "vue";

import { EngineField } from "@/types/engine/EngineField";
import { NodeUpdateEvent } from "@/types/engine/NodeUpdateEvent";
import { Schema } from "@/types/schema/Schema";

import FormRoot from "../../engine/FormRoot.vue";

const props = defineProps<{
  schema: EngineField;
  model: object;
}>();

function updateModel(event: NodeUpdateEvent) {
  set(props.model, event.key, event.value);
}

let sectionSchema = ref({
  type: "object",
  properties: {
    [props.schema.key]: props.schema.layout.schema,
  },
} as Schema);

let wrappedSchema = computed(() => {
  return sectionSchema.value;
});

function transformSchema() {
  console.debug("#TODO");
}
</script>
<style scoped lang="css">
.editable {
  margin-left: -24px;
}
</style>
