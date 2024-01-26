import { Expression, Value } from "expr-eval";
import { ref, Ref } from "vue";
import betterParser from "../engine/evalExprParser";
import { useFormModelStore } from "../../store/formModelStore";
import { EngineField } from "@/vocabulary/engine";
import get from 'lodash/get';

export function useConditionalRendering(schema: EngineField) {
  const formModelStore = useFormModelStore(schema.formId);
  const shouldRender = ref(!schema.layout.if);

  if (!shouldRender.value) {
    let myExpr: Expression = betterParser.parse(schema.layout.if as string);

    if (myExpr.variables({withMembers: true}).every((variable) => get(formModelStore.getFormModel, variable, null) !== null)) {
      shouldRender.value = myExpr.evaluate(formModelStore.getFormModel as Value);
    }

    formModelStore.$subscribe(() => {
      if (myExpr.variables({withMembers: true}).every((variable) => get(formModelStore.getFormModel, variable, null) !== null)) {
        shouldRender.value = myExpr.evaluate(formModelStore.getFormModel as Value);
      }
    });
  }

  return { shouldRender };
}
