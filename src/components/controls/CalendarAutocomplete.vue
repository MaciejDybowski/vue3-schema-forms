<template>
  <v-autocomplete
    v-model="localModel"
    :auto-select-first="false"
    :class="bindClass(schema) + requiredInputClass"
    :item-title="title"
    :item-value="returnObject ? value : title"
    :items="data"
    :label="label"
    :loading="loading"
    :return-object="returnObject as any"
    :rules="!fieldProps.readonly ? rules : []"
    component="v-autocomplete"
    v-bind="{ ...fieldProps, clearable: !fieldProps.readonly }"
    @click="fetchDictionaryData"
  >
    <template #item="{ item, props }">
      <v-list-item
        v-bind="{
          ...props,
          title: getTranslatedTitle(item.raw.name),
          subtitle: item.raw.type,
        }"
      >
        <template #prepend>
          <v-avatar
            :style="{ backgroundColor: item.raw.color }"
            size="18"
          ></v-avatar>
        </template>
      </v-list-item>
    </template>

    <template #selection="{ item }">
      <div class="d-flex align-center ga-2">
        <v-avatar
          :style="{ backgroundColor: item.raw.color }"
          size="18"
        ></v-avatar>
        <span>
          {{ getTranslatedTitle(item.raw.name) }}
          — <small>{{ item.raw.type }}</small>
        </span>
      </div>
    </template>
  </v-autocomplete>
</template>

<script lang="ts" setup>
import axios from 'axios';

import { computed, onMounted, ref } from 'vue';

import { BuiltInTranslationLanguages } from '@/components/controls/dictionary/DictionaryItemChip.vue';

import {
  useClass,
  useFormModel,
  useLabel,
  useLocale,
  useProps,
  useRules,
  useSource,
} from '@/core/composables';
import { EngineDictionaryField } from '@/types/engine/controls';

const { schema, model } = defineProps<{
  schema: EngineDictionaryField;
  model: object;
}>();

const { bindClass } = useClass();
const { bindRules, rules, requiredInputClass } = useRules();
const { getValue, setValue } = useFormModel();
const { bindProps, fieldProps } = useProps();
const { label, bindLabel } = useLabel(schema);
const { locale } = useLocale();
const { title, value, loading, data, returnObject, multiple } = useSource(schema.source);

const localModel = computed({
  get(): any {
    return getValue(model, schema);
  },
  set(val: any) {
    setValue(val, schema);
  },
});

async function fetchDictionaryData() {
  if (!fieldProps.value.readonly) {
    await loadData();
  }
}

async function loadData() {
  try {
    loading.value = true;
    const url = schema.source.url;
    const response = await axios.get(url);
    data.value = response.data;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
}

const internalStateIsSet = ref(false);

function getTranslatedTitle(title: string | BuiltInTranslationLanguages) {
  if (typeof title === 'string') {
    return title;
  } else {
    return title[locale.value] ? title[locale.value] : title.default;
  }
}

onMounted(async () => {
  internalStateIsSet.value = false;
  await bindLabel(schema);
  await bindRules(schema);
  await bindProps(schema);

  internalStateIsSet.value = true;
});
</script>
