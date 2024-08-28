import { Expression, Value } from "expr-eval";
import get from "lodash/get";
import { ref } from "vue";

import { EngineField } from "@/types/engine/EngineField";

import { useFormModelStore } from "../../store/formModelStore";
import betterParser from "../engine/evalExprParser";
import { usePreparedModelForExpression } from "@/core/composables/usePreparedModelForExpression";

export function useConditionalRendering(schema: EngineField) {
  const formModelStore = useFormModelStore(schema.formId);
  const shouldRender = ref(!schema.layout.if);

  let model = {} as unknown;

  if (!shouldRender.value) {
    let myExpr: Expression = betterParser.parse(schema.layout.if as string);
    model = usePreparedModelForExpression(schema);
    if (myExpr.variables({ withMembers: true }).every((variable) => get(model, variable, null) !== null)) {
      shouldRender.value = myExpr.evaluate(model as Value);
    }

    formModelStore.$subscribe(() => {
      model = usePreparedModelForExpression(schema);
      if (myExpr.variables({ withMembers: true }).every((variable) => get(model, variable, null) !== null)) {
        shouldRender.value = myExpr.evaluate(model as Value);
      }
    });
  }



  return { shouldRender };
}
