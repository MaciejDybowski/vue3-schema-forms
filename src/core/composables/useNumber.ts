import { usePrecision } from '@vueuse/math';
import { useI18n } from 'vue-i18n';

export type RoundOption = 'ceil' | 'floor' | 'round';
export type NumberFormattingType = 'decimal' | 'currency' | 'percent';

export interface CurrencyFormatterOptions {
  precisionMin: number;
  precision: number;
  roundOption: RoundOption;
  currencySymbol: string;
}

export function useNumber() {
  const { n, numberFormats } = useI18n();

  const decimal = (precisionMin: number, precisionMax: number) => {
    return {
      style: 'decimal',
      minimumFractionDigits: precisionMin,
      maximumFractionDigits: precisionMax,
    };
  };
  const percent = (precisionMin: number, precisionMax: number) => {
    return {
      style: 'percent',
      minimumFractionDigits: precisionMin,
      maximumFractionDigits: precisionMax,
    };
  };
  const currency = (currency: string = 'PLN', precisionMin: number, precisionMax: number) => {
    return {
      style: 'currency',
      currency: currency,
      notation: 'standard',
      minimumFractionDigits: precisionMin,
      maximumFractionDigits: precisionMax,
    };
  };

  function roundTo(
    inputValue: string | number,
    precision: number,
    option: RoundOption = 'round',
  ): number | null {
    if (inputValue || parseFloat(inputValue as string) == 0) {
      let value = (inputValue + '').replaceAll(',', '.');
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

  function formattedNumber(
    value: number,
    type: NumberFormattingType = 'decimal',
    precisionMin: number = 0,
    precisionMax: number = 0,
  ) {
    if (value) {
      value = Number(value);
      switch (type) {
        case 'decimal':
          return n(value, decimal(precisionMin, precisionMax) as any);
        case 'percent':
          return n(value / 100, percent(precisionMin, precisionMax) as any);
        default:
          console.warn('Number formatting type nod found');
      }
    }
    return null;
  }

  function formattedCurrency(value: number, options: CurrencyFormatterOptions) {
    if (value) {
      value = roundTo(value, options.precision, options.roundOption) as number;
      return n(
        value,
        currency(options.currencySymbol, options.precisionMin, options.precision) as any,
      );
    }
    return null;
  }

  return { roundTo, formattedNumber, formattedCurrency };
}
