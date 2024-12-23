import jsonata from "jsonata";
import { cloneDeep } from "lodash";
import get from "lodash/get";
import set from "lodash/set";

import { logger } from "@/main";
import { useFormModelStore } from "@/store/formModelStore";
import { EngineField } from "@/types/engine/EngineField";
import { useEventBus } from "@vueuse/core";

export function useJSONataExpression() {
  const vueSchemaFormEventBus = useEventBus<string>("form-model");

  // persistent-hint, props: {'persistent-hint': 'nata(fieldA=PLN?true:false'}
  // schema - to remove after remove usePreparedModelForExpression
  async function resolveJSONataExpression(keyToResolve: string, object: any, schema: EngineField) {
    //console.debug(keyToResolve, object, object[keyToResolve].includes("nata("));

    if (object[keyToResolve].includes("nata(") || `${keyToResolve}Expression` in object) {
      const unsubscribe = vueSchemaFormEventBus.on(async (event, payloadIndex) =>
        expressionResolverListener(event, payloadIndex, keyToResolve, object, schema),
      );
      object[`${keyToResolve}Expression`] = cloneDeep(object[keyToResolve]);
      delete object[keyToResolve];

      const formModelStore = useFormModelStore(schema.formId);
      const model = formModelStore.getFormModelForResolve;
      await tryResolveExpression(keyToResolve, object, model);
    }
  }

  async function tryResolveExpression(keyToResolve: string, object: any, model: any) {
    let jsonataExpression = object[`${keyToResolve}Expression`];
    jsonataExpression = jsonataExpression.slice(5);
    jsonataExpression = jsonataExpression.substring(0, jsonataExpression.length - 1);
    const nata = jsonata(jsonataExpression);
    const newValue = await nata.evaluate(model);

    const currentValue = get(object, keyToResolve, null);
    if (currentValue !== newValue) {
      set(object, keyToResolve, newValue);
    }
  }

  async function expressionResolverListener(
    event: string,
    payloadIndex: number,
    keyToResolve: string,
    object: any,
    schema: EngineField,
  ) {
    //if (schema.index == undefined || schema.index == payloadIndex) {
    if (logger.JSONataExpressionListener)
      console.debug(`[vue-schema-forms] [JSONataExpressionListener] => key=[${keyToResolve}], index=[${schema.index}]`);
    const formModelStore = useFormModelStore(schema.formId);
    const model = formModelStore.getFormModelForResolve;
    await tryResolveExpression(keyToResolve, object, model);
    //}
  }

  return { resolveJSONataExpression };
}
