<template>
  <v-text-field
    v-if="!loading"
    :class="bindClass(schema) + requiredInputClass"
    :label="label"
    :model-value="getLocalModel"
    :rules="!fieldProps.readonly ? rules : []"
    v-bind="fieldProps"
    @focusin="focusin"
    @focusout="focusout"
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
</template>

<script lang="ts" setup>
import { useEventBus } from '@vueuse/core';
import get from 'lodash/get';

import { computed, onMounted, ref } from 'vue';

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
import { useEventHandler } from '@/core/composables/useEventHandler';
import { NumberFormattingType, RoundOption, useNumber } from '@/core/composables/useNumber';
import { variableRegexp } from '@/core/engine/utils';
import { logger } from '@/main';
import { NodeUpdateEvent } from '@/types/engine/NodeUpdateEvent';
import { EngineNumberField } from '@/types/engine/controls';

const props = defineProps<{
  schema: EngineNumberField;
  model: Record<string, any>;
}>();
const vueSchemaFormEventBus = useEventBus<string>('form-model');

const { t } = useLocale();
const { bindClass } = useClass();
const { bindRules, rules, requiredInputClass } = useRules();
const { fieldProps, bindProps } = useProps();
const { resolveExpression } = useExpression();
const { calculationFunc, unsubscribeListener, calculationResultWasModified } = useCalculation();
const { label, bindLabel } = useLabel(props.schema);
const { getValue, setValue } = useFormModel();
const { onChange } = useEventHandler();
const { resolve } = useResolveVariables();
const showFormattedNumber = ref(true);
const { fillPath } = useResolveVariables();

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

const { roundTo, formattedNumber, cleanFormattedNumber } = useNumber();

const lastValue = ref<any>(null);

function isOnlyZeros(str: string): boolean {
  return /^0+$/.test(str);
}

function parseDigitWithOnlyZeroFraction(value: number) {
  let lastFraction = lastValue.value?.toString().split('.')[1];
  lastFraction = lastFraction?.slice(0, lastFraction.length - 1);
  let current = value ? value.toString().split('.')[1] : null;

  if (isOnlyZeros(lastFraction) && current == undefined) {
    return value + `.${lastFraction}`;
  }
  return value;
}

const getLocalModel = computed(() => {
  return localModel.value;
});

const localModel = computed({
  get(): string | number | null {
    let value = getValue(props.model, props.schema);

    // Obsługa zmiennych z zależnościami
    if (value && typeof value == 'string' && value.match(variableRegexp)) {
      return value;
    }

    /* // Konwersja string na number
    if (typeof value == 'string') {
      value = Number(value);
    }*/

    // Formatowanie liczby lub czyszczenie
    if (value && showFormattedNumber.value) {
      return formattedNumber(value, formatType, precisionMin, precision);
    } else if (value) {
      // Jeśli nie pokazujemy sformatowanej liczby, wyczyść ją
      const stringValue = typeof value === 'number' ? value.toString() : String(value);
      return cleanFormattedNumber(stringValue);
    }

    value = parseDigitWithOnlyZeroFraction(value);
    return value;
  },
  set(val: any) {
    lastValue.value = localModel.value;
    val = roundTo(val, precision, roundOption);
    setValue(val, props.schema);
  },
});

const isCalculationDefined = computed(() => {
  return props.schema.calculation && props.schema.calculation !== '';
});

const isValueFromModelAndNotChangedManually = computed(() => {
  return (
    !localModel.value ||
    (localModel.value && !(`${props.schema.key}ManuallyChanged` in props.model))
  );
});

const showIconForVisualizationOfManuallyChangedResult = computed(() => {
  return (
    calculationResultWasModified.value ||
    (`${props.schema.key}ManuallyChanged` in props.model &&
      props.model[`${props.schema.key}ManuallyChanged`] == true)
  );
});

function userTyping(val: any) {
  if (isCalculationDefined.value) {
    if (logger.calculationListener)
      console.debug(
        `[vue-schema-forms] [CalculationListener], key=${props.schema.key}, index=${props.schema.index}, manualResult=${val}`,
      );
    calculationResultWasModified.value = true;
    unsubscribeListener.value();
    const updateEvent: NodeUpdateEvent = {
      key: `${props.schema.key}ManuallyChanged`,
      value: true,
    };
    props.schema.on.input(updateEvent);
  }

  localModel.value = val;
  onChange(props.schema, props.model);
}

function focusout() {
  showFormattedNumber.value = true;
}

function focusin() {
  showFormattedNumber.value = false;
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
      props.schema.key,
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
