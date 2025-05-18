import get from "lodash/get";


import { EngineField } from "@/types/engine/EngineField";
import { useInjectedFormModel } from "@/core/state/useFormModelProvider";

export function usePreparedModelForExpression(schema: EngineField) {
  const form = useInjectedFormModel();

  let modelForResolveExpression = {};
  if ("index" in schema && "path" in schema && typeof schema.path == "string" && typeof schema.index == "number") {
    modelForResolveExpression = JSON.parse(JSON.stringify(form.getFormModel));

    // remove root of duplicated section which is parent for the field: ex. invoice.items.fieldA so delete invoice from model and merge
    // exact local model from array of ivoice for resolve expresion
    if (get(modelForResolveExpression, schema.path, null) !== null) {
      delete modelForResolveExpression[schema.path.split(".")[0]];
    }

    const duplicatedSectionArrayModel = get(form.getFormModel, schema.path, null);
    const exactLocalDuplicatedSectionModel = duplicatedSectionArrayModel != null ? duplicatedSectionArrayModel[schema.index] : {};

    modelForResolveExpression = { ...modelForResolveExpression, ...exactLocalDuplicatedSectionModel };
  } else {
    modelForResolveExpression = form.getFormModel;
  }

  modelForResolveExpression = {...modelForResolveExpression, context: schema.options?.context || {}}

  return modelForResolveExpression;
}
