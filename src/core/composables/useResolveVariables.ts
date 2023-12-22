import get from 'lodash/get';
import { variableRegexp } from '../engine/utils';

export function useResolveVariables(inputString: string, formModel: object) {
  let allVariablesResolved = true;

  inputString.match(variableRegexp)?.forEach((match: string) => {
    const value = get(formModel, match.slice(1, -1), null);
    if (!value) {
      allVariablesResolved = false;
    }
    inputString = inputString.replace(match, value + '');
  });

  return { resolvedText: inputString, allVariablesResolved };
}
