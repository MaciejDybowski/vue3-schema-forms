import { Expression, Value } from 'expr-eval';
import set from 'lodash/set';
import { ref } from 'vue';

import { useNumber } from '@/core/composables/useNumber';
import { usePreparedModelForExpression } from '@/core/composables/usePreparedModelForExpression';
import { EngineField } from '@/types/engine/EngineField';

import betterParser, { SUM } from '../engine/evalExprParser';
import { useEventBus } from '@vueuse/core';
import get from 'lodash/get';
import { logger } from '@/main';

export function useCalculation() {
  const { roundTo } = useNumber();
  const vueSchemaFormEventBus = useEventBus<string>('form-model');

  function calculationFunc(field: EngineField, model: any): number | null {
    let mergedModel = usePreparedModelForExpression(field);
    const precision = field.precision ? Number(field.precision) : 2;

    let result = ref(0);
    let calculation = field.calculation as string;

    const unsubscribe = vueSchemaFormEventBus.on((event, payloadIndex) => calculationListener(event, payloadIndex, field, model));

    let myExpr: Expression = prepareCalcExpression(calculation, mergedModel);

    if (myExpr.variables().every((variable) => variable in mergedModel)) {
      result.value = myExpr.evaluate(mergedModel as Value);
    }

    return roundTo(result.value, precision);
  }

  async function calculationListener(event: string, payloadIndex: number, field: EngineField, model: any) {
    //if (field.index == undefined || field.index == payloadIndex) {
    if(field.index == undefined){ // TODO - opoźnianie dla sum i obliczeń zbiorowych nie wiem czy to tak do końca powinno być
      await new Promise(r => setTimeout(r, 1));
    }
      if (logger.calculationListener) console.debug(`[vue-schema-forms] [CalculationListener], key=${field.key}, index=${field.index}`);
      let calculation = field.calculation as string;
      const precision = field.precision ? Number(field.precision) : 2;
      const mergedModel = usePreparedModelForExpression(field);
      let myExpr: Expression = prepareCalcExpression(calculation, mergedModel);
      if (myExpr.variables().every((variable) => variable in mergedModel)) {
        const result = myExpr.evaluate(mergedModel as Value);
        const currentValue = get(model, field.key, null);
        if (result !== currentValue) {
          set(model, field.key, roundTo(result, precision));
        }
      }
    //}
  }

  function prepareCalcExpression(calculation: string, mergedModel: object): Expression {
    calculation = SUM(calculation, mergedModel);
    return betterParser.parse(calculation);
  }

  return { calculationFunc };
}
