import { EngineField, NodeUpdateEvent } from "@/types/engine";
import get from "lodash/get";
import set from "lodash/set";

export function useFormModel() {
  function getValue(model: object, schema: EngineField, defaultValue: any = null): any {
    const value = get(model, schema.key, defaultValue);
    if (schema.default && value === null) {
      const defaultValue = schema.default;
      setValue(defaultValue, schema);
      set(schema, "default", null);
      return defaultValue;
    }
    if (value !== null) {
      set(schema, "default", null);
    }

    return value;
  }

  function setValue(val: any, schema: EngineField) {
    const event: NodeUpdateEvent = { key: schema.key, value: val !== undefined || val === 0 ? val : null };
    schema.on.input(event);
  }

  return { getValue, setValue };
}
