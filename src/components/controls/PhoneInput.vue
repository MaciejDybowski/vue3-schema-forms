<template>
  <v-phone-input
    :class='bindClass(schema)'
    :label='label'
    v-model='localModel'
    :invalid-message='(options:any) => t("phoneInvalid", {example: options.example})'
    :country-props='bindProps(schema)'
    :phone-props='bindProps(schema)'
    v-bind='mergedPhoneInputProps'
    :rules='rules(schema)'
  >
  </v-phone-input>
</template>

<script setup lang='ts'>
import 'flag-icons/css/flag-icons.min.css';
import 'v-phone-input/dist/v-phone-input.css';
import { VPhoneInput } from 'v-phone-input';
import { computed } from 'vue';
import { useLabel } from '@/core/composables/useLabel';
import { EnginePhoneField } from '@/vocabulary/engine/controls';
import { useRules } from '@/core/composables/useRules';
import { useClass } from '@/core/composables/useClass';
import { getValueFromModel, produceUpdateEvent } from '@/core/engine/utils';
import { useProps } from '@/core/composables/useProps';
import { useLocale } from '@/core/composables/useLocale';


const props = defineProps<{
  schema: EnginePhoneField;
  model: object;
}>();

const { label } = useLabel(props.schema);
const { rules } = useRules();
const { bindClass } = useClass();
const { bindProps } = useProps();
const { t } = useLocale();

const phoneInputProps = {
  'country-icon-mode': 'svg',
  'countryLabel': t('countryLabel'),
  'guess-country': true,
  'include-countries': ['pl', 'gb', 'ru', 'de', 'us', 'es', 'fr', 'it'],
};

const mergedPhoneInputProps = {
  ...phoneInputProps,
  ...props.schema.phoneInputProps,
};

const localModel = computed({
  get(): string {
    return getValueFromModel(props.model, props.schema);
  },
  set(val: any) {
    produceUpdateEvent(val, props.schema);
  },
});

// TODO - https://github.com/paul-thebaud/v-phone-input/issues/21

</script>


<style scoped lang='css'>

</style>
