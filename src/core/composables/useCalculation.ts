import { Expression, Value } from "expr-eval";
import get from "lodash/get";
import set from "lodash/set";
import { computed, ref, watch } from "vue";

import { EngineOptions } from "@/types/engine/EngineOptions";

import betterParser, { SUM } from "../engine/evalExprParser";

export function useCalculation(key: string, calculation: string, model: object, formOptions: EngineOptions): number {
  const digitsAfterDecimalLocal = computed(() => {
    return formOptions.digitsAfterDecimal || 2;
  });

  let result = ref(0);
  let originalCalc = calculation;

  let myExpr: Expression = prepareCalcExpression(calculation, model);

  myExpr.variables({ withMembers: true }).forEach((variable) => {
    if (get(model, variable, null) == null) {
      set(model, variable, 0);
    }
  });
  result.value = myExpr.evaluate(model as Value);

  watch(model, () => {
    myExpr = prepareCalcExpression(originalCalc, model);
    executeCalc();
  });

  watch(
    formOptions,
    () => {
      executeCalc();
    },
    { deep: true },
  );

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

  function roundToDecimal(value: number, decimalPlaces: number): number {
    const factor = Math.pow(10, isNaN(decimalPlaces) ? 2 : decimalPlaces);
    return Math.round(value * factor) / factor;
  }

  return roundToDecimal(result.value, digitsAfterDecimalLocal.value);
}
