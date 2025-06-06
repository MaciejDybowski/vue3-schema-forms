import dayjs from 'dayjs';

import { computed } from 'vue';

import { useLocale } from './useLocale';

export function useDateFormat() {
  const { locale } = useLocale();

  const dateFormat = computed(() => {
    return dayjs().localeData().longDateFormat('L');
  });

  const dateTimeFormat = computed(() => {
    return (
      dayjs().localeData().longDateFormat('L') + ' ' + dayjs().localeData().longDateFormat('LTS')
    );
  });

  return { dateFormat, dateTimeFormat };
}
