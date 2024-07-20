<template>
  <v-form :ref="(el) => (formRef[formId] = el)">
    <form-root
      v-if="!loading"
      :form-id="formId"
      :model="modelValue"
      :schema="resolvedSchema"
      :options="options"
      @update:model="updateModel"
    />

    <slot name="formActions">
      <form-default-actions
        v-if="defaultFormActions"
        :form-valid="formValid"
        :error-messages="errorMessages"
        @validate="validate(validationBehaviour)"
        @reset-validation="resetValidation"
        @reset="reset"
      />
    </slot>
  </v-form>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, Ref, ref, watch } from "vue";

import FormRoot from "./FormRoot.vue";
import { Schema, SchemaOptions } from "@/types/schema";
import set from "lodash/set";
import { useI18n } from "vue-i18n";
import { resolveSchemaWithLocale } from "../../core/engine/utils";
import { NodeUpdateEvent } from "@/types/engine";
import usePerformanceAPI from "../../core/composables/usePerformanceAPI";
import { formUpdateLogger } from "../../main";
import { useFormModelStore } from "../../store/formModelStore";
import { FormItem, ValidationBehaviour, ValidationError } from "@/types/engine/formValidation";
import FormDefaultActions from "./validation/FormDefaultActions.vue";
import { vueSchemaFromControls } from "@/components/controls";

// register components to VueInstance if not installed yet by plugin options
const instance = getCurrentInstance();
for (const [name, comp] of Object.entries(vueSchemaFromControls)) {
  if (!instance?.appContext.app.component(`node-${name}`)) {
    instance?.appContext.app.component(`node-${name}`, comp);
  }
}
// end register-components

// render tests
const { result } = usePerformanceAPI();

const props = withDefaults(
  defineProps<{
    schema: Schema;
    modelValue: object;
    options?: SchemaOptions;
    defaultFormActions?: boolean;
    validationBehaviour?: ValidationBehaviour;
  }>(),
  {
    defaultFormActions: false,
    validationBehaviour: "scroll",
  },
);

const emit = defineEmits<{
  (e: "update:modelValue", val: any): void;
}>();

let loading = ref(true);
const { locale, t } = useI18n();
const resolvedSchema = ref({} as Schema);

const formId = Math.random().toString().slice(2, 5);
const formRef = ref({});
const formValid = ref(false);
const errorMessages: Ref<Array<ValidationError>> = ref([]);
const formModelStore = useFormModelStore(formId);

function updateModel(event: NodeUpdateEvent) {
  set(props.modelValue, event.key, event.value);
  emit("update:modelValue", props.modelValue);
  formModelStore.updateFormModel(props.modelValue);

  if (formUpdateLogger) {
    console.debug(`[vue-schema-forms] [${event.key}] =>`, props.modelValue);
  }
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
  formModelStore.updateFormModel(props.modelValue);
  await loadResolvedSchema();
});

async function validate(option?: ValidationBehaviour) {
  const { valid } = await formRef.value[formId].validate();
  formValid.value = valid;

  if (!option) {
    return { valid };
  }
  if (valid) {
    errorMessages.value = [];
  }

  if (!valid && option === "scroll") {
    let arr: FormItem[] = Array.from(formRef.value[formId].items);
    const item = arr.find((item: FormItem) => !item.isValid);
    const itemRef = document.getElementById(item?.id + "");
    if (item)
      itemRef?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    return { valid };
  }

  if (!valid && option === "messages") {
    let arr: FormItem[] = Array.from(formRef.value[formId].items);
    errorMessages.value = arr
      .filter((item: FormItem) => !item.isValid)
      .map((item: FormItem) => {
        const element: Ref<any> = ref(document.getElementById(item.id as string));
        const label = element.value.labels[0].innerText ? element.value.labels[0].innerText : element.value.labels[1].innerText;
        return {
          id: item.id,
          label: label,
          messages: item.errorMessages.length > 0 ? item.errorMessages : null,
        } as ValidationError;
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
