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
        v-bind='{...props, ...bindProps(schema)}'
        append-inner-icon='mdi-calendar'
        v-maska:[maskOptions]
        :rules='rules(schema)'
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

import { computed, onMounted, ref, Ref } from 'vue';
import { EngineSourceField } from '../../../vocabulary/engine/controls';
import { useProps } from '../../../core/composables/useProps';

import { vMaska } from 'maska';
import { getValueFromModel, produceUpdateEvent } from '../../../core/engine/utils';
import { onClickOutside } from '@vueuse/core';
import dayjs from './dayjs';
import { useRules } from '../../../core/composables/useRules';
import { useLabel } from '../../../core/composables/useLabel';

const props = defineProps<{ schema: EngineSourceField; model: object; }>();
const dateFormat = 'DD/MM/YYYY';

const { label } = useLabel(props.schema);
const { rules } = useRules();
const { bindProps } = useProps();

const localModel = computed({
  get(): string | null {
    const value = getValueFromModel(props.model, props.schema);
    return value ? dayjs(value).tz().format(dateFormat) : null;
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
  localModel.value = textFieldDate.value = dayjs(pickerDate.value).tz().format(dateFormat);
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
