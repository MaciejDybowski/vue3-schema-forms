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

  async function resolveJsonata(
    field: EngineField,
    match: string,
  ): Promise<{ value: any; success: boolean }> {
    let expression = match.slice(1, -1).slice(5, -1); // Remove {{nata and last }}
    expression = fillPath(field.path, field.index, expression);
    await new Promise((r) => setTimeout(r, 30));
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
        ? await resolveJsonata(field, match)
        : await resolveVariable(field, match, forUrlPurpose, objectTitleReference);

      if (!success) {
        allVariablesResolved = false;
      } else {
        inputString = inputString.replace(match, String(value ?? ''));
      }
    }

    return { resolvedText: inputString, allVariablesResolved: allVariablesResolved };
  }

  function fillPath(
    fieldPath: string | undefined,
    fieldIndex: number | undefined,
    variable: string,
  ) {
    if (!fieldPath || fieldIndex === undefined) return variable;

    const pathSegments = fieldPath.split('.');

    const segmentIndexMap: Record<string, number | null> = {};
    for (const segment of pathSegments) {
      const match = segment.match(/^([^\[\]]+)(\[(\d*)\])?$/);
      if (match) {
        const name = match[1];
        const idx = match[3] !== undefined && match[3] !== '' ? parseInt(match[3], 10) : null;
        segmentIndexMap[name] = idx;
      }
    }

    let updatedVariable = variable;

    for (const [name, idx] of Object.entries(segmentIndexMap)) {
      const regex = new RegExp(`(${name})\\[\\]`, 'g');
      const replacementIdx = idx !== null ? idx : fieldIndex;
      updatedVariable = updatedVariable.replace(regex, `${name}[${replacementIdx}]`);
    }

    return updatedVariable;
  }

  function doValueFormatting(field: any, value: any, valueProps: VariableSyntaxProps) {
    const { typeOfValue, defaultValue, formatterProps, titleReference, rawNumber } = valueProps;

    const isValidDate = (val: any) => dayjs(val).isValid();

    if (typeOfValue === 'TEXT' && value) {
      return value + '';
    }

    if (typeOfValue === 'DATETIME' && value) {
      if (!isValidDate(value) || defaultValue === value) return value;
      return dayjs(value).format(dateTimeFormat.value);
    }

    if (typeOfValue === 'DATE' && value) {
      if (defaultValue === value) return;
      return dayjs(value).format(dateFormat.value);
    }

    if (((typeOfValue === 'OBJECT' && value) || typeof value === 'object') && value != null) {
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
