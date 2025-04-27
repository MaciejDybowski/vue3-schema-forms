<template>
  <v-form :ref="(el) => (formRef[formId] = el)">
    <form-root
      v-if="!loading"
      :form-id="formId"
      :model="localModel"
      :options="options"
      :schema="resolvedSchema"
      @update:model="updateModel"
    />

    <slot name="formActions">
      <form-default-actions
        v-if="defaultFormActions"
        :error-messages="errorMessages"
        :form-valid="formValid"
        @reset="reset"
        @validate="validate(validationBehaviour)"
        @reset-validation="resetValidation"
      />
    </slot>
  </v-form>
</template>

<script lang="ts" setup>
import { debounce } from "lodash";
import set from "lodash/set";
import { Ref, getCurrentInstance, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import { vueSchemaFromControls } from "@/components/controls";

import { NodeUpdateEvent } from "@/types/engine/NodeUpdateEvent";
import { ValidationFromBehaviour } from "@/types/engine/ValidationFromBehaviour";
import { ValidationFromError } from "@/types/engine/ValidationFromError";
import { ValidationFromItem } from "@/types/engine/ValidationFromItem";
import { Schema } from "@/types/schema/Schema";
import { SchemaOptions } from "@/types/schema/SchemaOptions";
import { useEventBus } from "@vueuse/core";

import usePerformanceAPI from "../../core/composables/usePerformanceAPI";
import { resolveSchemaWithLocale } from "../../core/engine/utils";
import { logger } from "../../main";
import { useFormModelStore } from "../../store/formModelStore";
import FormRoot from "./FormRoot.vue";
import FormDefaultActions from "./validation/FormDefaultActions.vue";

// register components to VueInstance if not installed yet by plugin options
const instance = getCurrentInstance();
for (const [name, comp] of Object.entries(vueSchemaFromControls)) {
  if (!instance?.appContext.app.component(`node-${name}`)) {
    instance?.appContext.app.component(`node-${name}`, comp);
  }
}
// end register-components

// render tests
const { result, stopMeasure } = usePerformanceAPI();

const localModel = ref({});

const model = defineModel<object>();

const props = withDefaults(
  defineProps<{
    schema: Schema;
    options?: SchemaOptions;
    defaultFormActions?: boolean;
    validationBehaviour?: ValidationFromBehaviour;
  }>(),
  {
    defaultFormActions: false,
    validationBehaviour: "scroll",
  },
);

const emit = defineEmits<{
  (e: "update:modelValue", val: any): void;
  (e: "isFormReady");
  (e: "callAction", payload: { code: string; body: Record<any, any>; params: Record<any, any> });
}>();

let loading = ref(true);
const { locale, t } = useI18n();
const resolvedSchema = ref({} as Schema);

const formId = Math.random().toString().slice(2, 5);
const formRef = ref({});
const formValid = ref(false);
const errorMessages: Ref<Array<ValidationFromError>> = ref([]);
const formModelStore = useFormModelStore(formId);
const formReadySignalSent = ref(false);

const vueSchemaFormEventBus = useEventBus<string>("form-model");
const actionHandlerEventBus = useEventBus<string>("form-action");
const temporaryFormEventBus = useEventBus<string>("form-temporary"); // TODO zmienic aby form-model nie przekazywal tylko indexu tylko caly event

async function actionCallback() {
  await new Promise((r) => setTimeout(r, 100));
  localModel.value = { ...localModel.value, ...model.value } as any;
  formModelStore.updateFormModel(localModel.value);
  vueSchemaFormEventBus.emit("model-changed", "action-callback");
}

actionHandlerEventBus.on(async (event, payload) => {
  if (formReadySignalSent.value) {
    if (payload.callback) {
      emit("callAction", { ...payload });
      return;
    }
    emit("callAction", { ...payload, callback: actionCallback });
  }
});

const debounced = {
  formIsReady: (WAIT: number = 1000) => debounce(formIsReady, WAIT),
};

function formIsReady() {
  if (!formReadySignalSent.value) {
    emit("isFormReady");
    formReadySignalSent.value = true;
    if (logger.formUpdateLogger) {
      console.debug(`[vue-schema-forms] => Form ${formId}] sent ready signal`);
    }
  }
}

function updateModel(event: NodeUpdateEvent) {
  debounced.formIsReady().cancel();
  set(localModel.value, event.key, event.value);
  formModelStore.updateFormModel(localModel.value);

  temporaryFormEventBus.emit("model-changed", event);

  if (event.emitBlocker) {
    vueSchemaFormEventBus.emit("model-changed", event.index);
    return;
  }

  emit("update:modelValue", localModel.value);

  if (logger.formUpdateLogger) {
    console.debug(`[vue-schema-forms] [${event.key}] =>`, localModel.value);
  }

  vueSchemaFormEventBus.emit("model-changed", event.index);
  debounced.formIsReady()();
}

async function loadResolvedSchema() {
  loading.value = true;
  resolvedSchema.value = await resolveSchemaWithLocale(props.schema, locale.value);
  loading.value = false;
}

watch(
  locale,
  async () => {
    console.debug("[vue-schema-forms] => Reload form in other language");
    await loadResolvedSchema();
  },
  { deep: true },
);

onMounted(async () => {
  localModel.value = { ...model.value };

  formModelStore.updateFormModel(localModel.value);
  formModelStore.updateFormContext(props.options && props.options.context ? props.options.context : {});
  await loadResolvedSchema();
  stopMeasure();
  debounced.formIsReady(800)();
});

async function validate(option?: ValidationFromBehaviour) {
  let preValid = true;
  errorMessages.value = [];

  // Alert error block validation !
  const alertElements = document.querySelectorAll('[role="alert"]');
  alertElements.forEach((alertElement) => {
    const isError = alertElement.classList.contains("v-alert") && alertElement.classList.contains("text-error");
    const alertText = alertElement.textContent;

    if (isError && option == "messages") {
      preValid = false;
      errorMessages.value.push({
        id: Math.random().toString(16).slice(2),
        label: "Alert",
        messages: [alertText + ""],
      });
    }

    if (isError && option == "scroll") {
      preValid = false;
      const alert = document.getElementById(alertElement?.id + "");
      if (alert)
        alert?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
    }
  });
  // END

  const { valid } = await formRef.value[formId].validate();
  formValid.value = valid && preValid;

  if (!option) {
    return { valid };
  }
  if (formValid.value) {
    errorMessages.value = [];
  }

  if (!valid && option === "scroll") {
    let arr: ValidationFromItem[] = Array.from(formRef.value[formId].items);
    const item = arr.find((item: ValidationFromItem) => !item.isValid);
    const itemRef = document.getElementById(item?.id + "");
    if (item)
      itemRef?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    return { valid };
  }

  if (!valid && option === "messages") {
    let arr: ValidationFromItem[] = Array.from(formRef.value[formId].items);
    errorMessages.value = arr
      .filter((item: ValidationFromItem) => !item.isValid)
      .map((item: ValidationFromItem) => {
        const element: Ref<any> = ref(document.getElementById(item.id as string));
        const label = element.value.labels[0].innerText ? element.value.labels[0].innerText : element.value.labels[1].innerText;
        return {
          id: item.id,
          label: label,
          messages: item.errorMessages.length > 0 ? item.errorMessages : null,
        } as ValidationFromError;
      })
      .filter((item) => item.messages);
    return { valid, messages: errorMessages.value };
  }

  if (valid && option === "messages") {
    return { valid, messages: [] };
  }
  if (valid && option === "scroll") {
    return { valid };
  }
}

function reset() {
  formRef.value[formId].reset();
  errorMessages.value = [];
}

function resetValidation() {
  formRef.value[formId].resetValidation();
  errorMessages.value = [];
}

defineExpose({
  validate,
  reset,
  resetValidation,
});
</script>

<style lang="scss">
.required-input {
  .v-label:first-child:after,
  .v-field-label::after {
    content: " *";
    color: rgb(var(--v-theme-error));
  }
}
</style>

<i18n lang="json">
{
  "en": {},
  "pl": {}
}
</i18n>
