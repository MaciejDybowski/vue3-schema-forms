<template>
  <v-text-field
    ref='inputFieldRef'
    :label='label'
    v-model='inputValue'
    :focused='isInputFocused || pickerModel'
    @update:focused='(val) => (isInputFocused = val)'
    :placeholder='dateFormat.toLocaleLowerCase()'
    v-maska:[maskOptions]
    :clearable="!vuetifyProps.readonly"
    :rules='dateRules'
    @update:model-value='dateTyping'
    append-inner-icon='mdi-calendar'
    @click:append-inner='pickerModel = !pickerModel'
    v-bind='bindProps(schema)'
    :class='bindClass(schema)'
  />
  <v-menu
    v-model='pickerModel'
    :close-on-content-click='false'
    min-width='0'
    :open-on-click='false'
    :activator='inputFieldRef'
    scrim='transparent'
    offset='5'
    :disabled="vuetifyProps.readonly as boolean"
  >
    <v-card min-width='0'>
      <v-card-text class='pa-0'>
        <v-date-picker
          :show-adjacent-months='true'
          v-model='pickerValue'
          @update:model-value='datePick'
          :min='isPastDateAvailable ? undefined : currentDate.toISOString()'
          :max='isFutureDateAvailable ? undefined : currentDate.toISOString()'
        />
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script setup lang='ts'>
import { computed, ref, watch } from 'vue';
import { EngineDateField } from '../../../vocabulary/engine/controls';

import { MaskOptions, vMaska } from 'maska';
import dayjs from './dayjs';

import {
  useClass,
  useDateFormat,
  useFormModel,
  useLabel,
  useLocale,
  useProps,
  useRules,
} from '../../../core/composables';
import { VTextField } from 'vuetify/lib/components/index.mjs';

const { locale, t } = useLocale();
const props = defineProps<{ schema: EngineDateField; model: object }>();
const { label } = useLabel(props.schema);
const { rules } = useRules();
const { bindProps } = useProps();
const { getValue, setValue } = useFormModel();
const { bindClass } = useClass();
const {dateFormat} = useDateFormat()

const localModel = computed({
  get(): string | null {
    return getValue(props.model, props.schema);
  },
  set(val: any) {
    setValue(val, props.schema);
  },
});

const vuetifyProps = bindProps(props.schema)

const currentDate = new Date();
currentDate.setHours(0, 0, 0, 0);

const inputFieldRef = ref<VTextField>();
const pickerModel = ref(false);
const inputValue = ref('');
const pickerValue = ref<Date>();

const isPastDateAvailable: boolean = 'pastDateAvailable' in props.schema ? props.schema.pastDateAvailable as boolean : true;
const isFutureDateAvailable: boolean = 'futureDateAvailable' in props.schema ? props.schema.futureDateAvailable as boolean : true;
const isCloseOnFirstClick: boolean = 'closeOnFirstClick' in props.schema ? props.schema.closeOnFirstClick as boolean : true;
const modelFormat: string = 'formatInModel' in props.schema ? props.schema.formatInModel as string : 'YYYY-MM-DDTHH:mm:ss.sssZ';
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
    console.debug(date);
    pickerValue.value = date.toDate();
    inputValue.value = date.format(dateFormat.value);
  },
  { immediate: true },
);

function dateTyping(val: string) {
  if (!val) {
    localModel.value = null;
    return;
  }
  if (val.length == 10 && inputFieldRef.value?.isValid) {
    const date = dayjs(val, dateFormat.value);
    if (date.isValid()) {
      localModel.value = date.format(modelFormat);
    }
  }
}

function datePick(val: Date) {
  const date = dayjs(val);
  if (date.isValid()) {
    localModel.value = date.format(modelFormat);
  }
  //support close picker menu on single or double click
  if (isCloseOnFirstClick || firstClickPick.value === val) {
    pickerModel.value = false;
  }
  firstClickPick.value = val;
}

/////////////////// MASK ///////////////////

const dateMask = computed(() => {
  return dateFormat.value.replace('MM', 'Mm').replace('DD', 'Dd');
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
  if (!isInputFocused.value) {
    rulesArray.push(isDateComplete);
  }
  if (!isPastDateAvailable) {
    rulesArray.push(isDateInPast);
  }
  if (!isFutureDateAvailable) {
    rulesArray.push(isDateInFuture);
  }
  return [...rulesArray, ...rules(props.schema)];
});

function isValidDate(val: string) {
  if (!val || val.length < 10) return true;
  if (val.length > 10) return t('datePicker.invalidDateError');
  const date = dayjs(val, dateFormat.value);
  return date.isValid() || t('datePicker.invalidDateError');
}

function isDateInPast(val: string) {
  if (!val || val.length < 10) return true;
  const date = dayjs(val, dateFormat.value);
  return date.toDate() >= currentDate || t('datePicker.pastDateError');
}

function isDateInFuture(val: string) {
  if (!val || val.length < 10) return true;
  const date = dayjs(val, dateFormat.value);
  return date.toDate() <= currentDate || t('datePicker.futureDateError');
}

function isDateComplete(val: string) {
  if (!val) return true;
  return val.length === 10 || t('datePicker.invalidDateError');
}

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
