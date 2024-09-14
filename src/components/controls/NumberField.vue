<template>
  <v-text-field
    v-model='localModel'
    :label='label'
    v-bind='fieldProps'
    :rules='rules(schema)'
    :class='bindClass(schema)'
    @focusout='focusout'
    @focusin='focusin'
  />
</template>

<script setup lang='ts'>
import { computed, onMounted, ref } from 'vue';

import {
  useCalculation,
  useClass,
  useExpression,
  useFormModel,
  useLabel,
  useProps,
  useRules,
} from '@/core/composables';
import { NumberFormattingType, useNumber } from '@/core/composables/useNumber';
import { EngineNumberField } from '@/types/engine/controls';

const props = defineProps<{
  schema: EngineNumberField;
  model: object;
}>();


// const fieldProps = computed(() => {
//   propsRef.value = bindProps(props.schema);
//   return propsRef.value;
// });

const { bindClass } = useClass();
const { rules } = useRules();
const { fieldProps, bindProps } = useProps();
const { resolveExpression } = useExpression();
const { calculationFunc } = useCalculation();
const { label } = useLabel(props.schema);
const { getValue, setValue } = useFormModel();


const showFormattedNumber = ref(true);

const precision = props.schema.type == 'int' ? 0 : 'precision' in props.schema ? props.schema.precision : 2;

const formatType = ('formatType' in props.schema ? props.schema.formatType : 'decimal') as NumberFormattingType;

const currency = ('currency' in props.schema ? props.schema.currency : 'PLN') as string;

const { roundTo, formattedNumber } = useNumber({
  currency: currency,
});

const localModel = computed({
  get(): string | number | null {
    let value = getValue(props.model, props.schema);
    if (typeof value == 'string') {
      value = Number(value);
    }
    if (value && showFormattedNumber.value) {
      return formattedNumber(value, formatType, precision);
    }
    return value;
  },
  set(val: any) {
    val = roundTo(val, precision);
    setValue(val, props.schema);
  },
});

function focusout() {
  showFormattedNumber.value = true;
}

function focusin() {
  showFormattedNumber.value = false;
}

function runCalculationIfExist() {
  if (props.schema.calculation && props.schema.calculation !== '') {
    localModel.value = calculationFunc(props.schema, props.model);
  }
}

function runExpressionIfExist() {
  if (props.schema.expression && props.schema.expression !== '') {
    localModel.value = resolveExpression(props.schema.key, props.schema.expression, props.model);
  }
}

onMounted(() => {
  bindProps(props.schema);
  runCalculationIfExist();
  runExpressionIfExist();
});
</script>

<style scoped lang='css'></style>
