import { useEventBus } from '@vueuse/core';
import jsonata from 'jsonata';
import { cloneDeep } from 'lodash';
import get from 'lodash/get';
import set from 'lodash/set';

import { useInjectedFormModel } from '@/core/state/useFormModelProvider';
import { logger, useResolveVariables } from '@/main';
import { EngineField } from '@/types/engine/EngineField';

export function useJSONataExpression() {
  const vueSchemaFormEventBus = useEventBus<string>('form-model');
  const form = useInjectedFormModel();
  const { fillPath } = useResolveVariables();

  // persistent-hint, props: {'persistent-hint': 'nata(fieldA=PLN?true:false'}
  // schema - to remove after remove usePreparedModelForExpression
  async function resolveJSONataExpression(keyToResolve: string, object: any, schema: EngineField) {
    //console.debug(keyToResolve, object, object[keyToResolve].includes("nata("));

    if (object[keyToResolve].includes('nata(') || `${keyToResolve}Expression` in object) {
      const unsubscribe = vueSchemaFormEventBus.on(async () =>
        expressionResolverListener(keyToResolve, object, schema),
      );
      object[`${keyToResolve}Expression`] = cloneDeep(object[keyToResolve]);
      delete object[keyToResolve];

      const model = form.getFormModelForResolve.value;
      await tryResolveExpression(keyToResolve, object, model, schema);
    }
  }

  async function tryResolveExpression(
    keyToResolve: string,
    object: any,
    model: any,
    schema: EngineField,
  ) {
    let jsonataExpression = object[`${keyToResolve}Expression`];
    jsonataExpression = jsonataExpression.slice(5);
    jsonataExpression = jsonataExpression.substring(0, jsonataExpression.length - 1);

    if (schema.path != undefined && schema.index != undefined) {
      jsonataExpression = fillPath(schema.path, schema.index, jsonataExpression);
    }

    const nata = jsonata(jsonataExpression);
    const newValue = await nata.evaluate(model);

    const currentValue = get(object, keyToResolve, null);
    if (currentValue !== newValue) {
      set(object, keyToResolve, newValue);
    }
  }

  async function expressionResolverListener(
    keyToResolve: string,
    object: any,
    schema: EngineField,
  ) {
    //if (schema.index == undefined || schema.index == payloadIndex) {
    if (logger.JSONataExpressionListener)
      console.debug(
        `[vue-schema-forms] [JSONataExpressionListener] => key=[${keyToResolve}], index=[${schema.index}]`,
      );

    const model = form.getFormModelForResolve.value;
    await tryResolveExpression(keyToResolve, object, model, schema);
    //}
  }

  return { resolveJSONataExpression };
}
