import get from 'lodash/get';
import { variableRegexp } from '../engine/utils';
import { useFormModelStore } from '@/store/formModelStore';

export function useResolveVariables(inputString: string, formId: string) {
  let allVariablesResolved = true;
  const formModelStore = useFormModelStore(formId)

  inputString.match(variableRegexp)?.forEach((match: string) => {
    const value = get(formModelStore.getFormModel, match.slice(1, -1), null);
    if (!value) {
      allVariablesResolved = false;
    }
    inputString = inputString.replace(match, value + '');
  });

  return { resolvedText: inputString, allVariablesResolved };
}
