<template>
  <div class='node-text-field'>
    <v-text-field
      v-model='localModel'
      :label='label'
      v-bind='bindProps(schema)'
      :rules='rules(schema)'
      :class='bindClass(schema)'
      @focusout='focusout'
      @focusin='focusin'
    />
  </div>
</template>

<script setup lang='ts'>
import { computed, onMounted } from 'vue';
import { EngineTextField } from '../../vocabulary/engine/controls';
import {
  useCalculation,
  useClass,
  useFormattedNumber,
  useFormModel,
  useLabel,
  useProps,
  useRules,
} from '../../core/composables';

const props = defineProps<{
  schema: EngineTextField;
  model: object;
}>();

const { bindClass } = useClass();
const { rules } = useRules();
const { bindProps } = useProps();
const isNumberField = props.schema.type === 'number';
const { showFormattedNumber, formatNumber, parseNumberType } = useFormattedNumber(props.schema.options);

const { label } = useLabel(props.schema);
const { getValue, setValue } = useFormModel();

const localModel = computed({
  get(): string | number {
    return isNumberField && showFormattedNumber.value
      ? formatNumber(getValue(props.model, props.schema))
      : getValue(props.model, props.schema);
  },
  set(val: any) {
    val = isNumberField ? parseNumberType(val, props.schema.options.digitsAfterDecimal) : val;
    setValue(val, props.schema);
  },
});

function focusout() {
  if (isNumberField) {
    showFormattedNumber.value = true;
  }
}

function focusin() {
  if (isNumberField) {
    showFormattedNumber.value = false;
  }
}

function runCalculationIfExist() {
  if (props.schema.calculation) {
    localModel.value = useCalculation(props.schema.key, props.schema.calculation, props.model, props.schema.options);
  }
}

onMounted(() => {
  runCalculationIfExist();
});
</script>

<style scoped lang='css'></style>

<i18n lang='json'>
{
  "en": {},
  "pl": {}
}
</i18n>
