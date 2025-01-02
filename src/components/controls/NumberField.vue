<template>
  <v-text-field
    v-if="!loading"
    v-model="localModel"
    :class="bindClass(schema) + requiredInputClass"
    :label="label"
    :rules="rules"
    v-bind="fieldProps"
    @focusin="focusin"
    @focusout="focusout"
    @update:model-value="userTyping"
  >
    <template v-slot:append-inner>
      <v-tooltip
        :text="t('resultWasModified')"
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
</template>

<script lang="ts" setup>
import set from "lodash/set";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

import { useCalculation, useClass, useExpression, useFormModel, useLabel, useProps, useRules } from "@/core/composables";
import { useEventHandler } from "@/core/composables/useEventHandler";
import { NumberFormattingType, RoundOption, useNumber } from "@/core/composables/useNumber";
import { logger } from "@/main";
import { EngineNumberField } from "@/types/engine/controls";

const props = defineProps<{
  schema: EngineNumberField;
  model: object;
}>();

const { t } = useI18n();
const { bindClass } = useClass();
const { bindRules, rules, requiredInputClass } = useRules();
const { fieldProps, bindProps } = useProps();
const { resolveExpression } = useExpression();
const { calculationFunc, unsubscribeListener, calculationResultWasModified } = useCalculation();
const { label, bindLabel } = useLabel(props.schema);
const { getValue, setValue } = useFormModel();
const { onChange } = useEventHandler();

const showFormattedNumber = ref(true);

const precision = props.schema.type == "int" ? 0 : "precision" in props.schema ? props.schema.precision : 2;
const precisionMin = props.schema.type == "int" ? 0 : "precisionMin" in props.schema ? props.schema.precision : 0;

const formatType = ("formatType" in props.schema ? props.schema.formatType : "decimal") as NumberFormattingType;

const currency = ("currency" in props.schema ? props.schema.currency : "PLN") as string;

const roundOption: RoundOption = "roundOption" in props.schema ? (props.schema.roundOption as RoundOption) : "round";

const { roundTo, formattedNumber } = useNumber();

const lastValue = ref<any>(null);

function isOnlyZeros(str) {
  return /^0+$/.test(str);
}

function parseDigitWithOnlyZeroFraction(value: number) {
  let lastFraction = lastValue.value?.toString().split(".")[1];
  lastFraction = lastFraction?.slice(0, lastFraction.length - 1);
  let current = value ? value.toString().split(".")[1] : null;

  if (isOnlyZeros(lastFraction) && current == undefined) {
    return value + `.${lastFraction}`;
  }
  return value;
}

const localModel = computed({
  get(): string | number | null {
    let value = getValue(props.model, props.schema);
    if (typeof value == "string") {
      value = Number(value);
    }
    if (value && showFormattedNumber.value) {
      return formattedNumber(value, formatType, precisionMin, precision);
    }
    if (value === 0) {
      return value;
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
  return props.schema.calculation && props.schema.calculation !== "";
});

const isValueFromModelAndNotChangedManually = computed(() => {
  return !localModel.value || (localModel.value && !(`${props.schema.key}ManuallyChanged` in props.model));
});

const showIconForVisualizationOfManuallyChangedResult = computed(() => {
  return (
    calculationResultWasModified.value ||
    (`${props.schema.key}ManuallyChanged` in props.model && props.model[`${props.schema.key}ManuallyChanged`] == true)
  );
});

function userTyping(val: any) {
  if (isCalculationDefined.value) {
    if (logger.calculationListener)
      console.debug(
        `[vue-schema-forms] [CalculationListener], key=${props.schema.key}, index=${props.schema.index}, manualResult=${val}`,
      );
    unsubscribeListener.value();
    set(props.model, `${props.schema.key}ManuallyChanged`, true);
    calculationResultWasModified.value = true;
  }
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
      await calculationFunc(props.schema, props.model);
    }
  }
}

function runExpressionIfExist() {
  if (props.schema.expression && props.schema.expression !== "") {
    localModel.value = resolveExpression(props.schema.key, props.schema.expression, props.model);
  }
}

const loading = ref(true);

onMounted(async () => {
  loading.value = true
  await runCalculationIfExist();
  await bindProps(props.schema);
  await bindRules(props.schema);
  await bindLabel(props.schema);
  runExpressionIfExist();
  loading.value = false
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

<i18n lang="json">
{
  "en": {
    "resultWasModified": "Result was manually modified."
  },
  "pl": {
    "resultWasModified": "Wynik został ręcznie zmodyfikowany."
  }
}
</i18n>
