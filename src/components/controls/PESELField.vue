<template>
  <v-text-field
    v-model="localModel"
    :class="bindClass(schema) + requiredInputClass"
    :hint="warningHint"
    :label="label"
    :persistent-hint="!!warningHint"
    :rules="activeRules"
    maxlength="11"
    v-bind="fieldProps"
    @update:model-value="onPeselChange"
  >
    <template
      v-if="warningHint"
      #message="{ message }"
    >
      <span :class="{ 'text-warning': hasWarning }">{{ message }}</span>
    </template>
  </v-text-field>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, toRef, watch } from 'vue';

import {
  useClass,
  useFormModel,
  useLabel,
  useLocale,
  useProps,
  useRules,
} from '@/core/composables';
import { useActiveRules } from '@/core/composables/useActiveRules';
import { useEventHandler } from '@/core/composables/useEventHandler';
import { EnginePESELField } from '@/types/engine/controls';

const props = defineProps<{
  schema: EnginePESELField;
  model: object;
  validationsDisabled: boolean;
}>();

const { t } = useLocale();
const { bindClass } = useClass();
const { bindRules, rules, requiredInputClass } = useRules();
const { bindProps, fieldProps } = useProps();
const { label, bindLabel } = useLabel(props.schema);
const { getValue, setValue } = useFormModel();
const { onChange } = useEventHandler();

const warningHint = ref<string>('');
const hasWarning = ref<boolean>(false);

const localModel = computed({
  get(): string | number {
    return getValue(props.model, props.schema);
  },
  set(val: any) {
    setValue(val, props.schema);
  },
});

/**
 * Walidacja formatu PESEL - dokładnie 11 cyfr
 */
function validatePeselFormat(pesel: string): boolean {
  return /^\d{11}$/.test(pesel);
}

/**
 * Walidacja sumy kontrolnej PESEL
 * Wagi: 1, 3, 7, 9, 1, 3, 7, 9, 1, 3, 1
 */
function validatePeselChecksum(pesel: string): boolean {
  if (!validatePeselFormat(pesel)) return false;

  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3, 1];
  let sum = 0;

  for (let i = 0; i < 11; i++) {
    sum += parseInt(pesel[i], 10) * weights[i];
  }

  return sum % 10 === 0;
}

/**
 * Ekstrakcja daty urodzenia z numeru PESEL
 * Obsługuje wszystkie wieki (1800-2299)
 */
function extractBirthDateFromPesel(pesel: string): Date | null {
  if (!validatePeselFormat(pesel)) return null;

  let year = parseInt(pesel.substring(0, 2), 10);
  let month = parseInt(pesel.substring(2, 4), 10);
  const day = parseInt(pesel.substring(4, 6), 10);

  // Określenie stulecia na podstawie miesiąca
  if (month >= 1 && month <= 12) {
    // 1900-1999
    year += 1900;
  } else if (month >= 21 && month <= 32) {
    // 2000-2099
    year += 2000;
    month -= 20;
  } else if (month >= 41 && month <= 52) {
    // 2100-2199
    year += 2100;
    month -= 40;
  } else if (month >= 61 && month <= 72) {
    // 2200-2299
    year += 2200;
    month -= 60;
  } else if (month >= 81 && month <= 92) {
    // 1800-1899
    year += 1800;
    month -= 80;
  } else {
    return null;
  }

  const date = new Date(year, month - 1, day);

  // Sprawdzenie czy data jest prawidłowa
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }

  return date;
}

/**
 * Sprawdzenie czy osoba jest pełnoletnia (18+)
 */
function isAdult(pesel: string): boolean {
  const birthDate = extractBirthDateFromPesel(pesel);
  if (!birthDate) return false;

  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    return age - 1 >= 18;
  }

  return age >= 18;
}

/**
 * Aktualizacja hintów warning dla sumy kontrolnej i niepełnoletności
 */
function updateWarningHints(value: string) {
  const warnings: string[] = [];

  // Warning dla sumy kontrolnej (gdy checkSumValidation === 'warning')
  if (
    props.schema.checkSumValidation === 'warning' &&
    value &&
    validatePeselFormat(value) &&
    !validatePeselChecksum(value)
  ) {
    warnings.push(t('pesel.invalidChecksum'));
  }

  // Warning dla niepełnoletności (gdy adultsValidation === 'warning')
  if (
    props.schema.adultsValidation === 'warning' &&
    value &&
    validatePeselFormat(value) &&
    (props.schema.checkSumValidation !== 'warning' ? validatePeselChecksum(value) : true) &&
    !isAdult(value)
  ) {
    warnings.push(t('pesel.notAdult'));
  }

  if (warnings.length > 0) {
    warningHint.value = warnings.join(' ');
    hasWarning.value = true;
  } else {
    warningHint.value = '';
    hasWarning.value = false;
  }
}

// Watch dla aktualizacji warning hints
watch(
  () => localModel.value,
  (newValue) => {
    if (typeof newValue === 'string') {
      updateWarningHints(newValue);
    }
  },
  { immediate: true },
);

/**
 * Reguły walidacji dla pola PESEL
 */
const peselRules = computed(() => {
  const extraRules = [];

  // Walidacja formatu
  extraRules.push((value: string) => {
    if (!value || value === '') return true;
    if (!validatePeselFormat(value)) {
      return t('pesel.invalidFormat');
    }
    return true;
  });

  // Walidacja sumy kontrolnej jako error (blokująca) - gdy checkSumValidation === 'error'
  if (props.schema.checkSumValidation === 'error') {
    extraRules.push((value: string) => {
      if (!value || value === '' || !validatePeselFormat(value)) return true;
      if (!validatePeselChecksum(value)) {
        return t('pesel.invalidChecksum');
      }
      return true;
    });
  }

  // Walidacja prawidłowej daty urodzenia
  extraRules.push((value: string) => {
    if (!value || value === '' || !validatePeselFormat(value)) return true;
    if (!extractBirthDateFromPesel(value)) {
      return t('pesel.invalidDate');
    }
    return true;
  });

  // Walidacja pełnoletności jako error (blokująca) - gdy adultsValidation === 'error'
  if (props.schema.adultsValidation === 'error') {
    extraRules.push((value: string) => {
      if (!value || value === '' || !validatePeselChecksum(value)) return true;
      if (!isAdult(value)) {
        return t('pesel.notAdult');
      }
      return true;
    });
  }

  return extraRules;
});

function onPeselChange(value: string | number) {
  // Usunięcie wszystkich znaków niebędących cyframi
  if (typeof value === 'string') {
    const cleanedValue = value.replace(/\D/g, '');
    if (cleanedValue !== value) {
      localModel.value = cleanedValue;
    }
  }
  onChange(props.schema, props.model);
}

const { activeRules } = useActiveRules({
  fieldProps,
  validationsDisabled: toRef(() => props.validationsDisabled),
  rules,
  extraRules: peselRules.value,
});

onMounted(async () => {
  await bindLabel(props.schema);
  await bindRules(props.schema);
  await bindProps(props.schema);
});
</script>

<style lang="scss" scoped>
.text-warning {
  color: rgb(var(--v-theme-warning));
}
</style>
