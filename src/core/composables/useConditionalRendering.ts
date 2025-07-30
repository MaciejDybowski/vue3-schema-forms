import { useEventBus } from '@vueuse/core';
import jsonata from 'jsonata';
import { cloneDeep } from 'lodash';

import { ref } from 'vue';

import { useResolveVariables } from '@/core/composables/useResolveVariables';
import { useInjectedFormModel } from '@/core/state/useFormModelProvider';
import { logger } from '@/main';
import { EngineField } from '@/types/engine/EngineField';
import { NodeUpdateEvent } from '@/types/engine/NodeUpdateEvent';
import { Schema } from '@/types/schema/Schema';

export function useConditionalRendering() {
  let shouldRender = ref(false);
  let lastValueOfShouldRender = ref(false);
  const vueSchemaFormEventBus = useEventBus<string>('form-model');
  const { fillPath } = useResolveVariables();
  const form = useInjectedFormModel();

  async function shouldRenderField(
    schema: EngineField,
    model: any,
    registerListener: boolean = true,
  ) {
    // first use of function, set variable from schema only once
    if (registerListener) {
      shouldRender.value = !schema.layout.if;
    }

    const originalIf = ref(!shouldRender.value ? cloneDeep(schema.layout.if) : '');

    if (schema.layout.if !== undefined && schema.layout.if && registerListener) {
      const unsubscribe = vueSchemaFormEventBus.on(() =>
        conditionalRenderingListener(schema, model),
      );
    }

    //if (!shouldRender.value) {
    originalIf.value = cloneDeep(schema.layout.if);
    if (schema.layout.if !== undefined && schema.layout.if?.includes('nata(')) {
      const match = schema.layout.if.match(/^nata\(([^]*)\)$/);
      if (match) {
        const expression = fillPath(schema.path, schema.index, match[1]);
        await ifByJsonNata(schema, expression, model);
      }
    }
    //}
  }

  async function ifByJsonNata(schema: EngineField, expression: string, model: any) {
    const modelForResolve = form.getFormModelForResolve.value;
    const nata = jsonata(expression);
    try {
      shouldRender.value = await nata.evaluate(modelForResolve);
    } catch (err: any) {
      console.error('JSONata error:', {
        message: err.message,
        expression: expression,
        field: schema.key,
      });
      shouldRender.value = false;
    }

    resetModelValueWhenFalse(model, schema);
  }

  function resetModelValueWhenFalse(model: object, schema: EngineField) {
    if (lastValueOfShouldRender.value && !shouldRender.value) {
      if (schema.layout.component == 'fields-group') {
        const internalSchema = schema.layout.schema as Schema;
        resetModelValues(internalSchema, schema);
      } else {
        const event: NodeUpdateEvent = {
          key: schema.key,
          value: null,
        };
        schema.on.input(event);
      }
    }
    lastValueOfShouldRender.value = shouldRender.value;
  }

  function resetModelValues(schema: Schema, formField: EngineField) {
    if (!schema.properties) return;

    Object.entries(schema.properties).forEach(([key, field]) => {
      if (field.type === 'object' && field.properties) {
        resetModelValues(field as any, formField);
      } else {
        const event: NodeUpdateEvent = {
          key: key,
          value: null,
        };
        formField.on.input(event);
      }
    });
  }

  async function conditionalRenderingListener(schema: EngineField, model: any) {
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
