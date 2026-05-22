import jsonata from 'jsonata';
import get from 'lodash/get';
import set from 'lodash/set';

import { useResolveVariables } from '@/core/composables/useResolveVariables';
import { useInjectedFormModel } from '@/core/state/useFormModelProvider';
import { EngineField } from '@/types/engine/EngineField';
import { NodeUpdateEvent } from '@/types/engine/NodeUpdateEvent';

export function useFormModel() {
  const { fillPath } = useResolveVariables();
  const form = useInjectedFormModel();

  function getDefaultValueJSONataExpression(defaultValue: any): string | null {
    if (typeof defaultValue !== 'string') return null;

    const trimmedDefaultValue = defaultValue.trim();
    if (!trimmedDefaultValue.startsWith('nata(') || !trimmedDefaultValue.endsWith(')')) return null;

    return trimmedDefaultValue.slice(5, -1);
  }

  async function resolveDefaultValue(defaultValue: any, schema: EngineField) {
    const jsonataExpression = getDefaultValueJSONataExpression(defaultValue);
    if (!jsonataExpression) return defaultValue;

    const expression = fillPath(schema.path, schema.index, jsonataExpression);
    const model = form.getFormModelForResolve.value;

    return await jsonata(expression).evaluate(model);
  }

  async function setResolvedDefaultValue(defaultValue: any, schema: EngineField) {
    try {
      const resolvedDefaultValue = await resolveDefaultValue(defaultValue, schema);
      setValue(resolvedDefaultValue, schema);
    } catch (error: any) {
      console.error('Default value JSONata error:', {
        message: error.message,
        defaultValue,
      });
    }
  }

  function getDataPath(schema: EngineField): string {
    const path = schema.dataPath || schema.key;
    return fillPath(schema.path, schema.index, path);
  }

  function getValue(model: object, schema: EngineField, defaultValue: any = null): any {
    const sourceModel = schema.dataPath ? form.getFormModel.value : model;
    const value = get(sourceModel, getDataPath(schema), defaultValue);
    if (schema.defaultValue !== undefined && schema.defaultValue !== null && value === null) {
      const defaultValue = schema.defaultValue;
      set(schema, 'defaultValue', null);

      if (getDefaultValueJSONataExpression(defaultValue)) {
        void setResolvedDefaultValue(defaultValue, schema);
        return value;
      }

      setValue(defaultValue, schema);
      return defaultValue;
    }
    if (value !== null) {
      set(schema, 'defaultValue', null);
    }

    return value;
  }

  function setValue(val: any, schema: EngineField, index?: number, emitBlocker?: boolean) {
    const dataPath = getDataPath(schema);
    const event: NodeUpdateEvent = {
      key: dataPath,
      value: (val !== undefined || val === 0) && val !== '' ? val : null,
      dataPath: schema.dataPath ? dataPath : undefined,
      index: index,
      emitBlocker: emitBlocker,
    };
    schema.on.input(event);
  }

  return { getValue, setValue, getDataPath };
}
