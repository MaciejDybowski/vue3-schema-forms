import { Expression, Value } from "expr-eval"
import { Ref, watch } from "vue"
import betterParser from "../engine/evalExprParser"

export function useConditionalRendering(
  condition: string,
  model: object,
  resultRef: Ref<Boolean>
): void {
  let myExpr: Expression = betterParser.parse(condition)

  if (myExpr.variables().every(variable => variable in model)) {
    resultRef.value = myExpr.evaluate(model as Value)
  }

  watch(model, () => {
    if (myExpr.variables().every(variable => variable in model)) {
      resultRef.value = myExpr.evaluate(model as Value)
    }
  })
}
