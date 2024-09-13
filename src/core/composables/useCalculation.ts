import { Expression, Value } from "expr-eval";
import set from "lodash/set";
import { ref } from "vue";

import { useNumber } from "@/core/composables/useNumber";
import { usePreparedModelForExpression } from "@/core/composables/usePreparedModelForExpression";
import { useFormModelStore } from "@/store/formModelStore";
import { EngineField } from "@/types/engine/EngineField";

import betterParser, { SUM } from "../engine/evalExprParser";
import { useEventBus } from "@vueuse/core";

export function useCalculation(field: EngineField): number | null {
  const { roundTo } = useNumber();
  const formModelStore = useFormModelStore(field.formId);
  let model = usePreparedModelForExpression(field);
  const precision = field.precision ? Number(field.precision) : 2;

  let result = ref(0);
  let calculation = field.calculation as string;
  let originalCalc = calculation;
  const vueSchemaFormEventBus = useEventBus<string>('form-model')
  const unsubscribe = vueSchemaFormEventBus.on(calculationListener)


  let myExpr: Expression = prepareCalcExpression(calculation, model);

  if (myExpr.variables().every((variable) => variable in model)) {
    result.value = myExpr.evaluate(model as Value);
  }


  function calculationListener(event: string) {
    console.debug(event + "- calculation");
    model = usePreparedModelForExpression(field);
    myExpr = prepareCalcExpression(originalCalc, model);
    executeCalc();
  }


  function executeCalc(): void {
    if (myExpr.variables().every((variable) => variable in model)) {
      result.value = myExpr.evaluate(model as Value);
      set(model, field.key, roundTo(result.value, precision));
    }
  }

  function prepareCalcExpression(calculation: string, model: object): Expression {
    calculation = SUM(calculation, model);
    return betterParser.parse(calculation);
  }

  return roundTo(result.value, precision);
}
