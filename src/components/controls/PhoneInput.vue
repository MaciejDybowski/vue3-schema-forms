<template>
  <v-phone-input
    :class='bindClass(schema)'
    :label='label'
    v-model='localModel'
    :invalid-message="(options: any) => t('phoneInvalid', { example: options.example })"
    :country-props='fieldPropsMerged'
    :phone-props='fieldPropsMerged'
    v-bind='fieldPropsMerged'
    :rules='rules(schema)'
    name='phone'
    type='tel'
  >
  </v-phone-input>
</template>

<script setup lang='ts'>
import 'flag-icons/css/flag-icons.min.css';
import { VPhoneInput } from 'v-phone-input';
import 'v-phone-input/dist/v-phone-input.css';
import { computed, onMounted, ref } from 'vue';

import { EnginePhoneField } from '@/types/engine/controls';

import { useClass, useFormModel, useLabel, useLocale, useProps, useRules } from '@/core/composables';

const props = defineProps<{
  schema: EnginePhoneField;
  model: object;
}>();

const { label } = useLabel(props.schema);
const { rules } = useRules();
const { bindClass } = useClass();
const { bindProps, fieldProps } = useProps();
const { t } = useLocale();
const { getValue, setValue } = useFormModel();

const phoneInputProps = {
  'country-icon-mode': 'svg',
  countryLabel: t('address.country'),
  'guess-country': true,
  'include-countries': ['pl', 'gb', 'ru', 'de', 'us', 'es', 'fr', 'it'],
};

const propsRef = ref({});
const fieldPropsMerged = computed(() => {
  propsRef.value = {
    ...fieldProps.value,
    ...phoneInputProps,
    ...props.schema.phoneInputProps,
  };
  return propsRef.value;
});

const localModel = computed({
  get(): string {
    return getValue(props.model, props.schema);
  },
  set(val: any) {
    setValue(val, props.schema);
  },
});

onMounted(() => {
  bindProps(props.schema);
});
</script>

<style scoped lang='css'></style>
