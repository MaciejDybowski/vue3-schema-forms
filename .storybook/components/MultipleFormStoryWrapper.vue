<template>
  <v-row>
    <v-col cols="7">
      <v-card>
        <v-card-title>
          <span>Form one</span>
          <v-btn
            class="mx-2"
            density="compact"
            icon="mdi-content-copy"
            variant="text"
            @click="contextCopy(schemaOne)"
          />
        </v-card-title>
        <v-divider class="mb-4" />
        <v-card-text>
          <vue-schema-forms
            ref="mySchemaFormOne"
            v-model="modelOne"
            :default-form-actions="true"
            :options="options"
            :schema="schemaOne"
            :validation-behaviour="'scroll'"
            @is-form-ready="catchSignalFormIsReady"
            @call-action="handleAction"
          />
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="5">
      <v-card>
        <v-card-title>Form Model</v-card-title>
        <v-divider class="mb-4" />
        <v-card-text>
          <vue-json-pretty :data="modelOne" />
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="7">
      <v-card>
        <v-card-title>
          <span>Form two</span>
          <v-btn
            class="mx-2"
            density="compact"
            icon="mdi-content-copy"
            variant="text"
            @click="contextCopy(schemaTwo)"
          />
        </v-card-title>
        <v-divider class="mb-4" />
        <v-card-text>
          <vue-schema-forms
            ref="mySchemaFormTwo"
            v-model="modelTwo"
            :default-form-actions="true"
            :options="options"
            :schema="schemaTwo"
            :validation-behaviour="'scroll'"
            @is-form-ready="catchSignalFormIsReady"
            @call-action="handleAction"
          />
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="5">
      <v-card>
        <v-card-title>Form Model</v-card-title>
        <v-divider class="mb-4" />
        <v-card-text>
          <vue-json-pretty :data="modelTwo" />
        </v-card-text>
      </v-card>
    </v-col>
    <v-snackbar
      v-model="snackbar"
      :timeout="1000"
      color="success"
      variant="tonal"
      >Copied!
    </v-snackbar>
  </v-row>
</template>

<script lang="ts" setup>
import { debounce } from "lodash";
import { ref, toRaw, watch } from "vue";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

import { Schema } from "@/types/schema/Schema.d";

import VueSchemaForms from "../../src/components/engine/VueSchemaForms.vue";

const snackbar = ref(false);
const { formModelOne, formModelTwo, options, schemaOne, schemaTwo, emittedObject, signals } = defineProps<{
  formModelOne: object;
  schemaOne: Schema;
  formModelTwo: object;
  schemaTwo: Schema;
  options: object;
  emittedObject?: object;
  signals?: {
    formIsReady?: boolean;
  };
}>();

const modelOne = ref<any>(formModelOne ?? {});
const modelTwo = ref<any>(formModelTwo ?? {});

const mySchemaFormOne = ref();
const mySchemaFormTwo = ref();

if (signals) {
  Object.assign(toRaw(signals), {formIsReady: false});
}

function catchSignalFormIsReady() {
  if (signals) {
    Object.assign(toRaw(signals), {formIsReady: true});
  }
  console.debug(`[vue-schema-forms] - signal about ready was sent.`);
}

function handleAction(properties) {
  console.debug(`[vue-schema-forms] - catch action with properties`);
  // @ts-ignore
  if (emittedObject) {
    Object.assign(toRaw(emittedObject), properties);
  }
  console.debug(emittedObject);
  properties.callback?.();
}

const debounced = {
  saveState: debounce(simulateSavedState, 300),
};

function simulateSavedState() {
  /*if (mySchemaForm.value) {
    mySchemaForm.value.formDataWasSaved = true;
  }*/
}

watch(
  () => modelOne.value,
  async () => {
    if (formModelOne) {
      Object.assign(toRaw(formModelOne), modelOne.value);
    }
    debounced.saveState();
  },
  { deep: true },
);

watch(
  () => modelTwo.value,
  async () => {
    if (formModelTwo) {
      Object.assign(toRaw(formModelTwo), modelTwo.value);
    }
    debounced.saveState();
  },
  { deep: true },
);

function contextCopy(value) {
  navigator.clipboard.writeText(JSON.stringify(value));
  snackbar.value = true;
}

</script>

<style lang="css" scoped></style>
