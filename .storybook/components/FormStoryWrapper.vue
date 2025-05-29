<template>
  <v-row>
    <v-col cols="7">
      <v-card>
        <v-card-title>
          <span>Form Visualisation</span>
          <v-btn
            class="mx-2"
            density="compact"
            icon="mdi-content-copy"
            variant="text"
            @click="contextCopy"
          />
        </v-card-title>
        <v-divider class="mb-4" />
        <v-card-text>
          <vue-schema-forms
            v-if="!loading"
            ref="mySchemaForm"
            v-model="model"
            :default-form-actions="true"
            :options="options"
            :schema="schema"
            :validation-behaviour="validationBehaviour != null ? validationBehaviour : 'scroll'"
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
          <vue-json-pretty :data="model" />
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
import { onMounted, ref, toRaw, watch } from "vue";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";



import VueSchemaForms from "../../src/components/engine/VueSchemaForms.vue";
import { Schema } from '@/types/schema/Schema.d';


const snackbar = ref(false);
const { schema, options, formModel, emittedObject } = defineProps<{
  formModel: object;
  schema: Schema;
  options: object;
  emittedObject?: object;
  validationBehaviour?: string;
}>();

const model = ref<any>(null);

const mySchemaForm = ref();

function catchSignalFormIsReady() {
  console.debug(`[vue-schema-forms] - signal about ready was sent.`);
}

function handleAction(properties) {
  console.debug(`[vue-schema-forms] - catch action with properties`, properties);
  // @ts-ignore
  try {
    Object.assign(toRaw(emittedObject), properties);
    console.debug(emittedObject);
  } catch (e) {
    console.warn("error");
  }
}

const debounced = {
  saveState: debounce(simulateSavedState, 300),
};

function simulateSavedState() {
  if (mySchemaForm.value) {
    mySchemaForm.value.formDataWasSaved = true;
  }
}

const loading = ref(true);
watch(
  () => model.value,
  async () => {
    if (mySchemaForm.value) {
      mySchemaForm.value.formDataWasSaved = false;
    }
    Object.assign(toRaw(formModel), model.value);
    debounced.saveState();
  },
  { deep: true },
);

function contextCopy() {
  navigator.clipboard.writeText(JSON.stringify(schema));
  snackbar.value = true;
}

onMounted(() => {
  model.value = formModel;
  loading.value = false;
});
</script>

<style lang="css" scoped></style>
