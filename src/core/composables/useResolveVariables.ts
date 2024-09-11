import get from 'lodash/get';

import dayjs from '@/components/controls/date/dayjs';

import { EngineField } from '@/types/engine/EngineField';

import { useFormattedNumber } from '../../core/composables';
import { variableRegexp } from '../engine/utils';
import { useDateFormat } from './useDateFormat';
import { usePreparedModelForExpression } from '@/core/composables/usePreparedModelForExpression';

export function useResolveVariables(field: EngineField) {
  const { formatNumber } = useFormattedNumber(field.options);
  const { dateFormat } = useDateFormat();


  function resolve(inputString: string, title: string = 'title') {
    let allVariablesResolved = true;

    inputString?.match(variableRegexp)?.forEach((match: string) => {
      const unwrapped = match.slice(1, -1);
      const split = unwrapped.split(':');
      const variable = split[0];

      const defaultValue = split.length === 2 ? split[1] : null;

      const model = usePreparedModelForExpression(field);

      let value = get(model, variable, defaultValue);

      if (typeof value === 'number') {
        value = formatNumber(value);
      }
      if (typeof value === 'string' && dayjs(value).isValid() && value.length == 10
        && (value.includes('/') || value.includes('.') || value.includes('-'))) {
        value = dayjs(value).format(dateFormat.value);
      }
      if (typeof value == 'object' && value !== null) {
        value = value[title];
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
