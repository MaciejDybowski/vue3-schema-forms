<template>
  <v-text-field
    ref="inputFieldRef"
    v-model="inputValue"
    :class="bindClass(schema) + requiredInputClass"
    :clearable="!fieldProps.readonly"
    :focused="pickerModel"
    :label="label"
    v-bind="{ ...attrs, ...fieldProps }"
    @click="() => (pickerModel = true)"
  >
    <template #append-inner>
      <v-btn
        icon="mdi-calendar"
        size="small"
        variant="plain"
        @click.stop="openPicker"
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
      <v-date-picker
        v-model="pickerValue"
        class="engine-month-picker"
        hide-header
        hide-title
        type="month"
        @update:model-value="selectMonth"
      >
        <template v-slot:controls="{ monthText, yearText, openMonths, openYears }">
          <v-sheet class="w-100 d-flex align-center rounded-lg pa-1 ga-1" color="rgba(var(--v-theme-on-surface), .2)">
            <v-btn :text="monthText" append-icon="$dropdown" class="bg-surface px-2" @click="openMonths"></v-btn>
            <v-btn :text="yearText" append-icon="$dropdown" class="bg-surface px-2" @click="openYears"></v-btn>
            <v-spacer></v-spacer>
            <v-btn class="bg-surface px-2" prepend-icon="$plus" text="Add event"></v-btn>
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

const props = defineProps<{ schema: EngineDateField; model: object }>();

const { label, bindLabel } = useLabel(props.schema);
const { bindRules, requiredInputClass } = useRules();
const { getValue, setValue } = useFormModel();
const { bindClass } = useClass();
const { bindProps, fieldProps } = useProps();
const attrs = useAttrs();

const pickerModel = ref(false);
const inputFieldRef = ref();
const inputValue = ref('');
const pickerValue = ref<Date | null>(null);

const localModel = computed({
  get(): { year: number; month: string } | null {
    return getValue(props.model, props.schema);
  },
  set(v) {
    setValue(v, props.schema);
  },
});

function openPicker() {
  if (!fieldProps.value.readonly) pickerModel.value = true;
}

function formatDisplay(v) {
  if (!v) return '';
  const idx = monthNames.indexOf(v.month);
  if (idx === -1) return '';
  return `${String(idx + 1).padStart(2, '0')}/${v.year}`;
}

function selectMonth(date: Date | string | null) {
  if (!date) return;

  const d = typeof date === 'string' ? new Date(date) : date;

  const result = {
    year: d.getFullYear(),
    month: monthNames[d.getMonth()],
  };

  localModel.value = result;
  inputValue.value = formatDisplay(result);

  console.debug(`selectMonth: ${date}`);
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

    const idx = monthNames.indexOf(val.month);
    if (idx === -1) return;

    pickerValue.value = new Date(val.year, idx, 1);
    inputValue.value = formatDisplay(val);
  },
  { immediate: true },
);

onMounted(async () => {
  await bindLabel(props.schema);
  await bindRules(props.schema);
  await bindProps(props.schema);
});
</script>

<style lang="scss" >
.v-date-picker-month__days {
  display: none !important;
}
</style>
