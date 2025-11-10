<template>
  <v-switch
    :ref="(el) => (formSwitch[switchId] = el)"
    v-model="localModel"
    :class="bindClass(schema) + requiredInputClass"
    :color="primaryWhite"
    :label="label"
    :rules="!fieldProps.readonly ? rules : []"
    class="px-2"
    v-bind="fieldProps"
    @update:model-value="valueHasChanged"
  />
</template>

<script lang="ts" setup>
import { useTheme } from 'vuetify';
import { VSwitch } from 'vuetify/components';

import { computed, onMounted, ref } from 'vue';

import {
  useCalculation,
  useClass,
  useFormModel,
  useLabel,
  useProps,
  useRules,
} from '@/core/composables';
import { useEventHandler } from '@/core/composables/useEventHandler';
import { NodeUpdateEvent } from '@/types/engine/NodeUpdateEvent';
import { EngineSwitchField } from '@/types/engine/controls';

const { schema, model } = defineProps<{
  schema: EngineSwitchField;
  model: object;
}>();

const mode = schema.mode ? schema.mode : 'none';

const { bindClass } = useClass();
const { bindProps, fieldProps } = useProps();
const { label, bindLabel } = useLabel(schema);
const { getValue, setValue } = useFormModel();
const { bindRules, rules, requiredInputClass } = useRules();
const { calculationFunc, unsubscribeListener, calculationResultWasModified } = useCalculation();
const { onChange } = useEventHandler();

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
  return schema.calculation && schema.calculation !== '';
});

const isValueFromModelAndNotChangedManually = computed(() => {
  return (
    !localModel.value || (localModel.value && !(`${schema.key}ManuallyChanged` in (model as any)))
  );
});

const localModel = computed({
  get(): any {
    return getValue(model, schema);
  },
  set(val: any) {
    setValue(val, schema, undefined, mode == 'visibility');
  },
});

function valueHasChanged(val: any) {
  onToggleByUser(val); // custom logic
  onChange(schema, model); // fire events if defined
}

function onToggleByUser(val: any) {
  if (isCalculationDefined.value) {
    calculationResultWasModified.value = true;
    unsubscribeListener.value();

    const updateEvent: NodeUpdateEvent = {
      key: `${schema.key}ManuallyChanged`,
      value: true,
    };
    schema.on.input(updateEvent);
  }

  localModel.value = val;
}

async function runCalculationIfExist() {
  if (isCalculationDefined.value && isValueFromModelAndNotChangedManually.value) {
    localModel.value = await calculationFunc(schema, model);
  }
}

onMounted(async () => {
  await runCalculationIfExist();
  await bindLabel(schema);
  await bindRules(schema);
  await bindProps(schema);

  if (mode == 'visibility') {
    fieldProps.value.readonly = false;
  }

  if (!('defaultValue' in schema)) {
    const current = getValue(model, schema);
    if (current === undefined || current === null) {
      let falseValue = fieldProps.value['false-value'] as string | boolean | undefined;
      localModel.value = falseValue === undefined ? false : falseValue;
    }
  }
});
</script>
