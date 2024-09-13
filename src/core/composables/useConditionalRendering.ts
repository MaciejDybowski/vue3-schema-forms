import { Expression, Value } from "expr-eval";
import jsonata from "jsonata";
import get from "lodash/get";
import { ref } from "vue";

import { usePreparedModelForExpression } from "@/core/composables/usePreparedModelForExpression";
import { EngineField } from "@/types/engine/EngineField";

import { useFormModelStore } from "../../store/formModelStore";
import betterParser from "../engine/evalExprParser";
import { useEventBus } from "@vueuse/core";
import { cloneDeep } from "lodash";

export function useConditionalRendering(schema: EngineField) {
  const formModelStore = useFormModelStore(schema.formId);
  const shouldRender = ref(!schema.layout.if);
  let model = {} as unknown;
  const vueSchemaFormEventBus = useEventBus<string>("form-model");
  const unsubscribe = vueSchemaFormEventBus.on(conditionalRenderingListener);
  const originalIf = ref(!shouldRender.value ? cloneDeep(schema.layout.if) : "");

  if (!shouldRender.value) {
    originalIf.value = cloneDeep(schema.layout.if);
    if (schema.layout.if !== undefined && schema.layout.if?.includes("nata-")) {
      ifByJsonNata(schema.layout.if.replace("nata-", ""));
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
  }

  async function ifByJsonNata(expression: string) {
    const nata = jsonata(expression);
    model = usePreparedModelForExpression(schema);
    shouldRender.value = await nata.evaluate(model);
  }

  async function conditionalRenderingListener(event: string) {
    console.debug(event + "- conditional");

    model = usePreparedModelForExpression(schema);
    if (originalIf.value.includes("nata-")) {
      // if by JSON Nata
      const expression = originalIf.value.replace("nata-", "");
      const nata = jsonata(expression);
      shouldRender.value = await nata.evaluate(model);
    } else if (originalIf.value) {
      // if by EvalExpr
      let myExpr: Expression = betterParser.parse(originalIf.value as string);
      if (myExpr.variables({ withMembers: true }).every((variable) => get(model, variable, null) !== null)) {
        shouldRender.value = myExpr.evaluate(model as Value);
        console.debug(shouldRender.value, model);
      }
    }
  }

  return { shouldRender };
}
