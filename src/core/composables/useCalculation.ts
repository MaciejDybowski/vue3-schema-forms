import { ComputedRef, Ref, ref, unref, watch } from "vue";
import { Expression, Value } from "expr-eval";
import set from "lodash/set";
import betterParser from "../engine/evalExprParser";

export function useCalculation(key: string, calculation: string, model: object, digitsAfterDecimal: ComputedRef<number>): number {
  // ref/unref computed value because were warning about override readonly computed value
  const digitsAfterDecimalLocal = isNaN(digitsAfterDecimal.value)
    ? ref(2)
    : ref(unref(getDigitsAfterDecimal(digitsAfterDecimal)));
  let result = ref(0);
  let myExpr: Expression = betterParser.parse(calculation);
  if (myExpr.variables().every((variable) => variable in model)) {
    result.value = myExpr.evaluate(model as Value);
  }

  watch(model, () => {
    if (myExpr.variables().every((variable) => variable in model)) {
      result.value = myExpr.evaluate(model as Value);
      set(model, key, roundToDecimal(result.value, digitsAfterDecimalLocal.value));
    }
  });

  watch(digitsAfterDecimal, () => {
    digitsAfterDecimalLocal.value = getDigitsAfterDecimal(digitsAfterDecimal);
    if (myExpr.variables().every((variable) => variable in model)) {
      result.value = myExpr.evaluate(model as Value);
      set(model, key, roundToDecimal(result.value, digitsAfterDecimalLocal.value));
    }
  });

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

function roundToDecimal(value: number, decimalPlaces: number): number {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(value * factor) / factor;
}
