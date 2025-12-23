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
  >
  </v-text-field>

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
    <v-card width="330px">
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

import { useClass, useFormModel, useLabel, useProps, useRules } from '@/core/composables';
import { EngineDateField } from '@/types/engine/controls';

const monthNames = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

const props = defineProps<{
  schema: EngineDateField;
  model: object;
}>();

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

const localModel = computed<{
  year: number;
  month: number;
} | null>({
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

function savePickerValue(monthText: string, yearText: string) {
  const year = Number(yearText);
  if (Number.isNaN(year)) return;

  let monthIndex: number | null = null;
  if (pickerValue.value) {
    monthIndex = pickerValue.value.getMonth();
  } else {
    const testDate = new Date(`${monthText} 1, ${year}`);
    if (!Number.isNaN(testDate.getTime())) {
      monthIndex = testDate.getMonth();
    }
  }

  if (monthIndex === null) return;
  pickerValue.value = new Date(year, monthIndex, 1);
  const result = {
    year,
    month: monthIndex + 1,
  };

  localModel.value = result;
  inputValue.value = formatDisplay(result);
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

    const idx = monthNames.indexOf(val.month + '');
    if (idx === -1) return;

    pickerValue.value = new Date(val.year, idx, 1);
    inputValue.value = formatDisplay(val);
  },
  { immediate: true },
);

onMounted(async () => {
  if (localModel.value) {
    savePickerValue(localModel.value?.month + '', localModel.value?.year + '');
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
