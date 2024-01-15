import get from 'lodash/get';
import { variableRegexp } from '../engine/utils';
import { useFormModelStore } from '../../store/formModelStore';

export function useResolveVariables(inputString: string, formId: string) {
  let allVariablesResolved = true;
  const formModelStore = useFormModelStore(formId);

  inputString.match(variableRegexp)?.forEach((match: string) => {
    const unwrapped = match.slice(1, -1);
    const split = unwrapped.split(':');
    const variable = split[0];
    const defaultValue = split.length === 2 ? split[1] : null;

    const value = get(formModelStore.getFormModel, variable, defaultValue);
    if (!value) {
      allVariablesResolved = false;
    }
    inputString = inputString.replace(match, value + '');
  });

  return { resolvedText: inputString, allVariablesResolved };
}
