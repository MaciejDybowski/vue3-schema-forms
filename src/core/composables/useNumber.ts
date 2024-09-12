import { useI18n } from "vue-i18n";

import { usePrecision } from "@vueuse/math";

export type RoundOption = "ceil" | "floor" | "round";
export type NumberFormattingType = "decimal" | "currency" | "percent";
export type NumberFormatterOptions = {
  currency: string;
};

export function useNumber(options?: NumberFormatterOptions) {
  const { n, numberFormats } = useI18n();

  const decimal = (precision: number) => {
    return {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: precision,
    };
  };
  const percent = (precision: number) => {
    return {
      style: "percent",
      minimumFractionDigits: 0,
      maximumFractionDigits: precision,
    };
  };
  const currency = (currency: string = "PLN", precision: number) => {
    return {
      style: "currency",
      currency: currency,
      notation: "standard",
      minimumFractionDigits: 0,
      maximumFractionDigits: precision,
    };
  };

  function roundTo(inputValue: string | number, precision: number, option: RoundOption = "round"): number | null {
    if (inputValue || parseFloat(inputValue as string) == 0) {
      let value = (inputValue + "").replaceAll(",", ".");
      let valueNumber = parseFloat(value);

      if (isNaN(valueNumber)) {
        return null;
      }
      const result = usePrecision(valueNumber, precision, {
        math: option,
      });
      return result.value;
    } else {
      return null;
    }
  }

  function formattedNumber(value: number, type: NumberFormattingType = "decimal", precision: number = 0) {
    if (value) {
      switch (type) {
        case "decimal":
          return n(value, decimal(precision) as any);
        case "currency":
          return n(value, currency(options?.currency, precision) as any);
        case "percent":
          return n(value / 100, percent(precision) as any);
        default:
          console.warn("Number formatting type nod found");
      }
    }
    return null;
  }

  return { roundTo, formattedNumber };
}
