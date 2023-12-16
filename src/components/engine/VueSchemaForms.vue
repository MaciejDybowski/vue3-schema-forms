<template>
  <form-root
    v-if='!loading'
    :model='modelValue'
    :schema='resolvedSchema'
    :options='options'
    @update:model='updateModel'
  />
</template>

<script setup lang='ts'>
import { Component, getCurrentInstance, onMounted, ref, watch } from 'vue';

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
  "editable-section": EditableSection
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

// condition for enable measure render tests
let result = ref(0);
const isShouldMeasureRenderTime = import.meta.env.VITE_ENABLE_RENDER_TEST === 'true';
if (isShouldMeasureRenderTime) {
  result = usePerformanceAPI().result;
}
// end

const props = defineProps<{
  schema: Schema;
  modelValue: object;
  options?: SchemaOptions;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', val: any): void;
}>();

let loading = ref(true);
const { locale, t } = useI18n();
const resolvedSchema = ref({} as Schema);

function updateModel(event: NodeUpdateEvent) {
  set(props.modelValue, event.key, event.value);
  emit('update:modelValue', props.modelValue);
  if(formUpdateLogger){
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
  await loadResolvedSchema();
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
