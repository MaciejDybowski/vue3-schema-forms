import { Expression, Value } from 'expr-eval';
import { Ref } from 'vue';
import betterParser from '../engine/evalExprParser';
import { useFormModelStore } from '@/store/formModelStore';

export function useConditionalRendering(condition: string, formId: string, resultRef: Ref<Boolean>): void {
  let myExpr: Expression = betterParser.parse(condition);
  const formModelStore = useFormModelStore(formId);

  if (myExpr.variables().every((variable) => variable in formModelStore.getFormModel)) {
    resultRef.value = myExpr.evaluate(formModelStore.getFormModel as Value);
  }

  formModelStore.$subscribe(() => {
    if (myExpr.variables().every((variable) => variable in formModelStore.getFormModel)) {
      resultRef.value = myExpr.evaluate(formModelStore.getFormModel as Value);
    }
  });
}
