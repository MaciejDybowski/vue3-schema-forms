<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title>Form Visualisation</v-card-title>
        <v-card-text>
          <vue-schema-forms
            v-if="!loading"
            v-model="model"
            :default-form-actions="true"
            :options="options"
            :schema="schema"
            :validation-behaviour="'scroll'"
            @is-form-ready="catchSignalFormIsReady"
            @call-action="handleAction"
          />
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card>
        <v-card-title>Form Model</v-card-title>
        <v-card-text>
          <vue-json-pretty :data="model" />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { onMounted, ref, toRaw, watch } from "vue";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

import VueSchemaForms from "@/components/engine/VueSchemaForms.vue";

import { Schema } from "@/types/schema/Schema";

const { schema, options, formModel } = defineProps<{
  formModel: object;
  schema: Schema;
  options: object;
}>();

const model = ref<any>(null);

function catchSignalFormIsReady() {
  console.debug(`[vue-schema-forms] - signal about ready was sent.`);
}

function handleAction(properties) {
  console.debug(`[vue-schema-forms] - catch action with properties`);
  console.debug(properties);
}

const loading = ref(true)
watch(
  () => model.value,
  () => {
    Object.assign(toRaw(formModel), model.value);
  },
  { deep: true },
);

onMounted(() => {
  model.value = formModel;
  loading.value = false;
});
</script>

<style lang="css" scoped></style>
