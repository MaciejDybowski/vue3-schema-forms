import get from 'lodash/get';
import { variableRegexp } from '../engine/utils';
import { useFormModelStore } from '../../store/formModelStore';
import dayjs from 'dayjs';

export function useResolveVariables(inputString: string, formId: string, formatNumber: (input: number) => string) {
  let allVariablesResolved = true;
  const formModelStore = useFormModelStore(formId);


  inputString.match(variableRegexp)?.forEach((match: string) => {
    const unwrapped = match.slice(1, -1);
    const split = unwrapped.split(':');
    const variable = split[0];
    const defaultValue = split.length === 2 ? split[1] : null;

    let value = get(formModelStore.getFormModel, variable, defaultValue);

    if (typeof value === 'number') {
      value = formatNumber(value);
    }
    if (typeof value === 'string' && dayjs(value).isValid() && value.length >= 10) {
      value = dayjs(value).tz().format('DD/MM/YYYY');
    }

    if (!value) {
      allVariablesResolved = false;
    }
    inputString = inputString.replace(match, value + '');
  });

  return { resolvedText: inputString, allVariablesResolved };
}
