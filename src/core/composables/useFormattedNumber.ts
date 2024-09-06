import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

import { EngineOptions } from "@/types/engine/EngineOptions";

export function useFormattedNumber(formOptions: EngineOptions) {
  const { locale } = useI18n();
  const showFormattedNumber = ref(true);
  const digitsAfterDecimalLocal = computed(() => {
    return formOptions.digitsAfterDecimal || 2;
  });

  function formatNumber(value: number, digitsAfterDecimal?: number) {
    let precision = 0;
    if (isNaN(digitsAfterDecimalLocal.value)) {
      precision = digitsAfterDecimalLocal.value;
    }
    if (digitsAfterDecimal) {
      precision = digitsAfterDecimal;
    }
    const numFormatter = new Intl.NumberFormat(locale.value, {
      minimumFractionDigits: precision
    });
    return numFormatter.format(value);
  }

  function parseNumberType(val: string, digitsAfterDecimal: number): number | null {
    if (val || parseFloat(val) == 0) {
      const valWithDot = (val + "").replaceAll(",", ".");
      return isNaN(parseFloat(valWithDot)) ? null : roundToDecimal(parseFloat(valWithDot), digitsAfterDecimal);
    } else {
      return null;
    }
  }

  function roundToDecimal(value: number, decimalPlaces: number): number {
    const factor = Math.pow(10, isNaN(decimalPlaces) ? 2 : decimalPlaces);
    return Math.round(value * factor) / factor;
  }

  return {
    showFormattedNumber: showFormattedNumber,
    formatNumber: formatNumber,
    parseNumberType: parseNumberType
  };
}
