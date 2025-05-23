<template>
  <base-autocomplete
    v-model="localModel"
    v-model:search="query"
    :auto-select-first="false"
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
      <!-- etykiety -->
      <!-- kolorwanie pól może tutaj na podstawie warunku w ramach item -->
      <v-list-item
        :subtitle="item.raw[description]"
        :title="item.title"
        v-bind="props"
      >
      </v-list-item>
    </template>

    <template
      v-if="labels.length > 0"
      #item="{ item, props }"
    >
      <v-list-item
        :subtitle="item.raw[description]"
        :title="item.title"
        v-bind="props"
      >
        <template #append>
          <div v-if="labels.length > 0">
            <!-- todo zmienić nazwę komponentu skoro slownik tez juz moze -->
            <user-input-label
              v-for="element in labels(item.raw)"
              :key="element.id"
              :element="element"
              v-bind="$attrs"
              variant="flat"
            />
          </div>
        </template>
      </v-list-item>
    </template>
  </base-autocomplete>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';

import UserInputLabel from '@/components/controls/user-input/UserInputLabel.vue';

import { useDictionary } from '@/core/composables/useDictionary';
import { useEventHandler } from '@/core/composables/useEventHandler';
import { variableRegexp } from '@/core/engine/utils';
import { Label } from '@/types/engine/Label';
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
import BaseAutocomplete from './base/BaseAutocomplete.vue';

const props = defineProps<{
  schema: EngineDictionaryField;
  model: object;
}>();
const { t } = useLocale();
const { label, bindLabel } = useLabel(props.schema);
const { bindClass } = useClass();
const { bindRules, rules, requiredInputClass } = useRules();
const { bindProps, fieldProps } = useProps();
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
  queryBlocker,
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
  if (dependencyWasChanged.value && internalStateIsSet.value) {
    localModel.value = null;
  }
});

const internalStateIsSet = ref(false);

onMounted(async () => {
  internalStateIsSet.value = false;
  await initState(props.schema);
  await bindLabel(props.schema);
  await bindRules(props.schema);
  await bindProps(props.schema);

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
  internalStateIsSet.value = true;
  //console.debug(`[vue-mounted] => items.size = ${data.value.length}, localModel = ${localModel.value}, query = ${query.value}`);
});

async function fetchDictionaryData() {
  if (!fieldProps.value.readonly) {
    //console.debug(`[vue-focus] => items.size = ${data.value.length}, localModel = ${localModel.value}, query = ${query.value}`);
    if (!returnObject.value) {
      queryBlocker.value = query.value === localModelCurrent.value;
    }
    await load('autocomplete');
  }
}

function updateSearch(val: string) {
  if (returnObject.value) {
    queryBlocker.value = val === localModelCurrent.value + '';
  } else {
    queryBlocker.value = false;
  }
}

function labels(item: any): Label[] {
  if ('labels' in item) {
    const providedLabels: Label[] =
      props.schema.options.dictionaryProps && props.schema.options.dictionaryProps.labels
        ? props.schema.options.dictionaryProps.labels
        : [];

    // array ['labelId', 'labelId2']
    if (Array.isArray(item.labels)) {
      if (providedLabels.length > 0) {
        const userLabels: string[] = item.labels;
        return providedLabels.filter((element) => userLabels.includes(element.id));
      } else {
        return item.labels.map((id: string) => ({
          id: id,
          title: id,
          backgroundColor: 'primary',
          textColor: 'white',
        }));
      }
    }

    // string separated by coma
    if (item.labels && item.labels.includes(',')) {
      const labels = item.labels.split(',');
      if (providedLabels.length > 0) {
        return providedLabels.filter((element) => labels.includes(element.id));
      } else {
        return labels.map((id: string) => ({
          id: id,
          title: id,
          backgroundColor: 'primary',
          textColor: 'white',
        }));
      }
    }
    // one string = label
    else if (item.labels) {
      if (providedLabels.length > 0) {
        return providedLabels.filter((element) => element.id == item.labels);
      } else {
        return [
          {
            id: item.labels,
            title: item.labels,
            backgroundColor: 'primary',
            textColor: 'white',
          },
        ];
      }
    }

    return [];
  } else {
    return [];
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
