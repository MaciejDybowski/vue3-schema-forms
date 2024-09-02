import { Expression, Value } from 'expr-eval';
import { cloneDeep } from 'lodash';
import get from 'lodash/get';
import set from 'lodash/set';

import { usePreparedModelForExpression } from '@/core/composables/usePreparedModelForExpression';
import betterParser from '@/core/engine/evalExprParser';
import { useFormModelStore } from '@/store/formModelStore';
import { EngineField } from '@/types/engine/EngineField';

export function useCustomIfExpression(keyToResolve: string, object: any, schema: EngineField) {
  const formModelStore = useFormModelStore(schema.formId);
  //console.debug(keyToResolve, object, object[keyToResolve].includes("if"));

  if (object[keyToResolve].includes('if') || `${keyToResolve}Expression` in object) {
    object[`${keyToResolve}Expression`] = cloneDeep(object[keyToResolve]);

    let modelExpression = usePreparedModelForExpression(schema);
    tryResolveIfExpression(modelExpression);

    formModelStore.$subscribe(() => {
      modelExpression = usePreparedModelForExpression(schema);
      tryResolveIfExpression(modelExpression);
    });
  }

  function tryResolveIfExpression(model: any) {
    const result = parseIfStatement(object[`${keyToResolve}Expression`]);
    let ifResult = false;
    let myExpr: Expression = betterParser.parse(result?.wyrazenie as string);

    if (myExpr.variables({ withMembers: true }).every((variable) => get(model, variable, null) !== null)) {
      ifResult = myExpr.evaluate(model as Value);
    }
    //console.debug(myExpr)
    let newValue = ifResult ? result?.prawda : result?.falsz;
    //console.debug("newValue", newValue)
    // object[keyToResolve] = newValue.slice(1, -1);
    if (newValue == 'true' || newValue == 'false') {
      newValue = newValue == 'true';
    }

    set(object, keyToResolve, newValue);
    //console.debug("After set", object)
  }

  function parseIfStatement(input) {
    // Wyrażenie regularne dopasowujące składnię "if(wyrazenie,prawda,falsz)"
    const regex = /^if\(([^,]+),([^,]+),([^)]+)\)$/;
    const regexpExpression = /==?\s*\S/
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
}