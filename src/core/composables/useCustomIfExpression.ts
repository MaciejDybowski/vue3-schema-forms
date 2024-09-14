import { Expression, Value } from 'expr-eval';
import { cloneDeep } from 'lodash';
import get from 'lodash/get';
import set from 'lodash/set';

import { usePreparedModelForExpression } from '@/core/composables/usePreparedModelForExpression';
import betterParser from '@/core/engine/evalExprParser';
import { EngineField } from '@/types/engine/EngineField';
import { useEventBus } from '@vueuse/core';
import { logger } from '@/main';

export function useCustomIfExpression() {
  const vueSchemaFormEventBus = useEventBus<string>('form-model');

  function customIfExpressionResolve(keyToResolve: string, object: any, schema: EngineField) {
    //console.debug(keyToResolve, object, object[keyToResolve].includes("if"));

    if (object[keyToResolve].includes('if') || `${keyToResolve}Expression` in object) {

      const unsubscribe = vueSchemaFormEventBus.on((event, payloadIndex) => ifExpressionResolverListener(event, payloadIndex, keyToResolve, object, schema));
      object[`${keyToResolve}Expression`] = cloneDeep(object[keyToResolve]);

      let modelExpression = usePreparedModelForExpression(schema);
      tryResolveIfExpression(keyToResolve, object, modelExpression);
    }
  }

  function tryResolveIfExpression(keyToResolve: string, object: any, model: any) {
    const result = parseIfStatement(object[`${keyToResolve}Expression`]);
    let ifResult = false;
    let myExpr: Expression = betterParser.parse(result?.wyrazenie as string);

    if (myExpr.variables({ withMembers: true }).every((variable) => get(model, variable, null) !== null)) {
      ifResult = myExpr.evaluate(model as Value);
    }

    let newValue = ifResult ? result?.prawda : result?.falsz;
    if (newValue == 'true' || newValue == 'false') {
      newValue = newValue == 'true';
    }
    const currentValue = get(object, keyToResolve, null);
    if (currentValue !== newValue) {
      set(object, keyToResolve, newValue);
    }
  }

  function parseIfStatement(input) {
    // Wyrażenie regularne dopasowujące składnię "if(wyrazenie,prawda,falsz)"
    const regex = /^if\(([^,]+),([^,]+),([^)]+)\)$/;
    const regexpExpression = /==?\s*\S/;
    // Dopasowanie wyrażenia do stringu
    const matches = input.match(regex);

    // Sprawdzenie, czy dopasowanie się powiodło
    if (matches && matches[1].match(regexpExpression)) {
      // Zwrócenie zmiennych: wyrazenie, prawda, falsz
      const wyrazenie = matches[1];
      const prawda = matches[2];
      const falsz = matches[3];

      return { wyrazenie, prawda, falsz };
    } else {
      // Jeśli dopasowanie się nie powiodło, zwróć null
      return null;
    }
  }

  async function ifExpressionResolverListener(event: string, payloadIndex: number, keyToResolve: string, object: any, schema: EngineField) {
    //if (schema.index == undefined || schema.index == payloadIndex) {
      if (logger.customIfExpressionListener) console.debug(`[vue-schema-forms] [PropsIfExpressionResolverListener] => key=[${keyToResolve}], index=[${schema.index}]`);
      let modelExpression = usePreparedModelForExpression(schema);
      tryResolveIfExpression(keyToResolve, object, modelExpression);
    //}
  }

  return { customIfExpressionResolve };
}
