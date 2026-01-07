<template>
  <div
    v-for="(item, index) in items"
    :key="item.valueMapping"
    v-bind="attrs"
  >
    <v-textarea
      v-if="item.type == 'TEXTAREA' && shouldRenderMap[item.valueMapping]"
      ref="tableCellTextInput"
      :auto-grow="true"
      :class="`${item.class}`"
      :label="item.label"
      :max-rows="3"
      :model-value="getValue(item.valueMapping, index)"
      :rows="3"
      :rules="rulesMap[item.valueMapping]"
      v-bind="{
        ...attrs,
        density: 'compact',
        readonly: shouldReadonlyMap[item.valueMapping] || attrs.readonly === true,
      }"
      width="100%"
      @input="(e: any) => updateValue(e, item)"
      @keyup.enter="(e: any) => e.target.blur()"
    />

    <v-text-field
      v-if="item.type == 'TEXT' && shouldRenderMap[item.valueMapping]"
      ref="tableCellTextInput"
      :class="`${item.class}`"
      :label="item.label"
      :model-value="getValue(item.valueMapping, index)"
      :rules="rulesMap[item.valueMapping]"
      v-bind="{
        ...attrs,
        density: 'compact',
        readonly: shouldReadonlyMap[item.valueMapping] || attrs.readonly === true,
      }"
      width="100%"
      @input="(e: any) => updateValue(e, item)"
      @keyup.enter="(e: any) => e.target.blur()"
    />

    <v-text-field
      v-if="item.type == 'NUMBER' && shouldRenderMap[item.valueMapping]"
      :class="[
        (item.validations && item.validations.length > 0) || items.length <= 1
          ? `content-right ${item.class}`
          : `pb-4 content-right ${item.class}`,
      ]"
      :label="item.label"
      :model-value="getValue(item.valueMapping, index)"
      :rules="rulesMap[item.valueMapping]"
      v-bind="{
        ...attrs,
        density: 'compact',
        readonly: shouldReadonlyMap[item.valueMapping] || attrs.readonly === true,
      }"
      width="100%"
      @focusin="showFormattedNumber[index] = false"
      @focusout="focusOut(index, item)"
      @input="(e: any) => updateValue(e, item)"
      @keyup.enter="(e: any) => e.target.blur()"
    />

    <v-select
      v-if="item.type == 'SELECT' && shouldRenderMap[item.valueMapping]"
      :class="`${item.class}`"
      :clearable="!shouldReadonlyMap[item.valueMapping]"
      :item-title="getItemTitle(item.valueMapping)"
      :item-value="getItemValue(item.valueMapping)"
      :items="getItemsForSelect(item, row)"
      :label="item.label"
      :model-value="getValue(item.valueMapping, index)"
      :return-object="getReturnObjectFlag(item.valueMapping)"
      :rules="rulesMap[item.valueMapping]"
      v-bind="{
        ...attrs,
        density: 'compact',
        readonly: shouldReadonlyMap[item.valueMapping] || attrs.readonly === true,
      }"
      width="100%"
      @keyup.enter="(e: any) => e.target.blur()"
      @update:model-value="(e: any) => emitData(e, item)"
    />

    <dictionary-base
      v-if="item.type == 'DICTIONARY' && shouldRenderMap[item.valueMapping]"
      v-model:search="query"
      :auto-select-first="false"
      :class="`${item.class}`"
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
      v-bind="{
        ...attrs,
        density: 'compact',
        readonly: shouldReadonlyMap[item.valueMapping] || attrs.readonly === true,
      }"
      width="100%"
      @click="loadDataForDictionary(item)"
      @loadMoreRecords="loadMoreRecordsForDictionary(item)"
      @keyup.enter="(e: any) => e.target.blur()"
      @update:model-value="(e: any) => onDictionarySelect(e, item)"
      @update:search="(e: string) => updateSearch(e, item, index)"
    />
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import jsonata from 'jsonata';
import { debounce } from 'lodash';
import get from 'lodash/get';

import { computed, nextTick, onMounted, ref, useAttrs, watch, watchEffect } from 'vue';

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
const { resolve, fillPath } = useResolveVariables();

async function updateValue(e: any, item: HeaderEditableObject) {
  const rules = rulesMap.value[item.valueMapping] || [];

  async function areAllValid(value: any) {
    for (const rule of rules) {
      const result = await rule(value);
      if (result !== true) return false;
    }
    return true;
  }

  const isValid = await areAllValid(e.target.value);

  let inputValue = e.target.value;
  if (item.type == 'NUMBER') {
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
  // invoicePrice:0:NUMBER:2
  const split = valueMapping.split(':');
  let variable = split[0];
  const defaultValue = split.length >= 2 ? split[1] : null;
  const typeOfValue = split.length >= 3 ? split[2] : null;
  const formatterProps = split.length == 4 ? split[3] : (null as any);

  let value: any = get(props.row, variable, null);

  if (typeOfValue == 'NUMBER' && showFormattedNumber.value[index]) {
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

const showFormattedNumber = ref<Array<boolean>>([]);
watchEffect(() => {
  showFormattedNumber.value = new Array(props.items.length).fill(true);
});

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

// TODO - przytrzymywanie tutaj strzałek nie działa bo jest aktualizacja całego wiersza i robi się jakiś breakdown/lag
function emitData(e: any, item: HeaderEditableObject) {
  emit('update:field', { value: e, header: item });
}

function getItemsForSelect(item: any, row: any) {
  const split = item.valueMapping.split(':');
  let path = split[1];
  if (path == 'source') {
    return item.source || [];
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

  //console.debug(`Index pola = ${props.rowIndex}`)

  const endpoint = await resolve(modifiedField as any, split[1], true, getItemTitle(valueMapping));

  if (!endpoint.allVariablesResolved) {
    dictData.value = [];
    paginationOptions.value.setTotalElements(0);
  }

  return endpoint;
}

/* Dla wyrażen jsonata bo z racji ze to generuje w petli to nie podepne funckji asynchronicznej w template */
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

const dictData = ref([]);
const paginationOptions = ref(new Pagination(50));
const query = ref();
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

  // v-autocomplete zaraz ustawi search → ignorujemy ten tick
  nextTick(() => {
    isSelecting.value = false;
  });
}

async function updateSearch(val: string, item: any, index: number) {
  if (isSelecting.value) return; // po wyborze
  if (!val) return; // pusty input

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
