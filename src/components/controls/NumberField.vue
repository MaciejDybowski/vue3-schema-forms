<template>
  <v-text-field
    v-model='localModel'
    :label='label'
    v-bind='bindProps(schema, model)'
    :rules='rules(schema)'
    :class='bindClass(schema)'
    @focusout='focusout'
    @focusin='focusin'
  />
</template>

<script setup lang='ts'>
import { EngineNumberField } from '@/types/engine/controls';
import { useClass, useFormModel, useLabel, useProps, useRules } from '@/core/composables';
import { computed, ref } from 'vue';
import { NumberFormattingType, useNumber } from '@/core/composables/useNumber';

const props = defineProps<{
  schema: EngineNumberField;
  model: object;
}>();


const { bindClass } = useClass();
const { rules } = useRules();
const { bindProps } = useProps();

const { label } = useLabel(props.schema);
const { getValue, setValue } = useFormModel();

const showFormattedNumber = ref(true);

const precision = props.schema.type == 'int' ? 0 :
  ('precision' in props.schema ? props.schema.precision : 2);

const formatType = ('formatType' in props.schema ?
  props.schema.formatType :
  'decimal') as NumberFormattingType;

const currency = ('currency' in props.schema ? props.schema.currency : 'PLN') as string;

const { roundTo, formattedNumber } = useNumber({
  currency: currency,
});

const localModel = computed({
  get(): string | number | null {
    const value = getValue(props.model, props.schema);
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
</script>

<style scoped lang='css'>

</style>
