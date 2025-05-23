<template>
  <v-phone-input
    :class="bindClass(schema) + requiredInputClass"
    :label="label"
    v-model="localModel"
    :invalid-message="(options: any) => t('phoneInvalid', { example: options.example })"
    :country-props="fieldPropsMerged"
    :phone-props="fieldPropsMerged"
    v-bind="fieldPropsMerged"
    :rules="!fieldProps.readonly ? rules : []"
    name="phone"
    type="tel"
  >
  </v-phone-input>
</template>

<script setup lang="ts">
import { VPhoneInput } from 'v-phone-input';
import 'v-phone-input/dist/v-phone-input.css';
import 'world-flags-sprite/stylesheets/flags32.css';

import { computed, onMounted, ref } from 'vue';

import {
  useClass,
  useFormModel,
  useLabel,
  useLocale,
  useProps,
  useRules,
} from '@/core/composables';
import { EnginePhoneField } from '@/types/engine/controls';

const props = defineProps<{
  schema: EnginePhoneField;
  model: object;
}>();

const { label, bindLabel } = useLabel(props.schema);
const { bindRules, rules, requiredInputClass } = useRules();
const { bindClass } = useClass();
const { bindProps, fieldProps } = useProps();
const { t } = useLocale();
const { getValue, setValue } = useFormModel();

const phoneInputProps = {
  'country-icon-mode': 'sprite',
  countryLabel: t('address.country'),
  'guess-country': true,
  'include-countries': [
    'al',
    'ad',
    'at',
    'be',
    'by',
    'ba',
    'bg',
    'hr',
    'me',
    'cz',
    'dk',
    'ee',
    'fi',
    'fr',
    'de',
    'gr',
    'es',
    'nl',
    'ie',
    'is',
    'xk',
    'li',
    'lt',
    'lu',
    'lv',
    'mk',
    'mt',
    'md',
    'mc',
    'pl',
    'pt',
    'ru',
    'ro',
    'sm',
    'rs',
    'sk',
    'si',
    'ch',
    'se',
    'tr',
    'ua',
    'va',
    'hu',
    'gb',
    'it',
    'ca',
    'mx',
    'ar',
    'br',
    'cn',
    'jp',
    'au',
    'us',
  ],
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

onMounted(async () => {
  await bindLabel(props.schema);
  await bindRules(props.schema);
  await bindProps(props.schema);
});
</script>

<style scoped lang="css"></style>
