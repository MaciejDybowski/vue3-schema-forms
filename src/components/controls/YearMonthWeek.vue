<template>
  <v-text-field
    ref="inputFieldRef"
    v-model="inputValue"
    :class="bindClass(schema) + requiredInputClass"
    :clearable="!fieldProps.readonly"
    :focused="pickerModel"
    :label="label"
    :rules="activeRules"
    readonly
    v-bind="{ ...attrs, ...fieldProps }"
    @click="openPicker"
    @click:clear="clearValue"
  />

  <v-menu
    v-if="inputFieldRef"
    v-model="pickerModel"
    :activator="inputFieldRef"
    :close-on-content-click="false"
    :disabled="fieldProps.readonly as boolean"
    :open-on-click="false"
    offset="5"
    scrim="transparent"
  >
    <v-card
      width="360px"
    >
      <v-date-picker
        ref="pickerRef"
        v-model="pickerValue"
        :first-day-of-week="1"
        :month="displayedMonth"
        :show-adjacent-months="true"
        :show-week="true"
        :year="displayedYear"
        hide-header
        @click="selectWeekFromWeekNumber"
        @update:month="displayedMonth = Number($event)"
        @update:year="displayedYear = Number($event)"
      >
        <template #day="{ props: dayProps, item }">
          <v-btn
            v-bind="dayProps"
            :disabled="isDayDisabled(dayProps, item.date)"
            @click.stop.prevent="selectWeek(item.date)"
          >
            {{ item.localized }}
          </v-btn>
        </template>
      </v-date-picker>
    </v-card>
  </v-menu>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, toRef, useAttrs, watch } from 'vue';

import {
  useClass,
  useFormModel,
  useLabel,
  useProps,
  useRules,
} from '@/core/composables';
import { useActiveRules } from '@/core/composables/useActiveRules';
import { EngineDateField } from '@/types/engine/controls';

import dayjs from './date/dayjs';

const props = defineProps<{
  schema: EngineDateField;
  model: object;
  validationsDisabled: boolean;
}>();

const { label, bindLabel } = useLabel(props.schema);
const { getValue, setValue } = useFormModel();
const { bindClass } = useClass();
const { bindProps, fieldProps } = useProps();
const attrs = useAttrs();
const { bindRules, rules, requiredInputClass } = useRules();
const { activeRules } = useActiveRules({
  fieldProps,
  validationsDisabled: toRef(() => props.validationsDisabled),
  rules,
});

const today = new Date();
const pickerModel = ref(false);
const inputFieldRef = ref<HTMLElement | null>(null);
const pickerRef = ref<HTMLElement | null>(null);
const inputValue = ref('');
const pickerValue = ref<Date | null>(null);
const displayedMonth = ref(today.getMonth());
const displayedYear = ref(today.getFullYear());

const localModel = computed<string | null>({
  get() {
    return getValue(props.model, props.schema);
  },
  set(v) {
    setValue(v, props.schema);
  },
});

function openPicker() {
  if (!fieldProps.value.readonly) {
    pickerModel.value = true;
  }
}

function clearValue() {
  localModel.value = null;
  pickerValue.value = null;
  inputValue.value = '';
}

function formatIsoWeekModel(date: Date) {
  const value = dayjs(date);
  return `${value.isoWeekYear()}-W${String(value.isoWeek()).padStart(2, '0')}`;
}

function isFirstDayOfIsoWeek(date: Date) {
  return dayjs(date).isoWeekday() === 1;
}

function isDayDisabled(dayProps: Record<string, any>, date: Date) {
  return dayProps.disabled || !isFirstDayOfIsoWeek(date);
}

function dateFromIsoWeek(value: string) {
  const match = /^(\d{4})-W(\d{2})$/.exec(value);
  if (!match) return null;

  const year = Number(match[1]);
  const week = Number(match[2]);
  if (Number.isNaN(year) || Number.isNaN(week) || week < 1 || week > 53) return null;

  const date = dayjs(`${year}-01-04`).startOf('isoWeek').add(week - 1, 'week');

  if (date.isoWeekYear() !== year || date.isoWeek() !== week) return null;

  return date.toDate();
}

function selectWeek(date: Date) {
  const weekStart = dayjs(date).startOf('isoWeek');

  pickerValue.value = weekStart.toDate();
  localModel.value = formatIsoWeekModel(weekStart.toDate());
  inputValue.value = localModel.value;
  pickerModel.value = false;
}

function getWeeksForDisplayedMonth() {
  const firstDayOfMonth = new Date(displayedYear.value, displayedMonth.value, 1);
  const lastDayOfMonth = new Date(displayedYear.value, displayedMonth.value + 1, 0);
  const firstDayWeekIndex = (firstDayOfMonth.getDay() - 1 + 7) % 7;
  const lastDayWeekIndex = (lastDayOfMonth.getDay() - 1 + 7) % 7;
  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];

  for (let i = 0; i < firstDayWeekIndex; i++) {
    const adjacentDay = new Date(firstDayOfMonth);
    adjacentDay.setDate(adjacentDay.getDate() - (firstDayWeekIndex - i));
    currentWeek.push(adjacentDay);
  }

  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    currentWeek.push(new Date(displayedYear.value, displayedMonth.value, i));

    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  for (let i = 1; i < 7 - lastDayWeekIndex; i++) {
    const adjacentDay = new Date(lastDayOfMonth);
    adjacentDay.setDate(adjacentDay.getDate() + i);
    currentWeek.push(adjacentDay);
  }

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  return weeks;
}

function selectWeekFromWeekNumber(event: MouseEvent) {
  const target = event.target as HTMLElement | null;
  const weekNumber = target?.closest('.v-date-picker-month__weeks .v-date-picker-month__day');
  if (!weekNumber) return;

  const root = (pickerRef.value as HTMLElement | null) ?? document;
  const weekNumberElements = Array.from(
    root.querySelectorAll('.v-date-picker-month__weeks .v-date-picker-month__day'),
  ).slice(1);
  const weekIndex = weekNumberElements.indexOf(weekNumber);
  const weekStart = getWeeksForDisplayedMonth()[weekIndex]?.[0];

  if (weekStart) {
    selectWeek(weekStart);
  }
}

watch(
  localModel,
  (val) => {
    if (!val) {
      pickerValue.value = null;
      inputValue.value = '';
      return;
    }

    const date = dateFromIsoWeek(val);
    if (!date) return;

    pickerValue.value = date;
    inputValue.value = val;
    displayedMonth.value = date.getMonth();
    displayedYear.value = date.getFullYear();
  },
  { immediate: true },
);

onMounted(async () => {
  await bindLabel(props.schema);
  await bindRules(props.schema);
  await bindProps(props.schema);
});
</script>

<style lang="scss" scoped>
:deep(.v-date-picker-month__weeks .v-date-picker-month__day) {
  cursor: pointer;
}

:deep(.v-date-picker-month__day) {
  width: 32px;
  height: 32px;
}

:deep(.v-date-picker-month__day .v-btn) {
  height: 32px;
  width: 32px;
}

:deep(.v-date-picker-month__weeks) {
  user-select: none;
}

:deep(.v-date-picker-month__weeks .v-date-picker-month__day) {
  user-select: none;
}
</style>
