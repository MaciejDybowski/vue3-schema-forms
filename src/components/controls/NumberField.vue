<template>
  <div>
    <v-text-field
      v-if="!loading"
      :class="bindClass(schema) + requiredInputClass"
      :label="label"
      :model-value="getLocalModel"
      :rules="activeRules"
      v-bind="fieldProps"
      @focusin="focusin"
      @focusout="focusout"
      @beforeinput="preventInvalidNumberInput($event, schema.type === 'int')"
      @update:model-value="userTyping"
      @click:append-inner="clickAppendInner"
    >
      <template v-slot:append-inner>
        <v-tooltip
          :text="t('numberInput.resultWasModified')"
          location="start"
        >
          <template v-slot:activator="{ props }">
            <v-icon
              v-if="showIconForVisualizationOfManuallyChangedResult"
              icon="mdi-alert-circle-outline"
              v-bind="props"
            >
            </v-icon>
          </template>
        </v-tooltip>
      </template>
    </v-text-field>
    <v-snackbar
      v-model="snackbar"
      :timeout="1000"
      color="success"
      variant="tonal"
      >Copied!
    </v-snackbar>
  </div>
</template>

<script lang="ts" setup>
import { useEventBus } from '@vueuse/core';
import get from 'lodash/get';

import { computed, onMounted, ref, toRef } from 'vue';

import {
  useCalculation,
  useClass,
  useExpression,
  useFormModel,
  useLabel,
  useLocale,
  useProps,
  useResolveVariables,
  useRules,
} from '@/core/composables';
import { useActiveRules } from '@/core/composables/useActiveRules';
import { useEventHandler } from '@/core/composables/useEventHandler';
import { NumberFormattingType, RoundOption, useNumber } from '@/core/composables/useNumber';
import { variableRegexp } from '@/core/engine/utils';
import { logger } from '@/main';
import { NodeUpdateEvent } from '@/types/engine/NodeUpdateEvent';
import { EngineNumberField } from '@/types/engine/controls';

const props = defineProps<{
  schema: EngineNumberField;
  model: Record<string, any>;
  validationsDisabled: boolean;
}>();
const vueSchemaFormEventBus = useEventBus<string>('form-model');

const { t } = useLocale();
const { bindClass } = useClass();
const { bindRules, rules, requiredInputClass } = useRules();
const { fieldProps, bindProps } = useProps();
const { resolveExpression } = useExpression();
const { calculationFunc, unsubscribeListener, calculationResultWasModified } = useCalculation();
const { label, bindLabel } = useLabel(props.schema);
const { getValue, setValue, getDataPath } = useFormModel();
const { onChange } = useEventHandler();
const { resolve } = useResolveVariables();
const { fillPath } = useResolveVariables();
const { activeRules } = useActiveRules({
  fieldProps,
  validationsDisabled: toRef(() => props.validationsDisabled),
  rules,
});

const snackbar = ref(false);

let precision =
  props.schema.type == 'int' ? 0 : 'precision' in props.schema ? props.schema.precision : 2;
const precisionMin =
  props.schema.type == 'int' ? 0 : 'precisionMin' in props.schema ? props.schema.precisionMin : 0;
let precisionReference = '';

const formatType = (
  'formatType' in props.schema ? props.schema.formatType : 'decimal'
) as NumberFormattingType;

const roundOption: RoundOption =
  'roundOption' in props.schema ? (props.schema.roundOption as RoundOption) : 'round';

const {
  roundTo,
  formattedNumber,
  cleanFormattedNumber,
  getDecimalSeparator,
  preventInvalidNumberInput,
} = useNumber();

const isFocused = ref(false);
const inputValue = ref<string | null>(null);

const getLocalModel = computed(() => {
  if (isFocused.value) return inputValue.value;

  return getFormattedModelValue();
});

const localModel = computed({
  get(): string | number | null {
    let value = getValue(props.model, props.schema);

    if (value && typeof value == 'string' && value.match(variableRegexp)) {
      return value;
    }

    if (typeof value === 'number' && !Number.isFinite(value)) {
      return null;
    }

    return value;
  },
  set(val: any) {
    if (val === '' || val == null || isIncompleteNumberInput(val)) {
      setValue(null, props.schema);
      return;
    }

    if (typeof val === 'string' && val.match(variableRegexp)) {
      setValue(val, props.schema);
      return;
    }

    const parsedValue = parseNumberInput(val);
    if (parsedValue === null) {
      return;
    }

    setValue(
      isFocused.value ? parsedValue : roundTo(parsedValue, precision, roundOption),
      props.schema,
    );
  },
});

function getFormattedModelValue(): string | number | null {
  const value = localModel.value;

  if (typeof value === 'number') {
    return formattedNumber(value, formatType, Number(precisionMin), Number(precision));
  }

  return value;
}

function getEditableModelValue(): string | null {
  const value = localModel.value;

  if (typeof value === 'number') {
    return String(value).replace('.', getDecimalSeparator());
  }

  if (typeof value === 'string') {
    return cleanFormattedNumber(value);
  }

  return null;
}

function normalizeNumberInput(val: any): string {
  let value = String(val)
    .trim()
    .replace(/[\s\u00A0']/g, '');
  const lastCommaIndex = value.lastIndexOf(',');
  const lastDotIndex = value.lastIndexOf('.');

  if (lastCommaIndex !== -1 && lastDotIndex !== -1) {
    if (lastCommaIndex > lastDotIndex) {
      value = value.replaceAll('.', '').replace(',', '.');
    } else {
      value = value.replaceAll(',', '');
    }

    return value;
  }

  return value.replace(',', '.');
}

function parseNumberInput(val: any): number | null {
  const normalizedValue = normalizeNumberInput(val);
  if (normalizedValue === '') return null;

  const parsedValue = Number(normalizedValue);
  return Number.isFinite(parsedValue) ? parsedValue : null;
}

function isIncompleteNumberInput(val: any): boolean {
  const normalizedValue = normalizeNumberInput(val);
  return normalizedValue === '-' || /^-?(?:\d+\.|\.)$/.test(normalizedValue);
}

const isCalculationDefined = computed(() => {
  return props.schema.calculation && props.schema.calculation !== '';
});

const isValueFromModelAndNotChangedManually = computed(() => {
  const dataPath = getDataPath(props.schema);
  return !localModel.value || (localModel.value && !(`${dataPath}ManuallyChanged` in props.model));
});

const showIconForVisualizationOfManuallyChangedResult = computed(() => {
  const dataPath = getDataPath(props.schema);
  return (
    calculationResultWasModified.value ||
    (`${dataPath}ManuallyChanged` in props.model &&
      props.model[`${dataPath}ManuallyChanged`] == true)
  );
});

function userTyping(val: any) {
  inputValue.value = val == null ? null : String(val);

  if (isCalculationDefined.value) {
    if (logger.calculationListener)
      console.debug(
        `[vue-schema-forms] [CalculationListener], key=${getDataPath(props.schema)}, index=${props.schema.index}, manualResult=${val}`,
      );
    calculationResultWasModified.value = true;
    unsubscribeListener.value();
    const dataPath = getDataPath(props.schema);
    const updateEvent: NodeUpdateEvent = {
      key: `${dataPath}ManuallyChanged`,
      value: true,
      dataPath: props.schema.dataPath ? `${dataPath}ManuallyChanged` : undefined,
    };
    props.schema.on.input(updateEvent);
  }

  if (val === '' || val == null) {
    localModel.value = null;
  } else if (!isIncompleteNumberInput(val)) {
    const parsedValue = parseNumberInput(val);
    if (parsedValue !== null) {
      localModel.value = parsedValue;
    }
  }

  onChange(props.schema, props.model);
}

function focusout() {
  if (inputValue.value === '') {
    localModel.value = null;
  } else {
    const parsedValue = parseNumberInput(inputValue.value);
    if (parsedValue !== null) {
      setValue(roundTo(parsedValue, precision, roundOption), props.schema);
    }
  }

  isFocused.value = false;
  inputValue.value = null;
}

function focusin() {
  inputValue.value = getEditableModelValue();
  isFocused.value = true;
}

async function runCalculationIfExist() {
  if (isCalculationDefined.value) {
    if (isValueFromModelAndNotChangedManually.value) {
      localModel.value = await calculationFunc(props.schema, props.model);
    } else {
      //await calculationFunc(props.schema, props.model);
    }
  }
}

async function runExpressionIfExist() {
  if (props.schema.expression && props.schema.expression !== '') {
    const expression = fillPath(props.schema.path, props.schema.index, props.schema.expression);
    localModel.value = await resolveExpression(
      props.schema,
      getDataPath(props.schema),
      expression,
      props.model,
    );
  }
}

async function resolveIfLocalModelHasDependencies() {
  if (
    localModel.value &&
    typeof localModel.value == 'string' &&
    localModel.value.match(variableRegexp)
  ) {
    const result = await resolve(props.schema, localModel.value);
    if (result.allVariablesResolved) {
      localModel.value = result.resolvedText;
    }
  }
}

async function checkIfPrecisionIsDependency() {
  if (isNaN(precision)) {
    precisionReference = precision + '';
    precision = get(props.model, props.schema.precision, 2);
    vueSchemaFormEventBus.on(async () => await precisionResolver());
  }
}

async function precisionResolver() {
  await new Promise((r) => setTimeout(r, 10));
  const result = get(props.model, precisionReference);
  if (precision != result && result != null) {
    precision = result;
    localModel.value = localModel.value;
  }
}

function clickAppendInner() {
  if (
    'append-inner-icon' in fieldProps.value &&
    fieldProps.value['append-inner-icon'] === 'mdi-content-copy'
  ) {
    if (!navigator.clipboard) {
      console.error('Clipboard API not available');
      return;
    }
    const textToCopy = localModel.value;
    navigator.clipboard
      .writeText(textToCopy as string)
      .then(() => {
        snackbar.value = true;
      })
      .catch((err) => {
        console.error('Failed to copy to clipboard:', err);
      });
  }
}

const loading = ref(true);

onMounted(async () => {
  loading.value = true;

  await checkIfPrecisionIsDependency();
  await runCalculationIfExist();
  await bindLabel(props.schema);
  await bindRules(props.schema);
  await bindProps(props.schema);
  await runExpressionIfExist();

  await resolveIfLocalModelHasDependencies();

  loading.value = false;
});
</script>

<style lang="css" scoped>
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
