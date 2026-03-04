<template>
  <v-text-field
    v-model="localModel"
    :class="bindClass(schema) + requiredInputClass"
    :hint="warningHint"
    :label="label"
    :persistent-hint="!!warningHint"
    :rules="activeRules"
    maxlength="14"
    v-bind="fieldProps"
    @update:model-value="onRegonChange"
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
import { EngineREGONField } from '@/types/engine/controls';

const props = defineProps<{
  schema: EngineREGONField;
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

// =====================================================
// Walidacja formatu REGON
// =====================================================

/**
 * Walidacja formatu REGON - dokładnie 9 lub 14 cyfr
 */
function validateRegonFormat(regon: string): boolean {
  return /^\d{9}$/.test(regon) || /^\d{14}$/.test(regon);
}

/**
 * Walidacja sumy kontrolnej REGON 9-cyfrowego
 * Wagi: 8, 9, 2, 3, 4, 5, 6, 7
 * Suma % 11 – jeśli wynik == 10 to cyfra kontrolna = 0
 */
function validateRegon9Checksum(regon: string): boolean {
  const weights = [8, 9, 2, 3, 4, 5, 6, 7];
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    sum += parseInt(regon[i], 10) * weights[i];
  }
  let checkDigit = sum % 11;
  if (checkDigit === 10) checkDigit = 0;
  return checkDigit === parseInt(regon[8], 10);
}

/**
 * Walidacja sumy kontrolnej REGON 14-cyfrowego
 * Wagi: 2, 4, 8, 5, 0, 9, 7, 3, 6, 1, 2, 4, 8
 * Suma % 11 – jeśli wynik == 10 to cyfra kontrolna = 0
 */
function validateRegon14Checksum(regon: string): boolean {
  const weights = [2, 4, 8, 5, 0, 9, 7, 3, 6, 1, 2, 4, 8];
  let sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(regon[i], 10) * weights[i];
  }
  let checkDigit = sum % 11;
  if (checkDigit === 10) checkDigit = 0;
  return checkDigit === parseInt(regon[13], 10);
}

/**
 * Walidacja sumy kontrolnej REGON (9 lub 14 cyfr)
 */
function validateRegonChecksum(regon: string): boolean {
  if (regon.length === 9) {
    return validateRegon9Checksum(regon);
  }
  if (regon.length === 14) {
    // Dla 14-cyfrowego najpierw sprawdź 9-cyfrową część bazową
    if (!validateRegon9Checksum(regon.substring(0, 9))) return false;
    return validateRegon14Checksum(regon);
  }
  return false;
}

/**
 * Aktualizacja hintów warning dla sumy kontrolnej
 */
function updateWarningHints(value: string) {
  const warnings: string[] = [];

  if (
    props.schema.checkSumValidation === 'warning' &&
    value &&
    validateRegonFormat(value) &&
    !validateRegonChecksum(value)
  ) {
    warnings.push(t('regon.invalidChecksum'));
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
 * Reguły walidacji dla pola REGON
 */
const regonRules = computed(() => {
  const extraRules = [];

  // Walidacja formatu
  extraRules.push((value: string) => {
    if (!value || value === '') return true;
    if (!validateRegonFormat(value)) {
      return t('regon.invalidFormat');
    }
    return true;
  });

  // Walidacja sumy kontrolnej jako error (blokująca)
  if (props.schema.checkSumValidation === 'error') {
    extraRules.push((value: string) => {
      if (!value || value === '' || !validateRegonFormat(value)) return true;
      if (!validateRegonChecksum(value)) {
        return t('regon.invalidChecksum');
      }
      return true;
    });
  }

  return extraRules;
});

function onRegonChange(value: string | number) {
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
  extraRules: regonRules.value,
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

