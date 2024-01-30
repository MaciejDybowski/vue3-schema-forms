import { useLocale } from './useLocale';
import { computed } from 'vue';

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

  return { dateFormat };
}
