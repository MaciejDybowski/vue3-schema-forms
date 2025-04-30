import { EngineField } from "@/types/engine/EngineField";
import { ref } from "vue";
import { useEventBus } from "@vueuse/core";
import { useResolveVariables } from "@/core/composables/useResolveVariables";
import { cloneDeep } from "lodash";
import { logger } from "@/main";
import { useFormModelStore } from "@/store/formModelStore";
import jsonata from "jsonata";

export function useConditionalHide(){
  let shouldHide = ref(false);
  const vueSchemaFormEventBus = useEventBus<string>("form-model");
  const { fillPath } = useResolveVariables();

  async function shouldHideField(schema: EngineField, model: any, registerListener: boolean = true) {

    if (registerListener) {
      shouldHide.value = !!schema.layout.hide;
    }

    const originalHideExpression = ref(!shouldHide.value ? cloneDeep(schema.layout.hide) : "");

    if (schema.layout.hide !== undefined && schema.layout.hide && registerListener) {
      const unsubscribe = vueSchemaFormEventBus.on(() =>
        conditionalHidingListener(schema, model),
      );
    }

    originalHideExpression.value = cloneDeep(schema.layout.hide);
    if (schema.layout.hide !== undefined && typeof schema.layout.hide == 'string'&& schema.layout.hide?.includes("nata(")) {
      const match = schema.layout.hide.match(/^nata\((.*)\)$/);
      if (match) {
        const expression = fillPath(schema.path, schema.index, match[1]);
        await hideByJsonNata(schema, expression, model);
      }
    }
  }

  async function hideByJsonNata(schema: EngineField, expression: string, model: any) {
    const formModelStore = useFormModelStore(schema.formId);
    const modelForResolve = formModelStore.getFormModelForResolve;
    const nata = jsonata(expression);
    shouldHide.value = await nata.evaluate(modelForResolve);
  }

  async function conditionalHidingListener(schema: EngineField, model: any) {
    await new Promise((r) => setTimeout(r, 50));
    //if (schema.index == undefined || schema.index == payloadIndex) {
    await shouldHideField(schema, model, false);
    if (logger.conditionalRenderingListener)
      console.debug(
        `[vue-schema-forms] [ConditionalHidingListener] => key=[${schema.key}] shouldRender=[${shouldHide.value}]`,
      );
    //}
  }

  return {shouldHide, shouldHideField}
}