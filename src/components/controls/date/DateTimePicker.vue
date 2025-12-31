<template>
  <v-text-field
    ref="inputFieldRef"
    v-model="inputValue"
    :class="bindClass(schema) + requiredInputClass"
    :clearable="!fieldProps.readonly"
    :focused="isInputFocused || pickerModel"
    :label="label"
    :placeholder="dateTimeFormat.toLocaleLowerCase()"
    :rules="!fieldProps.readonly ? dateRules : []"
    v-bind="{ ...attrs, ...fieldProps }"
    @update:focused="(val) => (isInputFocused = val)"
    @update:model-value="dateTyping"
  >
    <template v-slot:append-inner>
      <v-btn
        :readonly="fieldProps.readonly as boolean"
        icon="mdi-calendar"
        size="small"
        variant="plain"
        @click="pickerModel = !pickerModel"
      />
    </template>
  </v-text-field>
  <v-menu
    v-model="pickerModel"
    :activator="inputFieldRef"
    :close-on-content-click="false"
    :disabled="fieldProps.readonly as boolean"
    :open-on-click="false"
    min-width="0"
    offset="5"
    scrim="transparent"
  >
    <v-card min-width="0">
      <v-card-text class="pa-0">
        <v-tabs
          v-model="activeTabRef"
          fixed-tabs
        >
          <v-tab value="0">
            <v-icon>mdi-calendar-today</v-icon>
          </v-tab>
          <v-tab value="1">
            <v-icon>mdi-update</v-icon>
          </v-tab>
        </v-tabs>
        <v-tabs-window v-model="activeTabRef">
          <v-tabs-window-item value="0">
            <v-date-picker
              :first-day-of-week="1"
              v-model="pickerValue"
              :max="isFutureDateAvailable ? undefined : currentDate.toISOString()"
              :min="isPastDateAvailable ? undefined : currentDate.toISOString()"
              :show-adjacent-months="true"
              @update:model-value="datePick"
            />
          </v-tabs-window-item>
          <v-tabs-window-item value="1">
            <v-time-picker
              v-model="timeValue"
              format="24hr"
              @update:model-value="(val) => timePick(val as string)"
            >
            </v-time-picker>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script lang="ts" setup>
import { toNumber } from 'lodash';
import { MaskOptions } from 'maska';

import { computed, onMounted, ref, useAttrs, watch } from 'vue';

import {
  useClass,
  useDateFormat,
  useFormModel,
  useLabel,
  useLocale,
  useProps,
  useRules,
} from '@/core/composables';
import { EngineDateField } from '@/types/engine/controls';

import dayjs from './dayjs';

const inputFieldRef = ref<any>();

const { locale, t } = useLocale();
const props = defineProps<{ schema: EngineDateField; model: object }>();
const { label, bindLabel } = useLabel(props.schema);
const { bindRules, rules, requiredInputClass } = useRules();
const { bindProps, fieldProps } = useProps();
const { getValue, setValue } = useFormModel();
const { bindClass } = useClass();
const { dateTimeFormat } = useDateFormat();

const attrs = useAttrs();

const localModel = computed({
  get(): string | null {
    return getValue(props.model, props.schema);
  },
  set(val: any) {
    setValue(val, props.schema);
  },
});

onMounted(async () => {
  await bindLabel(props.schema);
  await bindRules(props.schema);
  await bindProps(props.schema);
});

const currentDate = new Date();
currentDate.setHours(0, 0, 0, 0);

const activeTabRef = ref<string>("0")

const pickerModel = ref(false);
const inputValue = ref('');
const pickerValue = ref<Date>();
const timeValue = ref();

const isPastDateAvailable: boolean =
  'pastDateAvailable' in props.schema ? (props.schema.pastDateAvailable as boolean) : true;
const isFutureDateAvailable: boolean =
  'futureDateAvailable' in props.schema ? (props.schema.futureDateAvailable as boolean) : true;
const isCloseOnFirstClick: boolean =
  'closeOnFirstClick' in props.schema ? (props.schema.closeOnFirstClick as boolean) : true;
const modelFormat: string =
  'formatInModel' in props.schema
    ? (props.schema.formatInModel as string)
    : 'YYYY-MM-DDTHH:mm:ss.sssZ';
const isInputFocused = ref(false);
const firstClickPick = ref<Date>();

watch(
  localModel,
  (val) => {
    if (!val) {
      inputValue.value = '';
      pickerValue.value = undefined;
      return;
    }
    const date = dayjs(val, modelFormat);
    pickerValue.value = date.toDate();
    inputValue.value = date.format(dateTimeFormat.value);
  },
  { immediate: true },
);

function dateTyping(val: string) {
  if (!val) {
    localModel.value = null;
    return;
  }
  //if (inputFieldRef.value?.isValid) {
  const date = dayjs(val, dateTimeFormat.value);
  if (date.isValid()) {
    timeValue.value = date.get('hours') + ':' + date.get('minutes');
    localModel.value = date.format(modelFormat);
  }
  //}
}

function datePick(val: Date) {
  const date = dayjs(val);
  if (date.isValid()) {
    if (timeValue.value) {
      timePick(timeValue.value);
    } else {
      localModel.value = date.format(modelFormat);
    }
    activeTabRef.value = "1";
  }
}

function timePick(val: string) {
  const h = val.split(':')[0];
  const min = val.split(':')[1];
  pickerValue.value?.setHours(toNumber(h));
  pickerValue.value?.setMinutes(toNumber(min));
  const date = dayjs(pickerValue.value);
  if (date.isValid()) {
    localModel.value = date.format(modelFormat);
  }
}

/*watch(() => pickerModel.value, (value, oldValue)=> {
  console.debug(value,oldValue)
  if(!value){
    const date = dayjs(pickerValue.value);
    console.debug(date.isValid())
    if (date.isValid()) {
      localModel.value = date.format(modelFormat);
    }
  }
})*/

/////////////////// MASK ///////////////////

const dateMask = computed(() => {
  return dateTimeFormat.value.replace('MM', 'Mm').replace('DD', 'Dd');
});
const maskOptions = ref<MaskOptions>({
  mask: dateMask.value,
  tokens: {
    M: { pattern: /[0-1]/ },
    m: {
      pattern: /[0-9]/,
      transform: (char: string) => {
        return getFirstLetterOfMonth() === '1' && parseInt(char) > 2 ? '' : char;
      },
    },
    D: { pattern: /[0-3]/ },
    d: {
      pattern: /[0-9]/,
      transform: (char: string) => {
        return getFirstLetterOfDay() === '3' && parseInt(char) > 1 ? '' : char;
      },
    },
    Y: { pattern: /[0-9]/ },
  },
});

function getFirstLetterOfMonth() {
  const index = dateMask.value.indexOf('Mm');
  if (index != -1 && inputValue.value.length >= index) {
    return inputValue.value[index];
  }
}

function getFirstLetterOfDay() {
  const index = dateMask.value.indexOf('Dd');
  if (index != -1 && inputValue.value.length >= index) {
    return inputValue.value[index];
  }
}

/////////////////// RULES ///////////////////

const dateRules = computed(() => {
  const rulesArray = [isValidDate];
  /*if (!isInputFocused.value) {
    rulesArray.push(isDateComplete);
  }*/
  if (!isPastDateAvailable) {
    rulesArray.push(isDateInPast);
  }
  if (!isFutureDateAvailable) {
    rulesArray.push(isDateInFuture);
  }
  return [...rulesArray, ...rules.value];
});

function isValidDate(val: string) {
  if (!val) return true;
  const date = dayjs(val, dateTimeFormat.value);
  return date.isValid() || t('datePicker.invalidDateError');
}

function isDateInPast(val: string) {
  if (!val) return true;
  const date = dayjs(val, dateTimeFormat.value);
  return date.toDate() >= currentDate || t('datePicker.pastDateError');
}

function isDateInFuture(val: string) {
  if (!val) return true;
  const date = dayjs(val, dateTimeFormat.value);
  return date.toDate() <= currentDate || t('datePicker.futureDateError');
}

/*function isDateComplete(val: string) {
  if (!val) return true;
  return val.length === 16 || t('datePicker.invalidDateError');
}*/
</script>

<style lang="scss" scoped>
:deep(.v-picker-title) {
  display: none;
}

/*
:deep(.v-picker__header) {
  display: none;
}
*/

//:deep(.v-date-picker-month__day--adjacent) {
//  display: none;
//}

:deep(.v-date-picker-month__day) {
  width: 32px;
  height: 32px;
}

:deep(.v-date-picker-month__day .v-btn) {
  height: 32px;
  width: 32px;
}

:deep(.v-time-picker-controls){
  margin-bottom: 0px!important;
  margin-top: 4px;
}
:deep(.v-time-picker-controls__field-label){
  display: none;
}
</style>
