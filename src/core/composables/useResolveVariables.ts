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
  titleReference: string;
  rawNumber: boolean;
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
    rawNumber: boolean,
    titleReference: string,
  ): Promise<{ value: any; success: boolean }> {
    let [variable, defaultValue, typeOfValue, formatterProps] = match.slice(1, -1).split(':');

    const valueProps: VariableSyntaxProps = {
      defaultValue,
      typeOfValue,
      formatterProps,
      titleReference: titleReference,
      rawNumber: rawNumber,
    };

    const model = form.getFormModelForResolve.value;

    if (variable.includes('[]') && field.path) {
      variable = fillPath(field.path, field.index as number, variable);
    }

    const nata = jsonata(variable);
    let value = await nata.evaluate(model);
    value = doValueFormatting(field, value, valueProps);

    return { value, success: value !== null && value !== undefined && value !== '' };
  }

  async function resolve(
    field: EngineField,
    inputString: string,
    forUrlPurpose = false,
    objectTitleReference = 'title',
  ): Promise<{ resolvedText: string; allVariablesResolved: boolean }> {
    let allVariablesResolved = true;
    const matches = inputString.match(variableRegexp);

    if (!matches) return { resolvedText: inputString, allVariablesResolved };

    for await (const match of matches) {
      const isNata = match.includes('nata');
      const { value, success } = isNata
        ? await resolveJsonata(match)
        : await resolveVariable(field, match, forUrlPurpose, objectTitleReference);

      if (!success) {
        allVariablesResolved = false;
      }

      inputString = inputString.replace(match, String(value ?? ''));
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

  function doValueFormatting(field: any, value: any, valueProps: VariableSyntaxProps) {
    const { typeOfValue, defaultValue, formatterProps, titleReference, rawNumber } = valueProps;

    const isValidDate = (val: any) => dayjs(val).isValid();

    if (typeOfValue === 'DATETIME' && value) {
      if (!isValidDate(value) || defaultValue === value) return value;
      return dayjs(value).format(dateTimeFormat.value);
    }

    if (typeOfValue === 'DATE' && value) {
      if (defaultValue === value) return;
      return dayjs(value).format(dateFormat.value);
    }

    if (typeOfValue === 'OBJECT' && value) {
      value = value[titleReference];
    }

    if ((typeOfValue === 'NUMBER' && value) || typeof value === 'number') {
      if (value === 0) return value;

      const numeric = Number(value);

      const minPrecision = formatterProps ?? Number(field.precisionMin ?? 0);
      const maxPrecision = formatterProps ?? Number(field.precision ?? 2);

      return rawNumber && !isNaN(numeric)
        ? String(numeric).replaceAll(',', '.')
        : formattedNumber(numeric, 'decimal', minPrecision, maxPrecision);
    }

    const isEmpty = value === null || value === undefined || (value === '' && value !== 0);

    if (isEmpty && defaultValue !== null) {
      value = defaultValue;
    }

    return value;
  }

  return { resolve, fillPath };
}
