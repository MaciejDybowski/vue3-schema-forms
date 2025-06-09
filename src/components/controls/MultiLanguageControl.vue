<template>
  <div
    v-if="!loading"
    class="controls-container"
  >
    <v-select
      v-model="selectedLang"
      :class="bindClass(schema) + requiredInputClass + `lang-select`"
      :items="languages"
      :rules="!fieldProps.readonly ? rules : []"
      item-title="name"
      item-value="code"
      label="Lang"
      v-bind="fieldProps"
    >
      <template #item="{ props, item }">
        <v-list-item v-bind="props">
          <template #prepend>
            <span class="v-phone-input__country__icon f32">
              <span :class="['flag', `${item.raw.flag}`]"></span>
            </span>
          </template>
        </v-list-item>
      </template>

      <template #selection="{ item }">
        <span class="v-phone-input__country__icon f32">
          <span :class="['flag', `${item.raw.flag}`]"></span>
        </span>
      </template>
    </v-select>
    <v-text-field
      v-model="localModel[selectedLang]"
      :class="bindClass(schema) + requiredInputClass"
      :label="label"
      :rules="!fieldProps.readonly ? rules : []"
      v-bind="fieldProps"
    />
  </div>
</template>

<script lang="ts" setup>
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
import { AvailableLanguage } from '@/types/engine/AvailableLanguage';
import { EngineMultiLanguageField } from '@/types/engine/MultiLanguageField';

const { schema, model } = defineProps<{
  schema: EngineMultiLanguageField;
  model: object;
}>();

const { bindClass } = useClass();
const { bindRules, rules, requiredInputClass } = useRules();
const { bindProps, fieldProps } = useProps();
const { label, bindLabel } = useLabel(schema);
const { getValue, setValue } = useFormModel();
const { locale } = useLocale();

const localModel = computed({
  get(): any {
    const value = getValue(model, schema);
    if (value == null) {
    } else {
      return value;
    }
  },
  set(val: any) {
    setValue(val, schema);
  },
});

const languages = (schema.availableLanguages ?? schema.options?.availableLanguages ?? []).map(
  ({ name, code }: AvailableLanguage) => ({
    name,
    code,
    flag: getLocalePartAfterDash(code),
  }),
);

const selectedLang = ref('pl');

function getLocalePartAfterDash(lang: string) {
  if (lang.includes('-')) {
    return lang.split('-')[1].toLowerCase();
  }
  return lang;
}

const loading = ref(true);

onMounted(async () => {
  await bindLabel(schema);
  await bindRules(schema);
  await bindProps(schema);

  selectedLang.value =
    localModel.value && Object.keys(localModel.value).includes(locale.value)
      ? locale.value
      : languages.some((item: AvailableLanguage) => item.code == locale.value)
        ? locale.value
        : 'en-US';
  if (localModel.value == null) {
    localModel.value = { [selectedLang.value]: '' };
  }

  loading.value = false;
});
</script>

<style lang="css" scoped>
.controls-container {
  display: flex;

  .lang-select {
    width: 96px;
    min-width: 96px;
    max-width: 96px;
    flex-shrink: 0;
  }
}
</style>
