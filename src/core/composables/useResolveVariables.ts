import { useFormModelStore } from '../../store/formModelStore';
import { useFormattedNumber } from '../../core/composables';
import { EngineField } from '../../vocabulary/engine';
import { useDateFormat } from './useDateFormat';
import get from 'lodash/get';
import { variableRegexp } from '../engine/utils';
import dayjs from '../../components/controls/date/dayjs';

export function useResolveVariables(field: EngineField) {
  const formModelStore = useFormModelStore(field.formId);
  const { formatNumber } = useFormattedNumber(field.options);
  const { dateFormat } = useDateFormat();

  function resolve(inputString: string) {
    let allVariablesResolved = true;

    inputString?.match(variableRegexp)?.forEach((match: string) => {
      const unwrapped = match.slice(1, -1);
      const split = unwrapped.split(':');
      const variable = split[0];
      const defaultValue = split.length === 2 ? split[1] : null;

      let value = get(formModelStore.getFormModel, variable, defaultValue);

      if (typeof value === 'number') {
        value = formatNumber(value);
      }
      if (typeof value === 'string' && dayjs(value).isValid() && value.length >= 10) {
        value = dayjs(value).format(dateFormat.value);
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
