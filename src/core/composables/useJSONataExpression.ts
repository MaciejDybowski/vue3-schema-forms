import { cloneDeep } from 'lodash';
import get from 'lodash/get';
import set from 'lodash/set';

import { usePreparedModelForExpression } from '@/core/composables/usePreparedModelForExpression';
import { EngineField } from '@/types/engine/EngineField';
import { useEventBus } from '@vueuse/core';
import { logger } from '@/main';
import jsonata from "jsonata";

export function useJSONataExpression() {
  const vueSchemaFormEventBus = useEventBus<string>('form-model');

  // persistent-hint, props: {'persistent-hint': 'nata(fieldA=PLN?true:false'}
  // schema - to remove after remove usePreparedModelForExpression
  async function resolveJSONataExpression(keyToResolve: string, object: any, schema: EngineField) {
    //console.debug(keyToResolve, object, object[keyToResolve].includes("nata("));

    if (object[keyToResolve].includes('nata(') || `${keyToResolve}Expression` in object) {
      const unsubscribe = vueSchemaFormEventBus.on(async (event, payloadIndex) => expressionResolverListener(event, payloadIndex, keyToResolve, object, schema));
      object[`${keyToResolve}Expression`] = cloneDeep(object[keyToResolve]);
      delete object[keyToResolve];

      let modelExpression = usePreparedModelForExpression(schema);
      await tryResolveExpression(keyToResolve, object, modelExpression);
    }
  }

  async function tryResolveExpression(keyToResolve: string, object: any, model: any) {
    let jsonataExpression = object[`${keyToResolve}Expression`];
    jsonataExpression = jsonataExpression.slice(5)
    jsonataExpression = jsonataExpression.substring(0, jsonataExpression.length - 1);
    const nata = jsonata(jsonataExpression);
    const newValue = await nata.evaluate(model);

    const currentValue = get(object, keyToResolve, null);
    if (currentValue !== newValue) {
      set(object, keyToResolve, newValue);
    }
  }

  async function expressionResolverListener(event: string, payloadIndex: number, keyToResolve: string, object: any, schema: EngineField) {
    //if (schema.index == undefined || schema.index == payloadIndex) {
      if (logger.JSONataExpressionListener) console.debug(`[vue-schema-forms] [JSONataExpressionListener] => key=[${keyToResolve}], index=[${schema.index}]`);
      let modelExpression = usePreparedModelForExpression(schema);
      await tryResolveExpression(keyToResolve, object, modelExpression);
    //}
  }

  return { resolveJSONataExpression };
}
