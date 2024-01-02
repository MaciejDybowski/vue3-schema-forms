<template>
  <v-menu
    v-model='menu'
    :close-on-content-click='false'
    offset-y
  >
    <template v-slot:activator='{ props }'>
      <v-text-field
        :label='schema.label'
        v-model='textFieldDate'
        @update:modelValue='tryMatchToDate'
        v-bind='{...props, ...useProps(schema)}'
        append-inner-icon='mdi-calendar'
        v-maska:[maskOptions]
      ></v-text-field>
    </template>
    <v-date-picker
      v-model='pickerDate'
      @update:modelValue='transformTextFieldDate'
      :key='pickerDate+""'
      ref='calendar'
    >
    </v-date-picker>
  </v-menu>
</template>

<script setup lang='ts'>

import { computed, ref, Ref } from 'vue';
import { EngineSourceField } from '@/vocabulary/engine/controls';
import { useProps } from '@/core/composables/useProps';

import { vMaska } from 'maska';
import { getValueFromModel, produceUpdateEvent } from '@/core/engine/utils';
import { onClickOutside } from '@vueuse/core';
import dayjs from './dayjs';

const props = defineProps<{ schema: EngineSourceField; model: object; }>();

const localModel = computed({
  get(): string {
    return dayjs(getValueFromModel(props.model, props.schema)).tz().format('L');
  },
  set(val: any) {
    produceUpdateEvent(val ? new Date(val).toISOString() : null, props.schema);
  },
});

const maskOptions = { mask: '##/##/####' };
const menu = ref(false);
const pickerDate: Ref<Date | undefined> = ref();
const textFieldDate = ref('');

function transformTextFieldDate() {
  localModel.value = textFieldDate.value = dayjs(pickerDate.value).tz().format('L');
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
