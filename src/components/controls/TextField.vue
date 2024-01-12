<template>
  <div class='node-text-field'>
    <v-text-field
      v-model='localModel'
      :label='schema.label'
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
import { bindClass, getValueFromModel, produceUpdateEvent } from '../../core/engine/utils';
import { EngineTextField } from '../../vocabulary/engine/controls';
import { useCalculation } from '../../core/composables/useCalculation';
import { useRules } from '../../core/composables/useRules';
import { useProps } from '../../core/composables/useProps';
import { useFormattedNumber } from '../../core/composables/useFormattedNumber';

const props = defineProps<{
  schema: EngineTextField;
  model: object;
}>();

const { rules } = useRules();
const { bindProps } = useProps();
const isNumberField = props.schema.type === 'number';
const { showFormattedNumber, formatNumber, parseNumberType } = useFormattedNumber(props.schema.options);

const localModel = computed({
  get(): string | number {
    return isNumberField && showFormattedNumber.value
      ? formatNumber(getValueFromModel(props.model, props.schema))
      : getValueFromModel(props.model, props.schema);
  },
  set(val: any) {
    val = isNumberField
      ? parseNumberType(val, props.schema.options.digitsAfterDecimal)
      : val;
    produceUpdateEvent(val, props.schema);
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
