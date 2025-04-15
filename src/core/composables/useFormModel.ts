import get from 'lodash/get';
import set from 'lodash/set';

import { EngineField } from '@/types/engine/EngineField';
import { NodeUpdateEvent } from '@/types/engine/NodeUpdateEvent';

export function useFormModel() {
  function getValue(model: object, schema: EngineField, defaultValue: any = null): any {
    const value = get(model, schema.key, defaultValue);
    if (schema.defaultValue !== undefined && schema.defaultValue !== null && value === null) {
      const defaultValue = schema.defaultValue;
      setValue(defaultValue, schema);
      set(schema, 'defaultValue', null);
      return defaultValue;
    }
    if (value !== null) {
      set(schema, 'defaultValue', null);
    }

    return value;
  }

  function setValue(val: any, schema: EngineField, index?: number, emitBlocker?: boolean) {
    const event: NodeUpdateEvent = {
      key: schema.key,
      value: (val !== undefined || val === 0) && val !== '' ? val : null,
      index: index,
      emitBlocker: emitBlocker
    };
    schema.on.input(event);
  }

  return { getValue, setValue };
}
