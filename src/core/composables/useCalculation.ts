import { ref, watch } from "vue"
import { Expression, Parser, Value } from "expr-eval"
import set from "lodash/set"
import betterParser from "../engine/evalExprParser"

export function useCalculation(
  key: string,
  calculation: string,
  model: object
): number {
  let result = ref(0)
  let myExpr: Expression = betterParser.parse(calculation)
  if (myExpr.variables().every(variable => variable in model)) {
    result.value = myExpr.evaluate(model as Value)
  }

  watch(model, () => {
    if (myExpr.variables().every(variable => variable in model)) {
      result.value = myExpr.evaluate(model as Value)
      set(model, key, result.value)
    }
  })

  return result.value
}
