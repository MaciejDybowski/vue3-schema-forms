import { ComputedRef, Ref, ref, unref, watch } from 'vue';
import { Expression, Value } from 'expr-eval';
import set from 'lodash/set';
import betterParser, { SUM } from '../engine/evalExprParser';

export function useCalculation(key: string, calculation: string, model: object, digitsAfterDecimal: ComputedRef<number>): number {
  // ref/unref computed value because were warning about override readonly computed value
  const digitsAfterDecimalLocal = isNaN(digitsAfterDecimal.value)
    ? ref(2)
    : ref(unref(getDigitsAfterDecimal(digitsAfterDecimal)));
  let result = ref(0);
  let originalCalc = calculation;

  let myExpr: Expression = prepareCalcExpression(calculation, model);
  if (myExpr.variables().every((variable) => variable in model)) {
    result.value = myExpr.evaluate(model as Value);
  }

  watch(model, () => {
    myExpr = prepareCalcExpression(originalCalc, model);
    executeCalc();
  });

  watch(digitsAfterDecimal, () => {
    digitsAfterDecimalLocal.value = getDigitsAfterDecimal(digitsAfterDecimal);
    executeCalc();
  });

  function executeCalc(): void {
    if (myExpr.variables().every((variable) => variable in model)) {
      result.value = myExpr.evaluate(model as Value);
      set(model, key, roundToDecimal(result.value, digitsAfterDecimalLocal.value));
    }
  }

  function prepareCalcExpression(calculation: string, model: object): Expression {
    calculation = SUM(calculation, model);
    return betterParser.parse(calculation);
  }

  return roundToDecimal(result.value, digitsAfterDecimalLocal.value);
}

function getDigitsAfterDecimal(actual: Ref<number>): number {
  if (actual.value !== null) {
    if (actual.value > 10) {
      return 10;
    } else {
      return actual.value;
    }
  } else {
    return 2;
  }
}

export function roundToDecimal(value: number, decimalPlaces: number): number {
  const factor = Math.pow(10, isNaN(decimalPlaces) ? 2 : decimalPlaces);
  return Math.round(value * factor) / factor;
}
