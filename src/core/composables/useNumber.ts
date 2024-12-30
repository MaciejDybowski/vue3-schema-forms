import { useI18n } from "vue-i18n";

import { usePrecision } from "@vueuse/math";

export type RoundOption = "ceil" | "floor" | "round";
export type NumberFormattingType = "decimal" | "currency" | "percent";
export type NumberFormatterOptions = {
  currency: string;
};

// TODO - uprzątnąć te options bo to nikomu niepotrzebne, zrobić tak jak zrobiłem na tabelce no i trzeba ogarnąć sterowanie min/max digits
export function useNumber(options?: NumberFormatterOptions) {
  const { n, numberFormats } = useI18n();

  const decimal = (precisionMin: number, precisionMax: number) => {
    return {
      style: "decimal",
      minimumFractionDigits: precisionMin,
      maximumFractionDigits: precisionMax,
    };
  };
  const percent = (precisionMin: number, precisionMax: number) => {
    return {
      style: "percent",
      minimumFractionDigits: precisionMin,
      maximumFractionDigits: precisionMax,
    };
  };
  const currency = (currency: string = "PLN", precisionMin: number, precisionMax: number) => {
    return {
      style: "currency",
      currency: currency,
      notation: "standard",
      minimumFractionDigits: precisionMin,
      maximumFractionDigits: precisionMax,
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

  function formattedNumber(value: number, type: NumberFormattingType = "decimal", precisionMin: number = 0, precisionMax: number = 0) {
    if (value) {
      value = Number(value);
      switch (type) {
        case "decimal":
          return n(value, decimal(precisionMin, precisionMax) as any);
        case "currency":
          return n(value, currency(options?.currency, precisionMin, precisionMax) as any);
        case "percent":
          return n(value / 100, percent(precisionMin, precisionMax) as any);
        default:
          console.warn("Number formatting type nod found");
      }
    }
    return null;
  }

  return { roundTo, formattedNumber };
}
