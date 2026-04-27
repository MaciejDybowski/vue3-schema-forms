<template>
  <div
    class="choice-dictionary-root"
    :class="bindClass(schema) + requiredInputClass"
  >
    <label
      v-if="label"
      class="v-label"
    >
      {{ label }}
    </label>

    <v-alert
      v-if="overflow"
      type="warning"
      variant="tonal"
      density="compact"
      class="mb-2"
    >
      {{ t('dictionary.warningAboutEffectiveLimit', { effectiveLimit: effectiveLimit }) }}
    </v-alert>

    <div v-if="!loading && multiple">
      <template
        v-for="(option, index) in data"
        :key="option[valueKey]"
      >
        <v-checkbox
          :ref="index === data.length - 1 ? 'inputRef' : undefined"
          v-model="localModel"
          :disabled="disabled(fieldProps.disabled, option.disabled)"
          :hide-details="index === data.length - 1 ? 'auto' : true"
          :label="option[titleKey]"
          :rules="activeRules"
          :value="option[valueKey]"
          v-bind="fieldProps"
        >
          <template #message="{ message }">
            <div class="ml-4">{{ message }}</div>
          </template>
        </v-checkbox>
      </template>
    </div>

    <v-radio-group
      v-else-if="!loading"
      ref="inputRef"
      v-model="localModel"
      :rules="activeRules"
      v-bind="fieldProps"
    >
      <template
        v-for="(option, index) in data"
        :key="option[valueKey]"
      >
        <v-radio
          :value="option[valueKey]"
          :class="index !== data.length - 1 && !fieldProps.inline ? 'mb-2' : ''"
          v-bind="fieldProps"
        >
          <template #label>
            <div class="mr-2">{{ option[titleKey] }}</div>
          </template>
        </v-radio>
      </template>
    </v-radio-group>
  </div>
</template>

<script setup lang="ts">
import { useEventBus } from '@vueuse/core';
import axios from 'axios';
import jsonata from 'jsonata';
import get from 'lodash/get';

import { computed, onMounted, ref, toRef } from 'vue';

import {
  useClass,
  useFormModel,
  useLabel,
  useLocale,
  useProps,
  useResolveVariables,
  useRules,
} from '@/core/composables';
import { useActiveRules } from '@/core/composables/useActiveRules';
import { variableRegexp } from '@/core/engine/utils';
import { useInjectedFormModel } from '@/core/state/useFormModelProvider';
import { EngineDictionaryField } from '@/types/engine/controls';

const props = defineProps<{
  schema: EngineDictionaryField;
  model: object;
  validationsDisabled: boolean;
}>();

const { t } = useLocale();

const DEFAULT_OPTIONS_LIMIT = 10;
const MAX_OPTIONS_LIMIT = 100;

const { bindClass } = useClass();
const { bindRules, rules, requiredInputClass, inputRef } = useRules();
const { bindProps, fieldProps } = useProps();
const { label, bindLabel } = useLabel(props.schema);
const { getValue, setValue } = useFormModel();
const { resolve } = useResolveVariables();
const form = useInjectedFormModel();

const titleKey = computed(() => props.schema.source.title ?? 'title');
const valueKey = computed(() => props.schema.source.value ?? 'value');
const returnObject = computed(() => props.schema.source.returnObject ?? false);
const multiple = computed(() => props.schema.source.multiple ?? false);

const loading = ref(false);
const data = ref<Array<Record<string, any>>>([]);
const overflow = ref(false);

const { activeRules } = useActiveRules({
  fieldProps,
  validationsDisabled: toRef(() => props.validationsDisabled),
  rules,
});

const effectiveLimit = computed(() => {
  const builderLimit = props.schema.options?.dictionaryProps?.choiceOptionsLimit;
  const sourceLimit = props.schema.source.choiceOptionsLimit;
  const rawLimit = Number(sourceLimit ?? builderLimit ?? DEFAULT_OPTIONS_LIMIT);

  if (!Number.isFinite(rawLimit)) {
    return DEFAULT_OPTIONS_LIMIT;
  }

  const normalized = Math.floor(rawLimit);
  return Math.min(MAX_OPTIONS_LIMIT, Math.max(1, normalized));
});

const localModel = computed({
  get(): any {
    const currentValue = getValue(props.model, props.schema);

    if (multiple.value) {
      if (returnObject.value) {
        return Array.isArray(currentValue)
          ? currentValue.map((item: Record<string, any>) => item[valueKey.value])
          : [];
      }
      return Array.isArray(currentValue) ? currentValue : [];
    }

    if (returnObject.value) {
      return currentValue ? currentValue[valueKey.value] : null;
    }

    return currentValue;
  },
  set(val: any) {
    if (multiple.value) {
      if (returnObject.value) {
        const selectedObjects = data.value.filter((item) => val?.includes(item[valueKey.value]));
        setValue(selectedObjects.length > 0 ? selectedObjects : null, props.schema);
      } else {
        setValue(Array.isArray(val) && val.length > 0 ? val : null, props.schema);
      }
      return;
    }

    if (returnObject.value) {
      const selectedObject = data.value.find((item) => item[valueKey.value] === val) ?? null;
      setValue(selectedObject, props.schema);
    } else {
      setValue(val ?? null, props.schema);
    }
  },
});

async function checkConditionIfExist(condition: string): Promise<boolean> {
  if (!condition) {
    return false;
  }

  const model = form.getFormModelForResolve.value;
  return (await jsonata(condition).evaluate(model)) as boolean;
}

async function reloadDisabledConditions() {
  await Promise.all(
    data.value.map(async (item) => {
      if (item.disabledCondition) {
        item.disabled = await checkConditionIfExist(item.disabledCondition);
      }
    }),
  );
}

function disabled(propsDisabled: boolean, itemDisabled: boolean | undefined) {
  if (propsDisabled) {
    return propsDisabled;
  }
  return itemDisabled;
}

function resolveBaseUrlAndParams(resolvedUrl: string) {
  const [baseUrl, queryString] = resolvedUrl.split('?');
  return {
    baseUrl,
    params: new URLSearchParams(queryString ?? ''),
  };
}

function mapDataFromResponse(response: any): Array<Record<string, any>> {
  const dataPath = props.schema.source.references?.data ?? 'content';
  const mapped = get(response, dataPath, []);
  return Array.isArray(mapped) ? mapped : [];
}

function checkOverflow(response: any): boolean {
  const totalPath = props.schema.source.references?.totalElements ?? 'numberOfElements';
  const totalElements = get(response, totalPath, null);
  const isLastPage = get(response, 'last', null);

  if (typeof totalElements === 'number') {
    return totalElements > effectiveLimit.value;
  }

  if (typeof isLastPage === 'boolean') {
    return !isLastPage;
  }

  return false;
}

function mapParams(params: URLSearchParams): Record<string, string> {
  const mappedParams: Record<string, string> = {};
  params.forEach((value, key) => {
    mappedParams[key] = value;
  });
  return mappedParams;
}

async function loadData() {
  try {
    loading.value = true;
    const resolvedEndpoint = await resolve(
      props.schema,
      props.schema.source.url,
      true,
      titleKey.value,
    );

    if (!resolvedEndpoint.allVariablesResolved || !resolvedEndpoint.resolvedText) {
      data.value = [];
      overflow.value = false;
      return;
    }

    const { baseUrl, params } = resolveBaseUrlAndParams(resolvedEndpoint.resolvedText);
    params.set('page', '0');
    params.set('size', String(effectiveLimit.value));

    const response = await axios.get(baseUrl, { params: mapParams(params) });

    data.value = mapDataFromResponse(response.data);
    overflow.value = checkOverflow(response.data);

    await reloadDisabledConditions();
  } catch (error) {
    console.error(error);
    data.value = [];
    overflow.value = false;
  } finally {
    loading.value = false;
  }
}

const vueSchemaFormEventBus = useEventBus<string>('form-model');

onMounted(async () => {
  await bindLabel(props.schema);
  await bindRules(props.schema);
  await bindProps(props.schema);
  await loadData();

  if (props.schema.source.url?.match(variableRegexp)) {
    vueSchemaFormEventBus.on(async () => {
      await loadData();
    });
  }

  vueSchemaFormEventBus.on(async () => {
    await reloadDisabledConditions();
  });
});
</script>

<style scoped lang="css"></style>
