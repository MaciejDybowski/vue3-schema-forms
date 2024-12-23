import { Expression, Value } from "expr-eval";
import jsonata from "jsonata";
import { cloneDeep } from "lodash";
import get from "lodash/get";
import set from "lodash/set";
import { ref } from "vue";

import { logger } from "@/main";
import { useFormModelStore } from "@/store/formModelStore";
import { EngineField } from "@/types/engine/EngineField";
import { useEventBus } from "@vueuse/core";

import betterParser from "../engine/evalExprParser";

export function useConditionalRendering() {
  let shouldRender = ref(true);
  let lastValueOfShouldRender = ref(false);
  const vueSchemaFormEventBus = useEventBus<string>("form-model");

  async function shouldRenderField(schema: EngineField, registerListener: boolean = true) {
    shouldRender.value = !schema.layout.if;
    const formModelStore = useFormModelStore(schema.formId);
    const model = formModelStore.getFormModelForResolve;
    const originalIf = ref(!shouldRender.value ? cloneDeep(schema.layout.if) : "");

    if (schema.layout.if !== undefined && schema.layout.if && registerListener) {
      const unsubscribe = vueSchemaFormEventBus.on((event, payloadIndex) =>
        conditionalRenderingListener(event, payloadIndex, schema),
      );
    }

    if (!shouldRender.value) {
      originalIf.value = cloneDeep(schema.layout.if);
      if (schema.layout.if !== undefined && schema.layout.if?.includes("nata-")) {
        await ifByJsonNata(schema.layout.if.replace("nata-", ""), schema.key, model);
      } else {
        ifByEvalExpression(schema.layout.if as string, schema.key, model);
      }
    }
  }

  function ifByEvalExpression(expression: string, key: string, model: any) {
    let myExpr: Expression = betterParser.parse(expression);
    if (myExpr.variables({ withMembers: true }).every((variable) => get(model, variable, null) !== null)) {
      shouldRender.value = myExpr.evaluate(model as Value);
      resetModelValueWhenFalse(model, key);
    } else {
      if (lastValueOfShouldRender.value) {
        set(model, key, null);
      }
    }
  }

  async function ifByJsonNata(expression: string, key: string, model: any) {
    const nata = jsonata(expression);
    shouldRender.value = await nata.evaluate(model);
    resetModelValueWhenFalse(model, key);
  }

  function resetModelValueWhenFalse(model: object, key: string) {
    if (lastValueOfShouldRender.value && !shouldRender.value) {
      set(model, key, null);
    }
    lastValueOfShouldRender.value = shouldRender.value;
  }

  async function conditionalRenderingListener(event: string, payloadIndex: number, schema: EngineField) {
    // TODO - reakcja na sumy była jeden update z tyłu
    await new Promise((r) => setTimeout(r, 2));
    //if (schema.index == undefined || schema.index == payloadIndex) {
    await shouldRenderField(schema, false);
    if (logger.conditionalRenderingListener)
      console.debug(
        `[vue-schema-forms] [ConditionalRenderingListener] => key=[${schema.key}] shouldRender=[${shouldRender.value}]`,
      );
    //}
  }

  return { shouldRender, shouldRenderField };
}
