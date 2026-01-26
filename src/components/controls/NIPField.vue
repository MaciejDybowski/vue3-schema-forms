<template>
  <v-text-field
    v-model="localModel"
    :class="bindClass(schema) + requiredInputClass"
    :hint="warningHint"
    :label="label"
    :persistent-hint="!!warningHint"
    :rules="!fieldProps.readonly ? nipRules : []"
    maxlength="14"
    v-bind="fieldProps"
    @update:model-value="onNipChange"
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
import { computed, onMounted, ref, watch } from 'vue';

import {
  useClass,
  useFormModel,
  useLabel,
  useLocale,
  useProps,
  useRules,
} from '@/core/composables';
import { useEventHandler } from '@/core/composables/useEventHandler';
import { EngineNIPField } from '@/types/engine/controls';

const props = defineProps<{
  schema: EngineNIPField;
  model: object;
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

// =====================================================
// Wyrażenia regularne dla formatów VAT ID
// =====================================================
const vatPatterns: Array<{ regex: RegExp; country: string }> = [
  { regex: /^(PL)(\d{10})$/, country: 'PL' },
  { regex: /^(DE)([1-9]\d{8})$/, country: 'DE' },
  { regex: /^(FR)(\d{11})$/, country: 'FR' },
  { regex: /^(FR)([A-HJ-NP-Z]\d{10})$/, country: 'FR' },
  { regex: /^(FR)(\d[A-HJ-NP-Z]\d{9})$/, country: 'FR' },
  { regex: /^(FR)([A-HJ-NP-Z]{2}\d{9})$/, country: 'FR' },
  { regex: /^(IT)(\d{11})$/, country: 'IT' },
  { regex: /^(GB)(\d{9})$/, country: 'GB' },
  { regex: /^(GB)(\d{12})$/, country: 'GB' },
  { regex: /^(GB)(GD\d{3})$/, country: 'GB' },
  { regex: /^(GB)(HA\d{3})$/, country: 'GB' },
];

// =====================================================
// Walidacja sumy kontrolnej dla poszczególnych krajów
// =====================================================

/** Polski NIP - wagi: 6,5,7,2,3,4,5,6,7, mod 11 */
function validatePL(number: string): boolean {
  const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(number[i], 10) * weights[i];
  }
  const checkDigit = sum % 11;
  if (checkDigit === 10) return false;
  return checkDigit === parseInt(number[9], 10);
}

/** Niemiecki VAT - algorytm ISO 7064 MOD 11-10 */
function validateDE(number: string): boolean {
  let product = 10;
  for (let i = 0; i < 8; i++) {
    let sum = (parseInt(number[i], 10) + product) % 10;
    if (sum === 0) sum = 10;
    product = (2 * sum) % 11;
  }
  let checkDigit = 11 - product;
  if (checkDigit === 10) checkDigit = 0;
  if (checkDigit === 11) checkDigit = 0;
  return checkDigit === parseInt(number[8], 10);
}

/** Francuski VAT - tylko numery całkowicie cyfrowe */
function validateFR(number: string): boolean {
  if (!/^\d{11}$/.test(number)) return true; // inne formaty FR nie mają check digit
  const total = parseInt(number.substring(2), 10);
  const check = ((total * 100 + 12) % 97);
  return check === parseInt(number.substring(0, 2), 10);
}

/** Włoski VAT - algorytm Luhn-like */
function validateIT(number: string): boolean {
  const multipliers = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2];
  // Sprawdzenie urzędu wydającego (pozycje 7-9)
  if (parseInt(number.slice(0, 7), 10) === 0) return false;
  const office = parseInt(number.slice(7, 10), 10);
  if ((office < 1 || office > 201) && office !== 999 && office !== 888) return false;

  let total = 0;
  for (let i = 0; i < 10; i++) {
    let temp = parseInt(number[i], 10) * multipliers[i];
    if (temp > 9) temp = Math.floor(temp / 10) + (temp % 10);
    total += temp;
  }
  let checkDigit = 10 - (total % 10);
  if (checkDigit > 9) checkDigit = 0;
  return checkDigit === parseInt(number[10], 10);
}

/** Brytyjski VAT */
function validateGB(number: string): boolean {
  // Government departments
  if (number.substring(0, 2) === 'GD') {
    return parseInt(number.substring(2, 5), 10) < 500;
  }
  // Health authorities
  if (number.substring(0, 2) === 'HA') {
    return parseInt(number.substring(2, 5), 10) > 499;
  }
  // Standard numbers (9 lub 12 cyfr)
  if (!/^\d{9}$|^\d{12}$/.test(number)) return false;
  if (parseInt(number.slice(0, 7), 10) === 0) return false;

  const multipliers = [8, 7, 6, 5, 4, 3, 2];
  let total = 0;
  for (let i = 0; i < 7; i++) {
    total += parseInt(number[i], 10) * multipliers[i];
  }

  // Obliczenie cyfry kontrolnej metodą modulo 97
  let cd = total;
  while (cd > 0) cd -= 97;
  cd = Math.abs(cd);

  const checkDigits = parseInt(number.slice(7, 9), 10);
  const no = parseInt(number.slice(0, 7), 10);

  // Stary algorytm (numery przed 2010)
  if (cd === checkDigits && no < 9990001 && (no < 100000 || no > 999999) && (no < 9490001 || no > 9700000)) {
    return true;
  }

  // Nowy algorytm (numery od 2010) - odejmij 55 lub dodaj 42
  const cdNew = cd >= 55 ? cd - 55 : cd + 42;
  return cdNew === checkDigits && no > 1000000;
}

// =====================================================
// Główne funkcje walidacji
// =====================================================

/** Parsowanie i walidacja formatu VAT ID */
function parseVatNumber(value: string): { country: string; number: string } | null {
  const cleaned = value.toUpperCase().replace(/[\s.\-]/g, '');

  for (const pattern of vatPatterns) {
    const match = cleaned.match(pattern.regex);
    if (match) {
      return { country: match[1], number: match[2] };
    }
  }

  // Fallback: sam numer bez prefiksu (domyślnie PL)
  if (/^\d{10}$/.test(cleaned)) {
    return { country: 'PL', number: cleaned };
  }

  return null;
}

/** Walidacja formatu VAT ID */
function validateVatFormat(value: string): boolean {
  return parseVatNumber(value) !== null;
}

/** Walidacja sumy kontrolnej VAT ID */
function validateVatChecksum(value: string): boolean {
  const parsed = parseVatNumber(value);
  if (!parsed) return false;

  const validators: Record<string, (n: string) => boolean> = {
    PL: validatePL,
    DE: validateDE,
    FR: validateFR,
    IT: validateIT,
    GB: validateGB,
  };

  const validator = validators[parsed.country];
  if (!validator) return true; // Brak walidatora = akceptuj

  return validator(parsed.number);
}

/**
 * Aktualizacja hintów warning dla sumy kontrolnej
 */
function updateWarningHints(value: string) {
  const warnings: string[] = [];

  if (
    props.schema.checkSumValidation === 'warning' &&
    value &&
    validateVatFormat(value) &&
    !validateVatChecksum(value)
  ) {
    warnings.push(t('nip.invalidChecksum'));
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
 * Reguły walidacji dla pola NIP/VAT ID
 */
const nipRules = computed(() => {
  const baseRules = [...rules.value];

  // Walidacja formatu
  baseRules.push((value: string) => {
    if (!value || value === '') return true;
    if (!validateVatFormat(value)) {
      return t('nip.invalidFormat');
    }
    return true;
  });

  // Walidacja sumy kontrolnej jako error (blokująca)
  if (props.schema.checkSumValidation === 'error') {
    baseRules.push((value: string) => {
      if (!value || value === '' || !validateVatFormat(value)) return true;
      if (!validateVatChecksum(value)) {
        return t('nip.invalidChecksum');
      }
      return true;
    });
  }

  return baseRules;
});

function onNipChange(value: string | number) {
  // Normalizacja: usunięcie spacji, kropek, myślników, uppercase
  if (typeof value === 'string') {
    const cleanedValue = value.toUpperCase().replace(/[\s.\-]/g, '');
    if (cleanedValue !== value) {
      localModel.value = cleanedValue;
    }
  }
  onChange(props.schema, props.model);
}

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
