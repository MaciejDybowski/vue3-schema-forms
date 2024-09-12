import { Expression, Value } from 'expr-eval';
import get from 'lodash/get';
import { ref } from 'vue';

import { usePreparedModelForExpression } from '@/core/composables/usePreparedModelForExpression';
import { EngineField } from '@/types/engine/EngineField';

import { useFormModelStore } from '../../store/formModelStore';
import betterParser from '../engine/evalExprParser';
import jsonata from 'jsonata';

export function useConditionalRendering(schema: EngineField) {
  const formModelStore = useFormModelStore(schema.formId);
  const shouldRender = ref(!schema.layout.if);

  let model = {} as unknown;

  if (!shouldRender.value) {
    if (schema.layout.if?.includes('nata-')) {
      ifByJsonNata(schema.layout.if.replace('nata-', ''));
    } else {
      ifByEvalExpression();
    }
  }

  function ifByEvalExpression() {
    let myExpr: Expression = betterParser.parse(schema.layout.if as string);
    model = usePreparedModelForExpression(schema);
    if (myExpr.variables({ withMembers: true }).every((variable) => get(model, variable, null) !== null)) {
      shouldRender.value = myExpr.evaluate(model as Value);
    }

    formModelStore.$subscribe(() => {
      model = usePreparedModelForExpression(schema);
      if (myExpr.variables({ withMembers: true }).every((variable) => get(model, variable, null) !== null)) {
        shouldRender.value = myExpr.evaluate(model as Value);
      }
    });
  }

  async function ifByJsonNata(expression: string) {
    const nata = jsonata(expression);
    model = usePreparedModelForExpression(schema);
    shouldRender.value = await nata.evaluate(model);

    formModelStore.$subscribe(async () => {
      model = usePreparedModelForExpression(schema);
      shouldRender.value = await nata.evaluate(model);
    });
  }

  return { shouldRender };
}
