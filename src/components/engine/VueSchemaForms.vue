<template>
  <v-form
    :ref='(el) => formRef[formId] = el'
  >
    <form-root
      v-if='!loading'
      :form-id='formId'
      :model='modelValue'
      :schema='resolvedSchema'
      :options='options'
      @update:model='updateModel'
    />

    <slot name='formActions'>
      <form-default-actions
        v-if='defaultFormActions'
        :form-valid='formValid'
        :error-messages='errorMessages'
        @validate='validate(validationBehaviour)'
        @reset-validation='resetValidation'
        @reset='reset'
      />
    </slot>
  </v-form>
</template>

<script setup lang='ts'>
import { Component, getCurrentInstance, onMounted, Ref, ref, watch } from 'vue';

import FormRoot from './FormRoot.vue';
import { Schema, SchemaOptions } from '../../vocabulary/schema';
import set from 'lodash/set';
import { useI18n } from 'vue-i18n';
import { resolveSchemaWithLocale } from '../../core/engine/utils';
import { NodeUpdateEvent } from '../../vocabulary/engine';
import TextField from '../controls/TextField.vue';
import DuplicatedSection from '../controls/duplicated-section/DuplicatedSection.vue';
import usePerformanceAPI from '../../core/composables/usePerformanceAPI';
import StaticContent from '../controls/StaticContent.vue';
import RadioButton from '../controls/RadioButton.vue';
import CheckboxButton from '../controls/CheckboxButton.vue';
import TextArea from '../controls/TextArea.vue';
import Select from '../controls/Select.vue';
import { formUpdateLogger } from '../../main';
import EditableSection from '../controls/editable-section/EditableSection.vue';
import Autocomplete from '../controls/Autocomplete.vue';
import { useFormModelStore } from '../../store/formModelStore';
import { FormItem, ValidationBehaviour, ValidationError } from '../../vocabulary/engine/formValidation';
import FormDefaultActions from './validation/FormDefaultActions.vue';
import DatePicker from '../controls/date/DatePicker.vue';
import PhoneInput from '../controls/PhoneInput.vue';

// register components to VueInstance
declare type Components = Record<string, Component>;
const components = {
  'text-field': TextField,
  'duplicated-section': DuplicatedSection,
  'static-content': StaticContent,
  'radio-button': RadioButton,
  'checkbox': CheckboxButton,
  'text-area': TextArea,
  'select': Select,
  'editable-section': EditableSection,
  'dictionary': Autocomplete,
  'date-picker': DatePicker,
  "phone": PhoneInput
} as Components;
const instance = getCurrentInstance();
for (const [name, comp] of Object.entries(components)) {
  //@ts-ignore
  if (!instance?.appContext.app.component(`node-${name}`)) {
    //@ts-ignore
    instance?.appContext.app.component(`node-${name}`, comp);
  }
}
// end register-components

// render tests
const { result } = usePerformanceAPI();

const props = withDefaults(defineProps<{
    schema: Schema;
    modelValue: object;
    options?: SchemaOptions;
    defaultFormActions?: boolean
    validationBehaviour?: ValidationBehaviour
  }>(),
  {
    defaultFormActions: false,
    validationBehaviour: 'scroll',
  });

const emit = defineEmits<{
  (e: 'update:modelValue', val: any): void;
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
  emit('update:modelValue', props.modelValue);
  formModelStore.updateFormModel(props.modelValue);

  if (formUpdateLogger) {
    console.debug('[vue-schema-forms] =>', props.modelValue);
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
    console.debug('[vue-schema-forms] => Reload form in other language');
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
    return valid;
  }
  if (valid) {
    errorMessages.value = [];
  }

  if (!valid && option === 'scroll') {
    let arr: FormItem[] = Array.from(formRef.value[formId].items);
    const item = arr.find((item: FormItem) => !item.isValid);
    const itemRef = document.getElementById(item?.id + '');
    if (item)
      itemRef?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    return;
  }

  if (!valid && option === 'messages') {
    let arr: FormItem[] = Array.from(formRef.value[formId].items);
    errorMessages.value = arr.map((item: FormItem) => {
      const element: Ref<any> = ref(document.getElementById(item.id as string));
      const label = element.value.labels[0].innerText ? element.value.labels[0].innerText : element.value.labels[1].innerText;
      return {
        id: item.id,
        label: label,
        messages: item.errorMessages.length > 0 ? item.errorMessages : null,
      } as ValidationError;
    }).filter((item) => item.messages);
    return errorMessages.value;
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

<style lang='scss'>
.required-input {
  .v-label:first-child:after,
  .v-field-label::after {
    content: " *";
    color: rgb(var(--v-theme-error));
  }
}
</style>

<i18n lang='json'>
{
  "en": {},
  "pl": {}
}
</i18n>
