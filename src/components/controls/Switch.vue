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

import { useClass, useFormModel, useLabel, useProps, useRules } from '@/core/composables';
import { EngineField } from '@/types/engine/EngineField';

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

const theme = useTheme();

const primaryWhite = computed(() => {
  if (fieldProps.value.color) {
    return fieldProps.value.color;
  }

  return theme.current.value.dark ? 'white' : 'primary';
});

const formSwitch = ref<Record<string, any>>({});
const switchId: string = Math.random().toString().slice(2, 5);

const localModel = computed({
  get(): any {
    return getValue(props.model, props.schema);
  },
  set(val: any) {
    setValue(val, props.schema, undefined, mode == 'visibility');
  },
});

onMounted(async () => {
  await bindLabel(props.schema);
  await bindRules(props.schema);
  await bindProps(props.schema);

  if (mode == 'visibility') {
    fieldProps.value.readonly = false;
  }

  if (!('defaultValue' in props.schema)) {
    let falseValue = fieldProps.value['false-value'] as string | boolean | undefined;
    localModel.value = falseValue === undefined ? false : falseValue;
  }
});
</script>

<style lang="css" scoped></style>
