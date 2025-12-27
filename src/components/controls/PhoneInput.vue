<template>
  <v-phone-input
    v-model="localModel"
    :class="[bindClass(schema), requiredInputClass]"
    :country-props="fieldPropsMerged"
    :invalid-message="(options: any) => showMessage(options)"
    :label="label"
    :phone-props="fieldPropsMerged"
    :rules="!fieldProps.readonly ? rules : []"

    v-bind="fieldPropsMerged"
  >
  </v-phone-input>
</template>

<script lang="ts" setup>
import { MessageOptions, VPhoneInput } from 'v-phone-input';
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

function showMessage(options: any) {
  if (options.country.iso2.toLowerCase() == 'pl') {
    return t('phoneInvalid', { example: '421 321 621' });
  }
  return t('phoneInvalid', { example: options.example });
}

const phoneInputProps = {
  'country-icon-mode': 'sprite',
  countryLabel: t('address.country'),
  'guess-country': true,
  'include-countries': ['pl', 'ru', 'tr', 'de', 'gb', 'fr', 'it', 'es', 'ua', 'ro', 'nl'],
};

const propsRef = ref({});
const fieldPropsMerged = computed(() => {
  propsRef.value = {
    countryLabel: () => "",
    ...fieldProps.value,
    ...phoneInputProps,
    ...props.schema.phoneInputProps,
    id: props.schema.key,
    country: 'pl',

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

<style lang="css">
.v-phone-input .v-phone-input__country__input.v-input.v-input--density-compact {
  height: auto;
  min-height: 0;
  --v-phone-input-country-icon-height: initial;
}
</style>
