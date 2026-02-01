<template>
  <v-text-field
    ref="inputFieldRef"
    v-model="inputValue"
    :class="bindClass(schema) + requiredInputClass"
    :clearable="!fieldProps.readonly"
    :focused="pickerModel"
    :label="label"
    :rules="!fieldProps.readonly ? rules : []"
    readonly
    v-bind="{ ...attrs, ...fieldProps }"
    @click="openPicker"
    @click:clear="localModel=null"
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
    <v-card width="330px" @mousedown.prevent>
      <v-date-picker
        v-model="pickerValue"
        hide-header
        hide-title
        type="month"
      >
        <template #controls="{ monthText, yearText, openMonths, openYears }">
          <v-sheet
            class="w-100 d-flex align-center rounded-lg pa-1 ga-1"
            color="rgba(var(--v-theme-on-surface), .2)"
          >
            <v-btn
              :text="monthText"
              append-icon="$dropdown"
              class="bg-surface px-2"
              @click="openMonths"
            />
            <v-btn
              :text="yearText"
              append-icon="$dropdown"
              class="bg-surface px-2"
              @click="openYears"
            />
            <v-spacer />
            <v-btn
              class="bg-surface px-2"
              prepend-icon="$plus"
              text="Save"
              @click="savePickerValue(monthText, yearText)"
            />
          </v-sheet>
        </template>
      </v-date-picker>
    </v-card>
  </v-menu>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, useAttrs, watch } from 'vue';

import {
  useClass,
  useFormModel,
  useLabel,
  useLocale,
  useProps,
  useRules,
} from '@/core/composables';
import { EngineDateField } from '@/types/engine/controls';

const props = defineProps<{
  schema: EngineDateField;
  model: object;
}>();

const { locale } = useLocale();
const { label, bindLabel } = useLabel(props.schema);
const { getValue, setValue } = useFormModel();
const { bindClass } = useClass();
const { bindProps, fieldProps } = useProps();
const attrs = useAttrs();
const { bindRules, rules, requiredInputClass } = useRules();

const pickerModel = ref(false);
const inputFieldRef = ref<HTMLElement | null>(null);
const inputValue = ref('');
const pickerValue = ref<Date | null>(null);

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

function formatDisplay(v: { year: number; month: number }) {
  return `${String(v.month).padStart(2, '0')}/${v.year}`;
}

function formatIso(year: number, month: number) {
  return `${year}-${String(month).padStart(2, '0')}`;
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z]/g, '');
}

function buildMonthMap(locale: string): Record<string, number> {
  const map: Record<string, number> = {};

  const formatter = new Intl.DateTimeFormat(locale, {
    month: 'short',
  });

  for (let i = 0; i < 12; i++) {
    const short = formatter.format(new Date(2020, i, 1));
    const key = normalize(short).slice(0, 3);

    map[key] = i;
  }

  return map;
}

const monthMapCache = new Map<string, Record<string, number>>();

function getMonthMap(locale: string) {
  if (!monthMapCache.has(locale)) {
    monthMapCache.set(locale, buildMonthMap(locale));
  }

  return monthMapCache.get(locale)!;
}

function resolveMonthIndex(monthText: string, locale: string) {
  const key = normalize(monthText).slice(0, 3);
  return getMonthMap(locale)[key] ?? null;
}

function savePickerValue(monthText: string, yearText: string) {
  const year = Number(yearText);
  if (Number.isNaN(year)) return;
  const monthIndex = resolveMonthIndex(monthText, locale.value);

  if (monthIndex === null) return;

  const month = monthIndex + 1;

  pickerValue.value = new Date(year, monthIndex, 1);
  localModel.value = formatIso(year, month);
  inputValue.value = formatDisplay({ year, month });

  pickerModel.value = false;
}

watch(
  localModel,
  (val) => {
    if (!val) {
      pickerValue.value = null;
      inputValue.value = '';
      return;
    }

    const [yearStr, monthStr] = val.split('-');
    const year = Number(yearStr);
    const month = Number(monthStr);

    if (Number.isNaN(year) || Number.isNaN(month)) return;

    pickerValue.value = new Date(year, month - 1, 1);
    inputValue.value = formatDisplay({ year, month });
  },
  { immediate: true },
);

onMounted(async () => {
  if (localModel.value) {
    const [y, m] = localModel.value.split('-');
    savePickerValue(m, y);
  }

  await bindLabel(props.schema);
  await bindRules(props.schema);
  await bindProps(props.schema);
});
</script>

<style lang="scss" scoped>
:deep(.v-date-picker-month__days) {
  display: none !important;
}
</style>
