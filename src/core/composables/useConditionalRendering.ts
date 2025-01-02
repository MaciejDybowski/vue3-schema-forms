import jsonata from "jsonata";
import { cloneDeep } from "lodash";
import set from "lodash/set";
import { ref } from "vue";

import { logger, useResolveVariables } from "@/main";
import { useFormModelStore } from "@/store/formModelStore";
import { EngineField } from "@/types/engine/EngineField";
import { useEventBus } from "@vueuse/core";

export function useConditionalRendering() {
  let shouldRender = ref(true);
  let lastValueOfShouldRender = ref(false);
  const vueSchemaFormEventBus = useEventBus<string>("form-model");
  const {fillPath} = useResolveVariables()

  async function shouldRenderField(schema: EngineField, registerListener: boolean = true) {
    // first use of function, set variable from schema only once
    if(registerListener){
      shouldRender.value = !schema.layout.if;
    }
    const formModelStore = useFormModelStore(schema.formId);
    const model = formModelStore.getFormModelForResolve;
    const originalIf = ref(!shouldRender.value ? cloneDeep(schema.layout.if) : "");

    if (schema.layout.if !== undefined && schema.layout.if && registerListener) {
      const unsubscribe = vueSchemaFormEventBus.on((event, payloadIndex) =>
        conditionalRenderingListener(event, payloadIndex, schema),
      );
    }


    //if (!shouldRender.value) {
      originalIf.value = cloneDeep(schema.layout.if);
      if (schema.layout.if !== undefined && schema.layout.if?.includes("nata(")) {
        const match = schema.layout.if.match(/^nata\((.*)\)$/);
        if(match){
          const expression = fillPath(schema.path, schema.index, match[1])
          await ifByJsonNata(expression, schema.key, model);
        }
      }
    //}
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
