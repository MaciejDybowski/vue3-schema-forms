import { computed } from 'vue';

import { useLocale } from './useLocale';

export function useDateFormat() {
  const { locale } = useLocale();

  const dateFormat = computed(() => {
    switch (locale.value) {
      case 'pl':
        return 'DD.MM.YYYY';
      case 'en':
        return 'MM/DD/YYYY';
      default:
        return 'MM/DD/YYYY';
    }
  });

  const dateTimeFormat = computed(() => {
    switch (locale.value) {
      case 'pl':
        return 'DD.MM.YYYY HH:mm';
      case 'en':
        return 'MM/DD/YYYY hh:mm A';
      default:
        return 'MM/DD/YYYY hh:mm A';
    }
  });

  return { dateFormat, dateTimeFormat };
}
