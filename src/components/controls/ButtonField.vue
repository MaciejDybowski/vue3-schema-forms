<template>
  <v-btn
    :class="bindClass(schema)"
    :color="primaryWhite"
    v-bind="fieldProps"
    @click="runBtnLogic"
  >
    {{ label }}
  </v-btn>

  <v-dialog
    v-model="popup.show"
    max-width="650"
  >
    <template v-slot:default="{ isActive }">
      <v-card :title="popup.title">
        <v-card-text>
          <vue-schema-forms
            ref="popupReference"
            v-model="popup.model"
            :options="popup.options"
            :schema="popup.schema"
          />
        </v-card-text>
        <v-card-actions class="mx-4">
          <v-spacer></v-spacer>

          <v-btn
            :text="t('close')"
            v-bind="{ ...fieldProps, color: '', variant: 'elevated' }"
            @click="isActive.value = false"
          ></v-btn>

          <v-btn
            :text="popup.acceptText"
            v-bind="{ ...fieldProps, variant: 'elevated' }"
            @click="saveDialogForm(isActive)"
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>

  <v-snackbar
    v-model="snackbar.modelValue"
    :timeout="1000"
    color="success"
    variant="tonal"
  >
    {{ snackbar.text }}
  </v-snackbar>
</template>

<script lang="ts" setup>
import get from "lodash/get";
import { Ref, computed, onMounted, reactive, ref } from "vue";
import { useTheme } from "vuetify";

import { useClass, useLabel, useLocale, useProps } from "@/core/composables";
import { EngineField } from "@/types/engine/EngineField";
import { Schema } from "@/types/schema/Schema";
import { useEventBus } from "@vueuse/core";

import VueSchemaForms from "../engine/VueSchemaForms.vue";

const actionHandlerEventBus = useEventBus<string>("form-action");

const { schema, model } = defineProps<{
  schema: EngineField;
  model: object;
}>();

const { bindClass } = useClass();
const { bindProps, fieldProps } = useProps();
const { label, bindLabel } = useLabel(schema);

const { t } = useLocale();
const theme = useTheme();
const primaryWhite = computed(() => (theme.current.value.dark ? "white" : "primary"));

const popupReference = ref();
const popup = reactive<{
  errorMessages: Ref<any[]>;
  show: boolean;
  title: string;
  model: object;
  schema: Schema;
  options: object;
  item: object;
  itemIndex: number;
  acceptFunction: Function;
  acceptText: string;
}>({
  errorMessages: ref([]),
  show: false,
  title: "",
  model: {},
  schema: {} as Schema,
  options: schema.options,
  item: {},
  itemIndex: 0,
  acceptFunction: () => {},
  acceptText: t("save"),
});

const snackbar = reactive({
  modelValue: false,
  text: t("valueCopied"),
});

async function saveDialogForm(isActive: Ref<boolean>) {
  const { valid, messages } = await popupReference.value.validate("messages");
  popup.errorMessages = messages;
  if (valid) {
    popup.acceptFunction();
    isActive.value = false;
  }
}

function runBtnLogic() {
  switch (schema.mode) {
    case "form-and-action":
      popup.errorMessages = [];
      popup.title = schema.config.title;
      if (schema.config.modelReference) {
        popup.model = get(model, schema.config.modelReference, {});
      }
      popup.schema = schema.schema;
      popup.acceptFunction = async () => {
        let payloadObject = {
          code: schema.config.code,
          body: popup.model,
          params: {},
        };
        console.debug(`Popup model is ready to save, event [form-action] was emitted`, payloadObject);
        actionHandlerEventBus.emit("form-action", payloadObject);
      };
      popup.show = true;
      break;
    case "copy":
      snackbar.modelValue = true;
      const value = get(model, schema.config.modelReference, null);
      navigator.clipboard.writeText(value);
      break;
  }
}

onMounted(async () => {
  await bindLabel(schema);
  await bindProps(schema);
});
</script>

<style lang="css" scoped>

</style>

<i18n lang="json">
{
  "en": {
    "save": "Save",
    "close": "Close",
    "valueCopied": "Copied!"
  },
  "pl": {
    "save": "Zapisz",
    "close": "Zamknij",
    "valueCopied": "Skopiowano!"
  }
}
</i18n>
