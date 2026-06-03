import { useEventBus } from '@vueuse/core';
import jsonata from 'jsonata';
import { cloneDeep } from 'lodash';

import { ref } from 'vue';

import { useFormModel } from '@/core/composables/useFormModel';
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
  const { getDataPath } = useFormModel();
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
        //console.debug('before fillPath', schema.layout.if, schema.index);
        //console.debug(`schemaPath = ${schema.path} and index = ${schema.index}`);
        const expression = fillPath(schema.path, schema.index, match[1]);
        //console.debug('after fillPath', expression);
        await ifByJsonNata(schema, expression, model);
      }
    }
    //}
  }

  async function ifByJsonNata(schema: EngineField, expression: string, model: any) {
    const modelForResolve = form.getFormModelForResolve.value;

    try {
      const nata = jsonata(expression);
      shouldRender.value = await nata.evaluate(modelForResolve);
    } catch (err: any) {
      console.error('JSONata error:', {
        message: err.message,
        expression: expression,
        field: schema.key,
      });
      shouldRender.value = false;
    }

    //console.debug(expression, modelForResolve);

    resetModelValueWhenFalse(model, schema);
  }

  function checkIfComponentIsStatic(schema: EngineField): boolean {
    return !(
      schema.layout.component == 'static-content' ||
      schema.layout.component == 'alert' ||
      schema.layout.component == 'button' ||
      schema.layout.component == 'divider' ||
      schema.layout.component == 'table-view'
    );
  }

  function resetModelValueWhenFalse(model: object, schema: EngineField) {
    if (lastValueOfShouldRender.value && !shouldRender.value && checkIfComponentIsStatic(schema)) {
      if (hasNestedSchemas(schema)) {
        resetNestedSchemaValues(schema, schema);
      } else {
        const event: NodeUpdateEvent = {
          key: getDataPath(schema),
          value: null,
          dataPath: schema.dataPath ? getDataPath(schema) : undefined,
        };
        schema.on.input(event);
      }
    }
    lastValueOfShouldRender.value = shouldRender.value;
  }

  function hasNestedSchemas(field: any): boolean {
    return !!(
      field.layout?.schema?.properties ||
      field.layout?.columns?.length ||
      field.panels?.length
    );
  }

  function resetNestedSchemaValues(field: any, formField: EngineField) {
    if (field.layout?.schema) {
      resetModelValues(field.layout.schema, formField);
    }

    if (Array.isArray(field.layout?.columns)) {
      field.layout.columns.forEach((column: any) => {
        if (column?.schema) {
          resetModelValues(column.schema, formField);
        }
      });
    }

    if (Array.isArray(field.panels)) {
      field.panels.forEach((panel: any) => {
        if (panel?.schema) {
          resetModelValues(panel.schema, formField);
        }
      });
    }
  }

  function resetModelValues(schema: Schema, formField: EngineField) {
    if (!schema.properties) return;

    Object.entries(schema.properties).forEach(([key, field]) => {
      if (field.type === 'object' && field.properties) {
        resetModelValues(field as any, formField);
      } else if (hasNestedSchemas(field)) {
        resetNestedSchemaValues(field, formField);
      } else {
        const event: NodeUpdateEvent = {
          key: fillPath(formField.path, formField.index, field.dataPath || key),
          value: null,
          dataPath: field.dataPath ? fillPath(formField.path, formField.index, field.dataPath) : undefined,
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

  async function conditionalRenderBlocker(field: EngineField): Promise<boolean> {
    if (
      field.layout.if !== undefined &&
      field.layout.if !== '' &&
      field.layout.if?.includes('nata(')
    ) {
      const mergedModel = form.getFormModelForResolve.value;
      const ifExpression = fillPath(
        field.path as string,
        field.index as number,
        field.layout.if.slice(5, -1),
      );

      try {
        const nata = jsonata(ifExpression);
        return (await nata.evaluate(mergedModel)) as boolean;
      } catch (err: any) {
        console.error('Conditional render (if) error:', {
          message: err.message,
          expression: ifExpression,
          field: field.key,
        });
        return false;
      }
    }

    return true;
  }

  return { shouldRender, shouldRenderField, conditionalRenderBlocker };
}
