<template>
  <v-form
    :ref="(el) => (formRef[formId] = el)"
    autocomplete="off"
  >
    <form-root
      v-if="!loading"
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
import { useEventBus } from '@vueuse/core';
import { debounce, merge } from 'lodash';
import set from 'lodash/set';
import { useI18n } from 'vue-i18n';

import { Ref, getCurrentInstance, onBeforeMount, onMounted, ref, watch } from 'vue';

import { vueSchemaFromControls } from '@/components/controls';

import { provideGeneratorCache } from '@/core/composables/useGeneratorCache';
import { provideFormModel } from '@/core/state/useFormModelProvider';
import { FormExternalAction } from '@/types/engine/FormExternalAction';
import { FormModel } from '@/types/engine/FormModel';
import { NodeUpdateEvent } from '@/types/engine/NodeUpdateEvent';
import { ValidationFromBehaviour } from '@/types/engine/ValidationFromBehaviour';
import { ValidationFromError } from '@/types/engine/ValidationFromError';
import { ValidationFromItem } from '@/types/engine/ValidationFromItem';
import { Schema } from '@/types/schema/Schema';
import { SchemaOptions } from '@/types/schema/SchemaOptions';

import usePerformanceAPI from '../../core/composables/usePerformanceAPI';
import { resolveSchemaWithLocale } from '../../core/engine/utils';
import { logger } from '../../main';
import FormRoot from './FormRoot.vue';
import FormDefaultActions from './validation/FormDefaultActions.vue';

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

onBeforeMount(() => {
  provideGeneratorCache();
});
const form = provideFormModel();

const localModel = ref({});

const model = defineModel<FormModel>();

const props = withDefaults(
  defineProps<{
    schema: Schema;
    options?: SchemaOptions;
    defaultFormActions?: boolean;
    validationBehaviour?: ValidationFromBehaviour;
  }>(),
  {
    defaultFormActions: false,
    validationBehaviour: 'scroll',
  },
);

const emit = defineEmits<{
  (e: 'update:modelValue', val: FormModel): void;
  (e: 'isFormReady'): void;
  (e: 'callAction', payload: FormExternalAction): void;
}>();

let loading = ref(true);
const { locale, t } = useI18n();
const resolvedSchema = ref({} as Schema);

const formId: string = Math.random().toString().slice(2, 5);
const formRef = ref<Record<string, any>>({});
const formValid = ref(false);
const errorMessages: Ref<Array<ValidationFromError>> = ref([]);

const formReadySignalSent = ref(false);

const internalValues = ref<Set<string>>(new Set<string>());

const vueSchemaFormEventBus = useEventBus<string>('form-model');
const actionHandlerEventBus = useEventBus<string>('form-action');

const pendingEvents: any[] = []; // kolejka zdarzeń wywołanych przed otrzymaniem sygnału, że form is ready
function flushPendingEvents() {
  while (pendingEvents.length) {
    const { payload } = pendingEvents.shift();
    if (payload.callback) {
      emit('callAction', { ...payload });
    } else {
      emit('callAction', { ...payload, callback: actionCallback });
    }
  }
}

async function actionCallback() {
  await new Promise((r) => setTimeout(r, 100));
  // previous version invokes loop in calcs, probably due to destroyed reference by using {...obj} instruction
  localModel.value = merge(localModel.value, model.value);
  await new Promise((r) => setTimeout(r, 100));
  form.updateFormModel(localModel.value);

  // update internal
  vueSchemaFormEventBus.emit('model-changed', 'action-callback');
  // update external
  emitUpdateEvent();
}

actionHandlerEventBus.on(async (event, payload) => {
  if (!formReadySignalSent.value) {
    pendingEvents.push({ event, payload });
    return;
  }
  if (payload.callback) {
    emit('callAction', { ...payload });
    return;
  }
  emit('callAction', { ...payload, callback: actionCallback });
});

const debounced = {
  formIsReady: (WAIT: number = 1000) => debounce(formIsReady, WAIT),
};

function formIsReady() {
  if (!formReadySignalSent.value) {
    emit('isFormReady');
    formReadySignalSent.value = true;
    if (logger.formUpdateLogger) {
      console.debug(`[vue-schema-forms] => Form ${formId}] sent ready signal`);
    }
    flushPendingEvents();
  }
}

function updateModel(event: NodeUpdateEvent) {
  debounced.formIsReady().cancel();
  set(localModel.value, event.key, event.value);
  form.updateFormModel(localModel.value);

  if (event.emitBlocker) {
    vueSchemaFormEventBus.emit('model-changed', event);
    internalValues.value.add(event.key);
    return;
  }

  emitUpdateEvent();

  if (logger.formUpdateLogger) {
    console.debug(`[vue-schema-forms] [${event.key}] =>`, localModel.value);
  }

  vueSchemaFormEventBus.emit('model-changed', event);
  debounced.formIsReady()();
}

function emitUpdateEvent() {
  const formModel: Record<string, any> = { ...localModel.value };
  internalValues.value.forEach((value: string) => {
    delete formModel[value];
  });

  emit('update:modelValue', formModel);
}

async function loadResolvedSchema() {
  loading.value = true;
  resolvedSchema.value = await resolveSchemaWithLocale(props.schema, locale.value, props.options);
  resolvedSchema.value = cleanJson(resolvedSchema.value);
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

/*
 In order to clean JSON from formatted fields, e.g. expressions in JSONata can be formatted using indents or white spaces.
 */
function cleanJson(obj: any): any {
  if (typeof obj === 'string') {
    if (
      obj.trim().toLowerCase().startsWith('JSONATA('.toLowerCase()) ||
      obj.trim().toLowerCase().startsWith('NATA('.toLowerCase())
    ) {
      return obj
        .replace(/\s+/g, ' ')
        .replace(/\s*\(\s*/g, '(')
        .replace(/\s*\)\s*/g, ')');
    }
    // Dla innych stringów zwróć bez zmian
    return obj;
  } else if (Array.isArray(obj)) {
    return obj.map(cleanJson);
  } else if (obj && typeof obj === 'object') {
    const cleanedObj = {} as any;
    for (const key in obj) {
      cleanedObj[key] = cleanJson(obj[key]);
    }
    return cleanedObj;
  }
  return obj;
}

onMounted(async () => {
  localModel.value = { ...model.value };

  form.updateFormModel(localModel.value);
  form.updateFormContext(props.options && props.options.context ? props.options.context : {});

  //console.debug('[vue-schema-forms] => Resolved', resolvedSchema.value);
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
    const isError =
      alertElement.classList.contains('v-alert') && alertElement.classList.contains('text-error');
    const alertText = alertElement.textContent;

    if (isError && (option == 'messages' || option == 'combined')) {
      preValid = false;
      errorMessages.value.push({
        id: Math.random().toString(16).slice(2),
        label: 'Alert',
        messages: [alertText + ''],
      });
    }

    if (isError && (option == 'scroll' || option == 'combined')) {
      preValid = false;
      const alert = document.getElementById(alertElement?.id + '');
      if (alert)
        alert?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
    }
  });
  // END

  const { valid } = await formRef.value[formId].validate();
  formValid.value = valid && preValid;

  if (!option) {
    return { valid: formValid.value };
  }
  if (formValid.value) {
    errorMessages.value = [];
  }

  if (!formValid.value && option === 'scroll') {
    prepareScrollToFirstInvalidField();
    return { valid: formValid.value };
  }

  if (!formValid.value && option === 'messages') {
    prepareArrayOfValidationMessages();
    return { valid: formValid.value, messages: errorMessages.value };
  }

  if (!formValid.value && option === 'combined') {
    prepareScrollToFirstInvalidField();
    prepareArrayOfValidationMessages();
    return { valid: formValid.value, messages: errorMessages.value };
  }

  if (formValid.value && option === 'messages') {
    return { valid: formValid.value, messages: [] };
  }
  if (formValid.value && option === 'scroll') {
    return { valid: formValid.value };
  }
  if (formValid.value && option === 'combined') {
    return { valid: formValid.value, messages: [] };
  }
}

function prepareScrollToFirstInvalidField() {
  let arr: ValidationFromItem[] = Array.from(formRef.value[formId].items);
  const item = arr.find((item: ValidationFromItem) => !item.isValid);
  const itemRef = document.getElementById(item?.id + '');
  if (item)
    itemRef?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
}

function findInputLabel(inputEl: HTMLElement): string | null {
  if (!inputEl) return null;

  // 1) <label for="id">
  const id = inputEl.id;
  if (id) {
    const forLabel = document.querySelector(`label[for="${id}"]`);
    if (forLabel && forLabel.textContent?.trim()) {
      return forLabel.textContent.trim();
    }
  }

  // 2) aria-labelledby
  const ariaLabelledby = inputEl.getAttribute('aria-labelledby');
  if (ariaLabelledby) {
    const labels = ariaLabelledby.trim().split(/\s+/);
    for (const lblId of labels) {
      const lblEl = document.getElementById(lblId);
      if (lblEl?.textContent?.trim()) {
        return lblEl.textContent.trim();
      }
    }
  }

  // 3) nearest ancestor label
  let parent: any = inputEl.parentElement;
  while (parent) {
    if (parent.tagName.toLowerCase() === 'label' && parent.textContent?.trim()) {
      return parent.textContent.trim();
    }
    parent = parent.parentElement;
  }

  // 4) sibling label elements
  const siblings = [inputEl.previousElementSibling, inputEl.nextElementSibling];
  for (const sib of siblings) {
    if (sib?.tagName.toLowerCase() === 'label' && sib.textContent?.trim()) {
      return sib.textContent.trim();
    }
  }

  // 5) search in container
  const container = inputEl.closest('div, form, fieldset');
  if (container) {
    const lblInside = container.querySelector('label');
    if (lblInside?.textContent?.trim()) {
      return lblInside.textContent.trim();
    }
  }

  return null;
}

function prepareArrayOfValidationMessages() {
  let arr: ValidationFromItem[] = Array.from(formRef.value[formId].items);
  const filtered = arr
    .filter((item: ValidationFromItem) => !item.isValid)
    .map((item: ValidationFromItem) => {
      const element: Ref<any> = ref(document.getElementById(item.id as string));
      const label = element.value ? findInputLabel(element.value) : item.id;
      return {
        id: item.id,
        label: label,
        messages: item.errorMessages.length > 0 ? item.errorMessages : null,
      } as ValidationFromError;
    })
    .filter((item) => item.messages);

  errorMessages.value.push(...filtered);
}

function reset() {
  formRef.value[formId].reset();
  errorMessages.value = [];
}

function resetValidation() {
  formRef.value[formId].resetValidation();
  errorMessages.value = [];
}

const formExternalStateEventBus = useEventBus<string>('form-state');
const formDataWasSaved = ref(true);
watch(formDataWasSaved, (newValue) => {
  formExternalStateEventBus.emit('form-data-saved', formDataWasSaved.value);
});

defineExpose({
  validate,
  reset,
  resetValidation,
  formDataWasSaved,
});
</script>

<style lang="scss">
.required-input {
  .v-label:first-child:after,
  .v-field-label::after {
    content: ' *';
    color: rgb(var(--v-theme-error));
  }
}
</style>
