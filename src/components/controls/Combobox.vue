<template>
  <base-combobox
    v-model="localModel"
    v-model:search="query"
    :auto-select-first="true"
    :class="bindClass(schema) + requiredInputClass"
    :item-title="title"
    :item-value="returnObject ? value : title"
    :items="data"
    :label="label"
    :lazy="lazy"
    :loading="loading"
    :no-filter="true"
    :options="paginationOptions"
    :return-object="returnObject as any"
    :rules="!fieldProps.readonly ? rules : []"
    v-bind="{ ...fieldProps, clearable: !fieldProps.readonly }"
    @click="fetchDictionaryData"
    @loadMoreRecords="loadMoreRecords"
    @update:modelValue="onChange(schema, model)"
    @update:search="updateSearch"
  >
    <template #no-data>
      <v-list-item v-if="loading">
        <v-progress-linear
          color="primary"
          indeterminate
        ></v-progress-linear>
      </v-list-item>
      <v-list-item
        v-else
        :title="t('noData')"
      />
    </template>
    <template
      v-if="description !== null"
      #item="{ item, props }"
    >
      <v-list-item
        :subtitle="item.raw[description]"
        :title="item.title"
        v-bind="props"
      >
      </v-list-item>
    </template>
  </base-combobox>
</template>

<script lang="ts" setup>
import { computed, onMounted, watch } from 'vue';

import BaseCombobox from '@/components/controls/base/BaseCombobox.vue';

import { useDictionary } from '@/core/composables/useDictionary';
import { useEventHandler } from '@/core/composables/useEventHandler';
import { variableRegexp } from '@/core/engine/utils';
import { EngineDictionaryField } from '@/types/engine/controls';

import {
  useClass,
  useFormModel,
  useLabel,
  useLocale,
  useProps,
  useResolveVariables,
  useRules,
} from '../../core/composables';

const props = defineProps<{
  schema: EngineDictionaryField;
  model: object;
}>();
const { t } = useLocale();
const { label, bindLabel } = useLabel(props.schema);
const { fieldProps, bindProps } = useProps();
const { bindRules, rules, requiredInputClass } = useRules();
const { bindClass } = useClass();
const { getValue, setValue } = useFormModel();
const { onChange } = useEventHandler();
const { resolve } = useResolveVariables();

const localModelCurrent = computed(() =>
  localModel.value ? (returnObject.value ? localModel.value[title.value] : localModel.value) : null,
);
const localModel = computed({
  get(): any {
    return getValue(props.model, props.schema);
  },
  set(val: any) {
    setValue(val, props.schema);
  },
});

const {
  title,
  value,
  loading,
  data,
  returnObject,
  description,
  query,
  lazy,
  paginationOptions,
  load,
  loadMoreRecords,
  singleOptionAutoSelect,
  initState,
  queryBlocker,
  loadCounter,
  dependencyWasChanged,
} = useDictionary();

function singleOptionAutoSelectFunction() {
  const selectSingleOptionLogic = () => {
    if (data.value.length !== 1 || !singleOptionAutoSelect.value || loadCounter.value > 1) return;
    const selectedValue = returnObject.value ? data.value[0] : data.value[0][title.value];

    if (JSON.stringify(localModel.value) !== JSON.stringify(selectedValue)) {
      localModel.value = selectedValue;
    }
  };
  selectSingleOptionLogic();
  watch(data, selectSingleOptionLogic, { deep: true, immediate: true });
}

async function resolveIfLocalModelHasDependencies() {
  if (typeof localModel.value == 'string' && localModel.value.match(variableRegexp)) {
    const result = await resolve(props.schema, localModel.value);
    if (result.allVariablesResolved) {
      localModel.value = result.resolvedText;
    }
  }
}

watch(dependencyWasChanged, () => {
  if (dependencyWasChanged.value) {
    localModel.value = null;
  }
});

onMounted(async () => {
  await initState(props.schema);
  await bindLabel(props.schema);
  await bindProps(props.schema);
  await bindRules(props.schema);

  if (localModel.value) {
    if (typeof localModel.value == 'object') {
      data.value.push(localModel.value);
    } else {
      await resolveIfLocalModelHasDependencies();
      if (!fieldProps.value.readonly) {
        query.value = localModel.value;
        queryBlocker.value = true;
      }
    }
  }
  singleOptionAutoSelectFunction();
});

async function fetchDictionaryData() {
  if (!fieldProps.value.readonly) {
    console.debug(
      `[vue-focus] => items.size = ${data.value.length}, localModel = ${localModel.value}, query = ${query.value}`,
    );

    if (!returnObject.value) {
      queryBlocker.value = query.value === localModelCurrent.value;
    }

    await load('autocomplete');
  }
}

function updateSearch(val: string) {
  if (returnObject.value) {
    queryBlocker.value = val === localModelCurrent.value;
  } else {
    queryBlocker.value = false;
  }
}
</script>

<style lang="css" scoped></style>

<i18n lang="json">
{
  "en": {
    "noData": "No data available."
  },
  "pl": {
    "noData": "Brak danych."
  }
}
</i18n>
