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

  async function resolve(
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

  function doSthWithValue(
    field: any,
    value: any,
    valueProps: VariableSyntaxProps,
    title: string,
    rawNumber = false,
  ) {
    if (valueProps.typeOfValue == 'DATETIME' && value) {
      if (!dayjs(value).isValid()) return value;
      if (valueProps.defaultValue == value) return value;
      return dayjs(value).format(dateTimeFormat.value);
    }

    if (valueProps.typeOfValue == 'DATE' && value) {
      if (valueProps.defaultValue == value) return;
      return dayjs(value).format(dateFormat.value);
    }

    if (value == 0) {
      return value;
    }
    if (typeof value === 'number' && value !== 0) {
      if (rawNumber) {
        // gdy chcemy używać liczb w adresie URL to nie może być to kropka ani nie może być to formatowane
        // TODO
        value = Number(value);
        if (!!value && !isNaN(value)) {
          value = value + '';
          value = value?.replaceAll(',', '.');
        }
      } else {
        value = formattedNumber(
          value,
          'decimal',
          valueProps.formatterProps
            ? valueProps.formatterProps
            : field.precisionMin
              ? Number(field.precisionMin)
              : 0,
          valueProps.formatterProps
            ? valueProps.formatterProps
            : field.precision
              ? Number(field.precision)
              : 2,
        );
      }
    }
    if (
      typeof value === 'string' &&
      dayjs(value).isValid() &&
      value.length == 10 &&
      (value.includes('/') || value.includes('.') || value.includes('-'))
    ) {
      value = dayjs(value).format(dateFormat.value);
    }
    if (typeof value == 'object' && value !== null) {
      value = value[title];
    }

    if (
      (value == null && valueProps.defaultValue !== null) ||
      (value == '' && value != 0) ||
      value == undefined ||
      value == ''
    ) {
      value = valueProps.defaultValue;
    }

    return value;
  }

  return { resolve, fillPath };
}
