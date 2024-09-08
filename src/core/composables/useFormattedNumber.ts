import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

import { EngineOptions } from "@/types/engine/EngineOptions";
import { usePrecision } from '@vueuse/math';

/**
 * @deprecated The composable should not be used
 */
export function useFormattedNumber(formOptions: EngineOptions) {
  const { locale } = useI18n();
  const showFormattedNumber = ref(true);

  const digitsAfterDecimalLocal = computed(() => {
    return formOptions.digitsAfterDecimal || 2;
  });

  /**
   * @deprecated The method should not be used
   */
  function formatNumber(value: number, digitsAfterDecimal?: number) {
    let precision = 0;
    if (isNaN(digitsAfterDecimalLocal.value)) {
      precision = digitsAfterDecimalLocal.value;
    }
    if (digitsAfterDecimal) {
      precision = digitsAfterDecimal;
    }
    const numFormatter = new Intl.NumberFormat(locale.value, {
      minimumFractionDigits: 0,
      maximumFractionDigits: precision,
    });
    return numFormatter.format(value);
  }

  /**
   * @deprecated The method should not be used
   */
  function parseNumberType(val: string, digitsAfterDecimal: number): number | null {
    if (val || parseFloat(val) == 0) {
      const valWithDot = (val + "").replaceAll(",", ".");
      return isNaN(parseFloat(valWithDot)) ? null : roundToDecimal(parseFloat(valWithDot), digitsAfterDecimal);
    } else {
      return null;
    }
  }

  function roundToDecimal(value: number, decimalPlaces: number): number {
    return usePrecision(value, decimalPlaces).value
  }

  return {
    showFormattedNumber: showFormattedNumber,
    /**
     * @deprecated The method should not be used
     */
    formatNumber: formatNumber,
    /**
     * @deprecated The method should not be used
     */
    parseNumberType: parseNumberType
  };
}
