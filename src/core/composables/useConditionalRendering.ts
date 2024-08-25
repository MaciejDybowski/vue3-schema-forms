import { Expression, Value } from "expr-eval";
import get from "lodash/get";
import { ref } from "vue";

import { EngineField } from "@/types/engine/EngineField";

import { useFormModelStore } from "../../store/formModelStore";
import betterParser from "../engine/evalExprParser";

export function useConditionalRendering(schema: EngineField) {
  const formModelStore = useFormModelStore(schema.formId);
  const shouldRender = ref(!schema.layout.if);

  let model = {} as unknown;

  if (!shouldRender.value) {
    let myExpr: Expression = betterParser.parse(schema.layout.if as string);
    model = prepareModelForResolveExpression(schema);
    if (myExpr.variables({ withMembers: true }).every((variable) => get(model, variable, null) !== null)) {
      shouldRender.value = myExpr.evaluate(model as Value);
    }

    formModelStore.$subscribe(() => {
      model = prepareModelForResolveExpression(schema);
      if (myExpr.variables({ withMembers: true }).every((variable) => get(model, variable, null) !== null)) {
        shouldRender.value = myExpr.evaluate(model as Value);
      }
    });
  }

  function prepareModelForResolveExpression(schema: EngineField) {
    let modelForResolveExpression = {};
    if ("index" in schema && "path" in schema && typeof schema.path == "string" && typeof schema.index == "number") {
      modelForResolveExpression = JSON.parse(JSON.stringify(formModelStore.getFormModel));

      // remove root of duplicated section which is parent for the field: ex. invoice.items.fieldA so delete invoice from model and merge
      // exact local model from array of ivoice for resolve expresion
      if (get(modelForResolveExpression, schema.path, null) !== null) {
        delete modelForResolveExpression[schema.path.split(".")[0]];
      }

      const duplicatedSectionArrayModel = get(formModelStore.getFormModel, schema.path, null);
      const exactLocalDuplicatedSectionModel =
        duplicatedSectionArrayModel != null ? duplicatedSectionArrayModel[schema.index] : {};

      modelForResolveExpression = { ...modelForResolveExpression, ...exactLocalDuplicatedSectionModel };
    } else {
      modelForResolveExpression = formModelStore.getFormModel;
    }
    return modelForResolveExpression;
  }

  return { shouldRender };
}
