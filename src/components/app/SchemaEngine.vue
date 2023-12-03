<template>
  <v-container>
    <v-form ref="form">
      <vue-schema-forms
        v-model="model"
        :schema="schema"
        :options="options"
      />
      <v-row>
        <v-col
          cols="12"
          class="d-flex flex-column"
        >
          <div class="d-flex align-center">
            <v-btn
              color="success"
              @click="validate"
              width="200"
            >
              Validate
            </v-btn>
            <v-expand-transition>
              <div
                v-if="showJSONs"
                class="ml-2"
              >
                <v-icon color="green">mdi-check-circle-outline</v-icon>
                <span>Form is valid</span>
              </div>
            </v-expand-transition>
          </div>
          <v-btn
            color="error"
            class="mt-4"
            @click="reset"
            width="200"
          >
            Reset Form
          </v-btn>
          <v-btn
            color="warning"
            class="mt-4"
            @click="resetValidation"
            width="200"
          >
            Reset Validation
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
  <props-viewer
    v-if="showJSONs"
    :model="model"
    :schema="schema"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import PropsViewer from "./PropsViewer.vue";
import { Schema, SchemaOptions } from "@/vocabulary/schema";
import { VForm } from "vuetify/components";
import VueSchemaForms from "@/components/engine/VueSchemaForms.vue";

const { t } = useI18n();
const showJSONs = ref(true);

const props = defineProps<{
  schema: Schema;
  model: object;
  options?: SchemaOptions;
}>();

let model = ref(props.model);

const form = ref();

interface FormItem {
  id: string | number;
  validate: () => Promise<string[]>;
  reset: () => void;
  resetValidation: () => void;
  isValid: boolean | null;
  errorMessages: string[];
}

async function validate() {
  const { valid } = await form.value.validate();
  showJSONs.value = valid;

  if (!valid) {
    let arr: FormItem[] = Array.from(form.value.items);
    const item = arr.find((item: FormItem) => !item.isValid);
    const itemRef = document.getElementById(item?.id + "");
    if (item)
      itemRef.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    return;
  }
}

function reset() {
  form.value.reset();
}

function resetValidation() {
  form.value.resetValidation();
}
</script>

<style scoped lang="css"></style>

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
