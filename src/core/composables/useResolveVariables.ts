import get from 'lodash/get';

import dayjs from '@/components/controls/date/dayjs';

import { useNumber } from '@/core/composables/useNumber';
import { usePreparedModelForExpression } from '@/core/composables/usePreparedModelForExpression';
import { EngineField } from '@/types/engine/EngineField';

import { variableRegexp } from '../engine/utils';
import { useDateFormat } from './useDateFormat';

export function useResolveVariables() {
  const { dateFormat } = useDateFormat();
  const { formattedNumber } = useNumber();

  function resolve(field: EngineField, inputString: string, title: string = 'title') {
    let allVariablesResolved = true;

    inputString?.match(variableRegexp)?.forEach((match: string) => {
      const unwrapped = match.slice(1, -1);
      const split = unwrapped.split(':');
      const variable = split[0];

      const defaultValue = split.length === 2 ? split[1] : null;

      const model = usePreparedModelForExpression(field);

      let value = get(model, variable, defaultValue);
      if (typeof value === 'number' && value !== 0) {
        value = formattedNumber(value, 'decimal', field.precision ? Number(field.precision) : 2);
      }
      if (
        typeof value === 'string' &&
        dayjs(value).isValid() &&
        value.length == 10 &&
        (value.includes('/') || value.includes('.') || value.includes('-'))
      ) {
        value = dayjs(value).format(dateFormat.value);
      }
      if (typeof value == 'object' && value !== null) {
        value = value[title];
      }

      if (value == null && defaultValue !== null) {
        value = defaultValue;
      }
      if (!value) {
        allVariablesResolved = false;
      }
      inputString = inputString.replace(match, value + '');
    });

    return { resolvedText: inputString, allVariablesResolved };
  }

  return { resolve };
}
