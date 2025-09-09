<template>
  <v-switch
    :ref="(el) => (formSwitch[switchId] = el)"
    v-model="localModel"
    :class="bindClass(schema) + requiredInputClass"
    :color="primaryWhite"
    :label="label"
    :rules="!fieldProps.readonly ? rules : []"
    v-bind="fieldProps"
  />
</template>

<script lang="ts" setup>
import { useTheme } from 'vuetify';
import { VSwitch } from 'vuetify/components';

import { computed, onMounted, ref } from 'vue';

import { useClass, useFormModel, useLabel, useProps, useRules, useExpression, useResolveVariables, useCalculation } from '@/core/composables';
import { EngineField } from '@/types/engine/EngineField';
import { NodeUpdateEvent } from '@/types/engine/NodeUpdateEvent';

const props = defineProps<{
  schema: EngineField;
  model: object;
}>();

const mode = props.schema.mode ? props.schema.mode : 'none';

const { bindClass } = useClass();
const { bindProps, fieldProps } = useProps();
const { label, bindLabel } = useLabel(props.schema);
const { getValue, setValue } = useFormModel();
const { bindRules, rules, requiredInputClass } = useRules();
const { resolveExpression } = useExpression();
const { calculationFunc, unsubscribeListener, calculationResultWasModified } = useCalculation();
const { fillPath } = useResolveVariables();

const theme = useTheme();

const primaryWhite = computed(() => {
  if (fieldProps.value.color) {
    return fieldProps.value.color;
  }

  return theme.current.value.dark ? 'white' : 'primary';
});

const formSwitch = ref<Record<string, any>>({});
const switchId: string = Math.random().toString().slice(2, 5);

const isCalculationDefined = computed(() => {
  return props.schema.calculation && props.schema.calculation !== '';
});

const isValueFromModelAndNotChangedManually = computed(() => {
  return (
    !localModel.value ||
    (localModel.value && !(`${props.schema.key}ManuallyChanged` in (props.model as any)))
  );
});

const localModel = computed({
  get(): any {
    return getValue(props.model, props.schema);
  },
  set(val: any) {
    if (isCalculationDefined.value) {
      calculationResultWasModified.value = true;
      unsubscribeListener.value();
      const updateEvent: NodeUpdateEvent = {
        key: `${props.schema.key}ManuallyChanged`,
        value: true,
      };
      props.schema.on.input(updateEvent);
    }
    setValue(val, props.schema, undefined, mode == 'visibility');
  },
});

async function runCalculationIfExist() {
  if (isCalculationDefined.value && isValueFromModelAndNotChangedManually.value) {
    localModel.value = await calculationFunc(props.schema, props.model);
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

onMounted(async () => {
  await runCalculationIfExist();
  await bindLabel(props.schema);
  await bindRules(props.schema);
  await bindProps(props.schema);
  await runExpressionIfExist();

  if (mode == 'visibility') {
    fieldProps.value.readonly = false;
  }

  if (!('defaultValue' in props.schema)) {
    // Only set default false if value is still undefined/null
    const current = getValue(props.model, props.schema);
    if (current === undefined || current === null) {
      let falseValue = fieldProps.value['false-value'] as string | boolean | undefined;
      localModel.value = falseValue === undefined ? false : falseValue;
    }
  }
});
</script>

<style lang="css" scoped></style>
