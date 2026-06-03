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
  const { n, locale } = useI18n();

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
    if (value || value == 0) {
      value = Number(value);
      if (!Number.isFinite(value)) return null;

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

  function cleanFormattedNumber(numStr: string): string {
    const decimalSeparator = getDecimalSeparator(locale.value);
    let cleaned = String(numStr).trim();
    const hasDot = cleaned.includes('.');
    const hasComma = cleaned.includes(',');

    cleaned = cleaned.replace(/[\s\u00A0']/g, '');

    if (hasDot && hasComma) {
      const thousandSeparator = decimalSeparator === ',' ? '.' : ',';
      cleaned = cleaned.replaceAll(thousandSeparator, '');
    }

    return cleaned;
  }

  function getDecimalSeparator(inputLocale: string = locale.value): string {
    const decimalSeparators: Record<string, string> = {
      'pl-PL': ',',
      pl: ',',
      'de-DE': ',',
      de: ',',
      'fr-FR': ',',
      fr: ',',
      'es-ES': ',',
      es: ',',
      'it-IT': ',',
      it: ',',
      'ru-RU': ',',
      ru: ',',
      'en-US': '.',
      'en-GB': '.',
      en: '.',
      'ja-JP': '.',
      ja: '.',
    };

    if (decimalSeparators[inputLocale]) return decimalSeparators[inputLocale];

    try {
      const decimalPart = Intl.NumberFormat(inputLocale)
        .formatToParts(1.1)
        .find((part) => part.type === 'decimal');

      return decimalPart?.value || '.';
    } catch {
      return '.';
    }
  }

  function isValidNumberInput(value: string, integer = false): boolean {
    const normalizedValue = normalizeNumberInput(value);

    if (integer) return /^-?\d*$/.test(normalizedValue);
    return /^-?\d*(\.\d*)?$/.test(normalizedValue);
  }

  function normalizeNumberInput(value: string): string {
    let normalizedValue = value.trim().replace(/[\s\u00A0']/g, '');
    const lastCommaIndex = normalizedValue.lastIndexOf(',');
    const lastDotIndex = normalizedValue.lastIndexOf('.');

    if (lastCommaIndex !== -1 && lastDotIndex !== -1) {
      if (lastCommaIndex > lastDotIndex) {
        return normalizedValue.replaceAll('.', '').replace(',', '.');
      }

      return normalizedValue.replaceAll(',', '');
    }

    return normalizedValue.replace(',', '.');
  }

  function preventInvalidNumberInput(event: InputEvent, integer = false) {
    if (event.data == null) return;

    const target = event.target as HTMLInputElement | null;
    if (!target) return;

    const selectionStart = target.selectionStart ?? target.value.length;
    const selectionEnd = target.selectionEnd ?? target.value.length;
    const nextValue = `${target.value.slice(0, selectionStart)}${event.data}${target.value.slice(selectionEnd)}`;

    if (!isValidNumberInput(nextValue, integer)) {
      event.preventDefault();
    }
  }

  return {
    roundTo,
    formattedNumber,
    formattedCurrency,
    cleanFormattedNumber,
    getDecimalSeparator,
    preventInvalidNumberInput,
  };
}
