import { computed } from 'vue';

import dayjs from '@/components/controls/date/dayjs';

export function useDateFormat() {
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
