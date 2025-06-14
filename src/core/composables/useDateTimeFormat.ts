import { computed } from 'vue';

import { useLocale } from './useLocale';

export function useDateTimeFormat() {
  const { locale } = useLocale();

  const dateFormat = computed(() => {
    switch (locale.value) {
      case 'pl':
        return 'DD.MM.YYYY HH:mm';
      case 'en':
        return 'MM/DD/YYYY HH:mm';
      default:
        return 'MM/DD/YYYY HH:mm';
    }
  });

  return { dateFormat };
}
