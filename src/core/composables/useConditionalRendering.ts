import jsonata from "jsonata";
import { cloneDeep } from "lodash";
import set from "lodash/set";
import { ref } from "vue";

import { Schema, logger, useResolveVariables } from "@/main";
import { useFormModelStore } from "@/store/formModelStore";
import { EngineField } from "@/types/engine/EngineField";
import { useEventBus } from "@vueuse/core";

export function useConditionalRendering() {
  let shouldRender = ref(false);
  let lastValueOfShouldRender = ref(false);
  const vueSchemaFormEventBus = useEventBus<string>("form-model");
  const { fillPath } = useResolveVariables();

  async function shouldRenderField(schema: EngineField, model: any, registerListener: boolean = true) {
    // first use of function, set variable from schema only once
    if (registerListener) {
      shouldRender.value = !schema.layout.if;
    }

    const originalIf = ref(!shouldRender.value ? cloneDeep(schema.layout.if) : "");

    if (schema.layout.if !== undefined && schema.layout.if && registerListener) {
      const unsubscribe = vueSchemaFormEventBus.on((event, payloadIndex) =>
        conditionalRenderingListener(event, payloadIndex, schema, model),
      );
    }

    //if (!shouldRender.value) {
    originalIf.value = cloneDeep(schema.layout.if);
    if (schema.layout.if !== undefined && schema.layout.if?.includes("nata(")) {
      const match = schema.layout.if.match(/^nata\((.*)\)$/);
      if (match) {
        const expression = fillPath(schema.path, schema.index, match[1]);
        await ifByJsonNata(schema, expression, model);
      }
    }
    //}
  }

  async function ifByJsonNata(schema: EngineField, expression: string, model: any) {
    const formModelStore = useFormModelStore(schema.formId);
    const modelForResolve = formModelStore.getFormModelForResolve;
    const nata = jsonata(expression);
    shouldRender.value = await nata.evaluate(modelForResolve);
    resetModelValueWhenFalse(model, schema);
  }

  function resetModelValueWhenFalse(model: object, schema: EngineField) {
    if (lastValueOfShouldRender.value && !shouldRender.value) {
      if (schema.layout.component == "fields-group") {
        const componentSchema = schema.layout.schema as Schema;
        resetModelValues(model, componentSchema)
      } else {
        set(model, schema.key, null);
      }
    }
    lastValueOfShouldRender.value = shouldRender.value;
  }

  function resetModelValues(model: object, schema: Schema) {
    if (!schema.properties) return;

    Object.entries(schema.properties).forEach(([key, field]) => {
      if (field.type === "object" && field.properties) {
        resetModelValues(model[key] ?? {}, field as any);
      } else {
        set(model, key, null);
      }
    });
  }


  async function conditionalRenderingListener(event: string, payloadIndex: number, schema: EngineField, model: any) {
    await new Promise((r) => setTimeout(r, 50));
    //if (schema.index == undefined || schema.index == payloadIndex) {
    await shouldRenderField(schema, model, false);
    if (logger.conditionalRenderingListener)
      console.debug(
        `[vue-schema-forms] [ConditionalRenderingListener] => key=[${schema.key}] shouldRender=[${shouldRender.value}]`,
      );
    //}
  }

  return { shouldRender, shouldRenderField };
}
