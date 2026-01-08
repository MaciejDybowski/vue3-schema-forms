<template>
  <div
    v-for="(item, index) in props.items"
    :key="`${item.valueMapping}-${index}`"
    v-bind="attrs"
  >
    <v-textarea
      v-if="item.type === 'TEXTAREA' && shouldRenderMap[item.valueMapping]"
      ref="tableCellTextInput"
      :auto-grow="true"
      :class="item.class"
      :label="item.label"
      :max-rows="3"
      :model-value="getValue(item.valueMapping, index)"
      :rows="3"
      :rules="rulesMap[item.valueMapping]"
      v-bind="boundAttrsMap[item.valueMapping]"
      width="100%"
      @input="handlersMap[item.valueMapping]?.input"
      @keyup.enter="handlersMap[item.valueMapping]?.keyupEnter"
    />

    <v-text-field
      v-if="item.type === 'TEXT' && shouldRenderMap[item.valueMapping]"
      ref="tableCellTextInput"
      :class="item.class"
      :label="item.label"
      :model-value="getValue(item.valueMapping, index)"
      :rules="rulesMap[item.valueMapping]"
      v-bind="boundAttrsMap[item.valueMapping]"
      width="100%"
      @input="handlersMap[item.valueMapping]?.input"
      @keyup.enter="handlersMap[item.valueMapping]?.keyupEnter"
    />

    <v-text-field
      v-if="item.type === 'NUMBER' && shouldRenderMap[item.valueMapping]"
      :class="[
        (item.validations && item.validations.length > 0) || props.items.length <= 1
          ? `content-right ${item.class}`
          : `pb-4 content-right ${item.class}`,
      ]"
      :label="item.label"
      :model-value="getValue(item.valueMapping, index)"
      :rules="rulesMap[item.valueMapping]"
      v-bind="boundAttrsMap[item.valueMapping]"
      width="100%"
      @focusin="handlersMap[item.valueMapping]?.focusIn"
      @focusout="handlersMap[item.valueMapping]?.focusOut"
      @input="handlersMap[item.valueMapping]?.input"
      @keyup.enter="handlersMap[item.valueMapping]?.keyupEnter"
    />

    <v-select
      v-if="item.type === 'SELECT' && shouldRenderMap[item.valueMapping]"
      :class="item.class"
      :clearable="!shouldReadonlyMap[item.valueMapping]"
      :item-title="getItemTitle(item.valueMapping)"
      :item-value="getItemValue(item.valueMapping)"
      :items="getItemsForSelect(item, props.row)"
      :label="item.label"
      :model-value="getValue(item.valueMapping, index)"
      :return-object="getReturnObjectFlag(item.valueMapping)"
      :rules="rulesMap[item.valueMapping]"
      v-bind="boundAttrsMap[item.valueMapping]"
      width="100%"
      @keyup.enter="handlersMap[item.valueMapping]?.keyupEnter"
      @update:model-value="handlersMap[item.valueMapping]?.selectUpdate"
    />

    <dictionary-base
      v-if="item.type === 'DICTIONARY' && shouldRenderMap[item.valueMapping]"
      v-model:search="query"
      :auto-select-first="false"
      :class="item.class"
      :clearable="!shouldReadonlyMap[item.valueMapping]"
      :item-title="getItemTitle(item.valueMapping)"
      :item-value="getItemValue(item.valueMapping)"
      :items="dictData"
      :label="item.label"
      :lazy="true"
      :model-value="getValue(item.valueMapping, index)"
      :multiple="false"
      :no-filter="true"
      :options="paginationOptions"
      :return-object="getReturnObjectFlag(item.valueMapping)"
      :rules="rulesMap[item.valueMapping]"
      component="v-autocomplete"
      v-bind="boundAttrsMap[item.valueMapping]"
      width="100%"
      @click="handlersMap[item.valueMapping]?.load"
      @loadMoreRecords="handlersMap[item.valueMapping]?.loadMore"
      @keyup.enter="handlersMap[item.valueMapping]?.keyupEnter"
      @update:model-value="handlersMap[item.valueMapping]?.dictionarySelect"
      @update:search="handlersMap[item.valueMapping]?.updateSearch"
    />
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import jsonata from 'jsonata';
import { debounce } from 'lodash';
import get from 'lodash/get';

import { computed, nextTick, onMounted, ref, useAttrs, watch } from 'vue';

import DictionaryBase from '@/components/controls/dictionary/DictionaryBase.vue';
import { Pagination } from '@/components/controls/dictionary/Pagination';
import { mapSliceTotalElements } from '@/components/controls/dictionary/SliceResponse';

import { useResolveVariables } from '@/core/composables';
import { useNumber } from '@/core/composables/useNumber';
import { EngineField } from '@/types/engine/EngineField';
import { SchemaSimpleValidation } from '@/types/shared/SchemaSimpleValidation';
import type { HeaderEditableObject, TableHeader } from '@/types/shared/Source';

const props = defineProps<{
  header: TableHeader;
  items: HeaderEditableObject[];
  row: object;
  schema: EngineField;
  rowIndex: number;
}>();
const emit = defineEmits<{
  (e: 'update:field', val: { value: any; header: HeaderEditableObject }): void;
  (e: 'refresh:table'): void;
}>();

const attrs = useAttrs();
const { formattedNumber } = useNumber();
const { resolve } = useResolveVariables();

async function updateValue(e: any, item: HeaderEditableObject) {
  const rules = rulesMap.value[item.valueMapping] || [];

  async function areAllValid(value: any) {
    for (const rule of rules) {
      const result = await rule(value);
      if (result !== true) return false;
    }
    return true;
  }

  // handle both DOM event and direct value emit
  const raw = e?.target?.value !== undefined ? e.target.value : e;
  const isValid = await areAllValid(raw);

  let inputValue = raw;
  if (item.type === 'NUMBER') {
    let value = (inputValue + '').replaceAll(',', '.');
    inputValue = parseFloat(value);
  }

  if (isValid) {
    emit('update:field', {
      value: inputValue,
      header: item,
    });
  }
}

function getValue(valueMapping: string, index: number) {
  const split = valueMapping.split(':');
  let variable = split[0];
  const typeOfValue = split.length >= 3 ? split[2] : null;
  const formatterProps = split.length == 4 ? split[3] : (null as any);

  let value: any = get(props.row, variable, null);

  if (typeOfValue === 'NUMBER' && showFormattedNumber.value[index]) {
    let decimalPlaces = 4;
    if (isNaN(formatterProps)) {
      decimalPlaces = get(props.row, formatterProps, 2);
    } else {
      decimalPlaces = formatterProps;
    }
    value = formattedNumber(value, 'decimal', decimalPlaces, decimalPlaces);
    return value;
  }

  return value;
}

const showFormattedNumber = ref<boolean[]>([]);
watch(
  () => props.items.length,
  (len) => {
    showFormattedNumber.value = new Array(len).fill(true);
  },
  { immediate: true },
);

function getItemTitle(valueMapping: string) {
  const split = valueMapping.split(':');
  return split.length >= 3 ? split[2] : 'title';
}

function getItemValue(valueMapping: string) {
  const split = valueMapping.split(':');
  return split.length >= 4 ? split[3] : 'value';
}

function getReturnObjectFlag(valueMapping: string): boolean {
  const split = valueMapping.split(':');
  if (split.length < 5) return false;
  return split[4].toLowerCase() === 'true';
}

function emitData(e: any, item: HeaderEditableObject) {
  emit('update:field', { value: e, header: item });
}

function getItemsForSelect(item: any, row: any) {
  const split = item.valueMapping.split(':');
  let path = split[1];
  if (item[path] !== undefined && Array.isArray(item[path])) {
    return item[path] || [];
  }

  return get(row, path, []);
}

async function getItemsUrlForDictionary(
  valueMapping: string,
): Promise<{ resolvedText: string; allVariablesResolved: boolean }> {
  const split = valueMapping.split(':');

  const modifiedField = {
    ...props.schema,
    index: props.rowIndex,
    path: props.schema.key,
  };

  const endpoint = await resolve(modifiedField as any, split[1], true, getItemTitle(valueMapping));

  if (!endpoint.allVariablesResolved) {
    dictData.value = [];
    paginationOptions.value.setTotalElements(0);
  }

  return endpoint;
}

/* maps */
const shouldRenderMap = ref<Record<string, boolean>>({});
const shouldReadonlyMap = ref<Record<string, boolean>>({});
const rulesMap = ref<Record<string, any[]>>({});

async function computeRulesForField(items: HeaderEditableObject[]) {
  const newMap: Record<string, any[]> = {};
  for (const item of items) {
    let rules: any[] = [];

    item.validations?.forEach((ruleDefinition: SchemaSimpleValidation) => {
      rules.push(async (value: any) => {
        const nata = jsonata(ruleDefinition.rule as string);

        const tempRow = {
          ...props.row,
          [item.valueMapping]: value,
        };
        const conditionResult = await nata.evaluate(tempRow);

        if (conditionResult) return true;
        return ruleDefinition.message;
      });
    });
    newMap[item.valueMapping] = rules;
  }
  rulesMap.value = newMap;
}

async function computeShouldRender(items: HeaderEditableObject[]) {
  const newMap: Record<string, boolean> = {};

  for (const item of items) {
    if (item.condition) {
      const nata = jsonata(item.condition);
      newMap[item.valueMapping] = await nata.evaluate(props.row);
    } else {
      newMap[item.valueMapping] = true;
    }
  }

  shouldRenderMap.value = newMap;
}

async function computeShouldReadonly(items: HeaderEditableObject[]) {
  const newMap: Record<string, boolean> = {};

  for (const item of items) {
    if (item.readonly) {
      const nata = jsonata(item.readonly);
      newMap[item.valueMapping] = await nata.evaluate(props.row);
    } else {
      newMap[item.valueMapping] = false;
    }
  }
  shouldReadonlyMap.value = newMap;
}

const hasConditionVisibility = computed(() => {
  return props.items.some((item) => !!item.condition);
});

const hasConditionReadonly = computed(() => {
  return props.items.some((item) => !!item.readonly);
});

const hasValidations = computed(() => {
  return props.items.some((item) => !!item.validations);
});

/* dictionary */
const dictData = ref<any[]>([]);
const paginationOptions = ref(new Pagination(50));
const query = ref<string | undefined>();
const debounced = {
  load: debounce(loadDataForDictionary, 200),
};
const isSelecting = ref(false);

function onDictionarySelect(e: any, item: HeaderEditableObject) {
  isSelecting.value = true;

  emit('update:field', {
    value: e,
    header: item,
  });

  nextTick(() => {
    isSelecting.value = false;
  });
}

async function updateSearch(val: string, item: any, index: number) {
  if (isSelecting.value) return;
  if (!val) return;

  const currentValue = getValue(item.valueMapping, index);
  const returnObject = getReturnObjectFlag(item.valueMapping);

  if (returnObject) {
    const titleKey = getItemTitle(item.valueMapping);
    if (currentValue && currentValue[titleKey] === val) return;
  } else {
    if (currentValue === val) return;
  }

  debounced.load(item, true);
}

async function loadDataForDictionary(item: any, addQuery: boolean = false) {
  try {
    const endpoint = await getItemsUrlForDictionary(item.valueMapping);
    if (!endpoint.allVariablesResolved) return;

    paginationOptions.value.resetPage();
    const response = await axios.get(endpoint.resolvedText, {
      params: {
        page: paginationOptions.value.getPage(),
        size: paginationOptions.value.getItemsPerPage(),
        query: addQuery ? query.value : undefined,
      },
    });
    dictData.value = response.data.content;
    paginationOptions.value.setTotalElements(mapSliceTotalElements(response.data));
  } catch (e) {
    console.error(e);
  }
}

async function loadMoreRecordsForDictionary(item: any, addQuery: boolean = false) {
  try {
    const endpoint = await getItemsUrlForDictionary(item.valueMapping);
    const response = await axios.get(endpoint.resolvedText, {
      params: {
        page: paginationOptions.value.getPage() + 1,
        size: paginationOptions.value.getItemsPerPage(),
        query: addQuery ? query.value : null,
      },
    });
    paginationOptions.value.nextPage();
    dictData.value = dictData.value.concat(response.data.content);
    paginationOptions.value.setTotalElements(mapSliceTotalElements(response.data));
  } catch (e) {
    console.error(e);
  }
}

function focusOut(index: number, item: HeaderEditableObject) {
  showFormattedNumber.value[index] = true;

  const isDefinedRefreshCode = item.valueMapping.split(':').length > 4;
  if (isDefinedRefreshCode) {
    emit('refresh:table');
  }
}

/* precomputed bound attrs per item to avoid creating objects in template */
const boundAttrsMap = computed(() => {
  const map: Record<string, Record<string, any>> = {};
  const rawReadonly = (attrs as Record<string, any>).readonly;
  // treat as readonly only if explicitly present and not explicit false/'false'
  const rootReadonly =
    rawReadonly !== undefined && rawReadonly !== false && rawReadonly !== 'false';

  for (const item of props.items) {
    map[item.valueMapping] = {
      ...(attrs as Record<string, any>),
      density: 'compact',
      readonly: !!shouldReadonlyMap.value[item.valueMapping] || rootReadonly,
    };
  }
  return map;
});

/* handlers map to avoid inline functions in template */
const handlersMap = computed(() => {
  const m: Record<
    string,
    {
      input?: (e: any) => void;
      selectUpdate?: (e: any) => void;
      dictionarySelect?: (e: any) => void;
      updateSearch?: (e: any) => void;
      load?: () => void;
      loadMore?: () => void;
      focusIn?: () => void;
      focusOut?: () => void;
      keyupEnter?: (e: any) => void;
    }
  > = {};

  props.items.forEach((item, index) => {
    const key = item.valueMapping;
    m[key] = {
      input: (e: any) => updateValue(e, item),
      selectUpdate: (e: any) => emitData(e, item),
      dictionarySelect: (e: any) => onDictionarySelect(e, item),
      updateSearch: (e: any) => updateSearch(e, item, index),
      load: () => loadDataForDictionary(item),
      loadMore: () => loadMoreRecordsForDictionary(item),
      focusIn: () => (showFormattedNumber.value[index] = false),
      focusOut: () => focusOut(index, item),
      keyupEnter: (e: any) => e?.target?.blur?.(),
    };
  });

  return m;
});

/* lifecycle: compute maps once and on row changes only when needed */
onMounted(async () => {
  await computeShouldReadonly(props.items);
  await computeShouldRender(props.items);
  await computeRulesForField(props.items);

  if (hasConditionVisibility.value || hasConditionReadonly.value || hasValidations.value) {
    watch(
      () => props.row,
      async () => {
        await computeShouldReadonly(props.items);
        await computeShouldRender(props.items);
        await computeRulesForField(props.items);
      },
      { deep: true },
    );
  }
});
</script>

<style scoped>
.content-right :deep(input) {
  text-align: right;
}

.content-center :deep(input) {
  text-align: center;
}

.content-left :deep(input) {
  text-align: left;
}
</style>
