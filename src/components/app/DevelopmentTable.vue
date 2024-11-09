<template>
  <v-container>
    <vue-schema-forms
      ref="myForm"
      v-model="model"
      :default-form-actions="true"
      :options="options"
      :schema="schema"
      :validation-behaviour="'messages'"
      @is-form-ready="startWatcher"
      @call-action="handleAction"
    >
      <!--      <template #formActions>-->
      <!--        <v-row>-->
      <!--          <v-col>-->
      <!--            <v-btn color='primary'-->
      <!--                   @click='validate'-->
      <!--            >-->
      <!--              Submit-->
      <!--            </v-btn>-->
      <!--          </v-col>-->
      <!--        </v-row>-->
      <!--      </template>-->
    </vue-schema-forms>
  </v-container>
  <props-viewer
    v-if="showJSONs"
    :model="model"
    :schema="schema"
  />
</template>

<script lang="ts" setup>
import { ref } from "vue";

import VueSchemaForms from "@/components/engine/VueSchemaForms.vue";

import { Schema } from "@/types/schema/Schema";
import { SchemaOptions } from "@/types/schema/SchemaOptions";

import PropsViewer from "./PropsViewer.vue";

const showJSONs = ref(true);

const props = defineProps<{
  schema: Schema;
  model: object;
  options?: SchemaOptions;
}>();

let model = ref(props.model);

let myForm = ref();

async function validate() {
  const { valid } = await myForm.value.validate();
  window.alert(`Validation result: ${valid}`);
}

function startWatcher() {
  console.debug("Form is ready");
}

async function handleAction(payload: any) {
  console.debug("Form action called... 3s response...", payload);

  await new Promise((resolve) => setTimeout(resolve, 3000));

  model.value["czyDuplikat"] = !model.value["czyDuplikat"];
  model.value["poleB"] = "qwe";
}
</script>

<style lang="scss" scoped></style>

<i18n lang="json">
{
  "en": {
    "test": "EN"
  },
  "pl": {
    "test": "PL"
  }
}
</i18n>
