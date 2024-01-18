<template>
  <v-container>
    <vue-schema-forms
      ref="myForm"
      v-model="model"
      :schema="schema"
      :options="options"
      :default-form-actions="true"
      :validation-behaviour="'messages'"
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

<script setup lang="ts">
import { ref } from "vue";
import PropsViewer from "./PropsViewer.vue";
import { Schema, SchemaOptions } from "@/vocabulary/schema";
import VueSchemaForms from "@/components/engine/VueSchemaForms.vue";

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
</script>

<style scoped lang="scss"></style>

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
