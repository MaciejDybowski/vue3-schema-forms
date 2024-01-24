<template>
  <v-menu
    :close-on-content-click='false'
    offset-y
  >
    <template v-slot:activator='{ isActive, props }'>
      <v-text-field
        :label='label'
        v-model='textFieldDate'
        @update:modelValue='tryMatchToDate'
        append-inner-icon='mdi-calendar'
        v-bind='{ ...props, ...bindProps(schema) }'
        v-maska:[maskOptions]
        :rules='rules(schema)'
      ></v-text-field>
    </template>

    <v-date-picker
      v-model='pickerDate'
      @update:modelValue='transformTextFieldDate'
      :key="pickerDate + ''"
      ref='calendar'
    >
    </v-date-picker>
  </v-menu>
</template>

<script setup lang='ts'>
import { computed, onMounted, ref, Ref } from 'vue';
import { EngineSourceField } from '../../../vocabulary/engine/controls';

import { vMaska } from 'maska';
import { onClickOutside } from '@vueuse/core';
import dayjs from './dayjs';

import { useFormModel, useLabel, useProps, useRules } from '../../../core/composables';

const props = defineProps<{ schema: EngineSourceField; model: object }>();
const dateFormat = 'DD/MM/YYYY';

const { label } = useLabel(props.schema);
const { rules } = useRules();
const { bindProps } = useProps();
const { getValue, setValue } = useFormModel();

const localModel = computed({
  get(): string | null {
    const value = getValue(props.model, props.schema);
    return value ? dayjs(value).tz().format(dateFormat) : null;
  },
  set(val: any) {
    setValue(val ? new Date(val).toISOString() : null, props.schema);
  },
});

const maskOptions = { mask: '##/##/####' };
const menu = ref(false);
const pickerDate: Ref<Date | undefined> = ref();
const textFieldDate = ref('');

function transformTextFieldDate() {
  textFieldDate.value = dayjs(pickerDate.value).tz().format(dateFormat);
  localModel.value = dayjs(pickerDate.value).tz().format('MM/DD/YYYY');
}

function tryMatchToDate() {
  if (textFieldDate.value.length === 10) {
    localModel.value = pickerDate.value = dayjs(textFieldDate.value).toDate();
  }

  if (!textFieldDate.value) {
    localModel.value = null;
  }
}

const calendar = ref();
onClickOutside(calendar, () => {
  menu.value = false;
});

onMounted(() => {
  if (localModel.value) {
    textFieldDate.value = localModel.value;
  }
});
</script>

<style scoped lang='scss'>
:deep(.v-picker-title) {
  display: none;
}

:deep(.v-picker__header) {
  display: none;
}

:deep(.v-date-picker-month__day--adjacent) {
  display: none;
}

:deep(.v-date-picker-month__day) {
  width: 32px;
  height: 32px;
}

:deep(.v-date-picker-month__day .v-btn) {
  height: 32px;
  width: 32px;
}
</style>
