import jsonata from 'jsonata';

import { variableRegexp } from '@/core/engine/utils';

export function useVariableParser() {
  async function parse(
    input: string,
    model: object,
  ): Promise<{ resolvedText: string; allVariablesResolved: boolean }> {
    let allVariablesResolved = true;
    const matches = input.match(variableRegexp);
    if (!matches) return { resolvedText: input, allVariablesResolved: false };

    for await (const match of matches) {
      const isNata = match.includes('nata');
      const { value, success } = isNata
        ? await resolveJsonata(match, model)
        : await resolveVariable(match, model);

      if (!success) {
        allVariablesResolved = false;
      }

      input = input.replace(match, String(value ?? ''));
    }

    return { resolvedText: input, allVariablesResolved };
  }

  async function resolveJsonata(
    input: string,
    model: object,
  ): Promise<{ value: any; success: boolean }> {
    let expression = input.slice(1, -1).slice(5, -1); // Remove {{nata and last }}
    const value = await jsonata(expression).evaluate(model);

    return { value, success: value !== null && value !== undefined };
  }

  async function resolveVariable(
    input: string,
    model: object,
  ): Promise<{ value: any; success: boolean }> {
    const variable = input.slice(1, -1);
    const nata = jsonata(variable);
    const value = await nata.evaluate(model);
    return { value, success: value !== null && value !== undefined && value !== '' };
  }

  return { parse };
}
