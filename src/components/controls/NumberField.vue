<template>
  <v-text-field
    v-model="localModel"
    :label="label"
    v-bind="bindProps(schema, model)"
    :rules="rules(schema)"
    :class="bindClass(schema)"
    type="number"
  />
</template>

<script setup lang="ts">
import { EngineNumberField } from "@/types/engine/controls";
import { useClass, useFormattedNumber, useFormModel, useLabel, useProps, useRules } from "@/core/composables";
import { computed } from "vue";

const props = defineProps<{
  schema: EngineNumberField;
  model: object;
}>();

const { bindClass } = useClass();
const { rules } = useRules();
const { bindProps } = useProps();

const { label } = useLabel(props.schema);
const { getValue, setValue } = useFormModel();
const { showFormattedNumber, formatNumber, parseNumberType } = useFormattedNumber(props.schema.options);


const localModel = computed({
  get(): string | number {
    console.debug(formatNumber(getValue(props.model, props.schema), props.schema.precision))
    return getValue(props.model, props.schema)
  },
  set(val: any) {
    val = parseNumberType(val, props.schema.precision);
    setValue(val, props.schema);
  }
});
</script>

<style scoped lang="css">

</style>
