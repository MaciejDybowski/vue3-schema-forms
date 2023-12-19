import get from 'lodash/get';

export function useResolveVariables(url: string, formModel: object) {
  let allVariablesResolved = true;

  url.match(new RegExp('{.*?}', 'g'))?.forEach((match: string) => {
    const value = get(formModel, match.slice(1, -1), null);
    if (!value) {
      allVariablesResolved = false;
    }
    url = url.replace(match, value+"");
  });

  return { url, allVariablesResolved };
}
