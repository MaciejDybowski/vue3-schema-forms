import jsonata from 'jsonata';

import { useNumber } from '@/core/composables/useNumber';
import { useInjectedFormModel } from '@/core/state/useFormModelProvider';
import { EngineField } from '@/types/engine/EngineField';

import dayjs from '../../components/controls/date/dayjs';
import { variableRegexp } from '../engine/utils';
import { useDateFormat } from './useDateFormat';

interface VariableSyntaxProps {
  defaultValue: any;
  typeOfValue: any;
  formatterProps: any;
}

export function useResolveVariables() {
  const { dateFormat, dateTimeFormat } = useDateFormat();
  const { formattedNumber, roundTo } = useNumber();
  const form = useInjectedFormModel();

  /**
   *
   * @param match - for resolve jsonata function in paragraph or other static content field
   */
  async function resolveJsonata(match: string): Promise<{ value: any; success: boolean }> {
    const expression = match.slice(1, -1).slice(5, -1); // Remove {{nata and last }}
    const model = form.getFormModelForResolve.value;
    const value = await jsonata(expression).evaluate(model);
    return { value, success: value !== null && value !== undefined };
  }

  async function resolveVariable(
    field: EngineField,
    match: string,
    title: string,
    rawNumber: boolean
  ): Promise<{ value: any; success: boolean }> {
    let [variable, defaultValue, typeOfValue, formatterProps] = match.slice(1, -1).split(':');

    const valueProps: VariableSyntaxProps = {
      defaultValue,
      typeOfValue,
      formatterProps,
    };

    const model = form.getFormModelForResolve.value;

    if (variable.includes('[]') && field.path) {
      variable = fillPath(field.path, field.index as number, variable);
    }

    const nata = jsonata(variable);
    let value = await nata.evaluate(model);
    value = doSthWithValue(field, value, valueProps, title, rawNumber);

    return { value, success: value !== null && value !== undefined && value !== '' };
  }

  // TODO testy jednostkowe do tej funkcji
  async function resolve(
    field: EngineField,
    inputString: string,
    title = 'title',
    rawNumber = false,
  ): Promise<{ resolvedText: string; allVariablesResolved: boolean }> {
    let allVariablesResolved = true;
    const matches = inputString.match(variableRegexp);

    if (!matches) return { resolvedText: inputString, allVariablesResolved };

    for await (const match of matches) {
      const isNata = match.includes('nata');
      const { value, success } = isNata
        ? await resolveJsonata(match)
        : await resolveVariable(field, match, title, rawNumber);

      if (!success) {
        allVariablesResolved = false;
      }

      inputString = inputString.replace(match, String(value ?? ''));
    }

    return { resolvedText: inputString, allVariablesResolved };
  }

  async function resolveOLD(
    field: EngineField,
    inputString: string,
    title: string = 'title',
    rawNumber = false,
  ) {
    let allVariablesResolved = true;

    const arrayOfVariables = inputString.match(variableRegexp);
    if (!!arrayOfVariables) {
      for await (const match of arrayOfVariables) {
        // obsluga jsonata funkcji w { } do umieszczenia w tekście
        if (match.includes('nata')) {
          const unwrapped = match.slice(1, -1);
          let jsonataExpression = unwrapped.slice(5);
          jsonataExpression = jsonataExpression.substring(0, jsonataExpression.length - 1);
          const model = form.getFormModelForResolve.value;
          const nata = jsonata(jsonataExpression);
          let value = await nata.evaluate(model);
          if (!value && value != 0) {
            allVariablesResolved = false;
          } else {
            inputString = inputString.replace(match, value + '');
          }
        } else {
          // obsluga zmiennych standardowo jak bylo
          const unwrapped = match.slice(1, -1);
          const split = unwrapped.split(':');
          let variable = split[0];
          const defaultValue = split.length >= 2 ? split[1] : null;
          const typeOfValue = split.length >= 3 ? split[2] : null;
          const formatterProps = split.length == 4 ? split[3] : null;
          const valueProps: VariableSyntaxProps = {
            defaultValue: defaultValue,
            typeOfValue: typeOfValue,
            formatterProps: formatterProps,
          };

          const model = form.getFormModelForResolve.value;
          if (variable.includes('[]') && field.path) {
            variable = fillPath(field.path, field.index as number, variable);
          }

          const nata = jsonata(variable);
          let value = await nata.evaluate(model);

          value = doSthWithValue(field, value, valueProps, title, rawNumber);
          inputString = inputString.replace(match, value + '');

          if (!value && value != 0) {
            allVariablesResolved = false;
          }
        }
      }
    }

    return { resolvedText: inputString, allVariablesResolved };
  }


  function fillPath(
    fieldPath: string | undefined,
    fieldIndex: number | undefined,
    variable: string,
  ) {
    if (!fieldPath) return variable;

    const splitPath = fieldPath.split('.');
    const splitVariable = variable.split('.');
    const updatedVariable = matchArrays(splitPath, splitVariable).join('.');
    return updatedVariable.replaceAll('[]', `[${fieldIndex}]`);
  }

  function matchArrays(arrayA: string[], arrayB: string[]): string[] {
    const extractName = (field: string) => field.split('[')[0];
    const nameSetA = new Set(arrayA.map(extractName));

    return arrayB.map((itemB) =>
      itemB.includes('[]') && nameSetA.has(extractName(itemB))
        ? arrayA.find((a) => extractName(a) === extractName(itemB))!
        : itemB,
    );
  }

  // TODO - refaktoryzacja + testy dla tej funkcji
  function doSthWithValue(
    field: any,
    value: any,
    valueProps: VariableSyntaxProps,
    title: string,
    rawNumber = false,
  ) {
    const { typeOfValue, defaultValue, formatterProps } = valueProps;

    const isValidDate = (val: any) => dayjs(val).isValid();
    const isDateString = (val: string) =>
      typeof val === 'string' &&
      val.length === 10 &&
      (val.includes('/') || val.includes('.') || val.includes('-')) &&
      isValidDate(val);

    if (typeOfValue === 'DATETIME' && value) {
      if (!isValidDate(value) || defaultValue === value) return value;
      return dayjs(value).format(dateTimeFormat.value);
    }

    if (typeOfValue === 'DATE' && value) {
      if (defaultValue === value) return;
      return dayjs(value).format(dateFormat.value);
    }

    if (value === 0) return value;

    if (typeof value === 'number') {
      if (rawNumber) {
        const numeric = Number(value);
        if (!isNaN(numeric)) {
          return String(numeric).replaceAll(',', '.');
        }
      } else {
        const minPrecision = formatterProps
          ? formatterProps
          : field.precisionMin
            ? Number(field.precisionMin)
            : 0;

        const maxPrecision = formatterProps
          ? formatterProps
          : field.precision
            ? Number(field.precision)
            : 2;

        return formattedNumber(value, 'decimal', minPrecision, maxPrecision);
      }
    }

    if (isDateString(value)) {
      return dayjs(value).format(dateFormat.value);
    }

    if (typeof value === 'object' && value !== null) {
      value = value[title];
    }

    const isEmpty =
      value === null ||
      value === undefined ||
      (value === '' && value !== 0);

    if (isEmpty && defaultValue !== null) {
      value = defaultValue;
    }

    return value;
  }

  return { resolve, fillPath };
}
