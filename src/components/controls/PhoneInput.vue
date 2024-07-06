<template>
  <v-phone-input
    :class="bindClass(schema)"
    :label="label"
    v-model="localModel"
    :invalid-message="(options: any) => t('phoneInvalid', { example: options.example })"
    :country-props="bindProps(schema)"
    :phone-props="bindProps(schema)"
    v-bind="mergedPhoneInputProps"
    :rules="rules(schema)"
    name='phone'
    type='tel'
  >
  </v-phone-input>
</template>

<script setup lang="ts">
import "flag-icons/css/flag-icons.min.css";
import "v-phone-input/dist/v-phone-input.css";
import { VPhoneInput } from "v-phone-input";
import { computed } from "vue";

import { EnginePhoneField } from "@/types/engine/controls";

import { useClass, useFormModel, useLabel, useLocale, useProps, useRules } from "../../core/composables";

const props = defineProps<{
  schema: EnginePhoneField;
  model: object;
}>();

const { label } = useLabel(props.schema);
const { rules } = useRules();
const { bindClass } = useClass();
const { bindProps } = useProps();
const { t } = useLocale();
const { getValue, setValue } = useFormModel();

const phoneInputProps = {
  "country-icon-mode": "svg",
  countryLabel: t("address.country"),
  "guess-country": true,
  "include-countries": ["pl", "gb", "ru", "de", "us", "es", "fr", "it"],
};

const mergedPhoneInputProps = {
  ...phoneInputProps,
  ...props.schema.phoneInputProps,
};

const localModel = computed({
  get(): string {
    return getValue(props.model, props.schema);
  },
  set(val: any) {
    setValue(val, props.schema);
  },
});
</script>

<style scoped lang="css"></style>
