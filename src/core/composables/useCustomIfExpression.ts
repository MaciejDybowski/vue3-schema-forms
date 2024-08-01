import { cloneDeep } from "lodash";
import { watch } from "vue";
import get from "lodash/get";
import { Expression, Value } from "expr-eval";
import betterParser from "@/core/engine/evalExprParser";
import set from "lodash/set";

export function useCustomIfExpression(keyToResolve: string, object: any, model: any) {
  console.debug(keyToResolve)

  if (object[keyToResolve].includes("if") || `${keyToResolve}Expression` in object) {
    object[`${keyToResolve}Expression`] = cloneDeep(object[keyToResolve]);



    watch(model, () => {
      console.debug("jestem w watch")
      const result = parseIfStatement(object[`${keyToResolve}Expression`]);
      let ifResult = false;
      let myExpr: Expression = betterParser.parse(result?.wyrazenie as string);

      if (myExpr.variables({ withMembers: true }).every((variable) => get(model, variable, null) !== null)) {
        ifResult = myExpr.evaluate(model as Value);
      }

      const newValue = ifResult ? result?.prawda : result?.falsz;
      console.debug("newValue", newValue)
      //object[keyToResolve] = newValue.slice(1, -1);

      set(object,keyToResolve, newValue.slice(1,-1))
      console.debug("w funkcji",object)

    }, { deep: true });

  }

  function parseIfStatement(input) {
    // Wyrażenie regularne dopasowujące składnię "if(wyrazenie,prawda,falsz)"
    const regex = /^if\(([^,]+),([^,]+),([^)]+)\)$/;

    // Dopasowanie wyrażenia do stringu
    const matches = input.match(regex);

    // Sprawdzenie, czy dopasowanie się powiodło
    if (matches) {
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
