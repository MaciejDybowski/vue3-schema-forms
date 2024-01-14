import { EngineField, NodeUpdateEvent } from '@/vocabulary/engine';
import get from 'lodash/get';
import { Schema } from '@/vocabulary/schema';
import jsonSchemaResolver from './jsonSchemaResolver';
import set from 'lodash/set';

export const variableRegexp: RegExp = new RegExp('{.*?}', 'g');

export function produceUpdateEvent(val: any, schema: EngineField) {
  const event: NodeUpdateEvent = { key: schema.key, value: val || val === 0 ? val : null };
  schema.on.input(event);
}

export function getValueFromModel(model: object, schema: EngineField): any {
  const value = get(model, schema.key, null);
  if (schema.default && value === null) {
    const defaultValue = schema.default;
    produceUpdateEvent(defaultValue, schema);
    set(schema, 'default', null);
    return defaultValue;
  }
  if (value !== null) {
    set(schema, 'default', null);
  }

  return value;
}

export async function resolveSchemaWithLocale(schema: Schema, locale: string): Promise<Schema> {
  const temp = JSON.parse(JSON.stringify(schema).replaceAll('~$locale~', locale));
  const resolved = await jsonSchemaResolver.resolve(temp);
  return resolved.result as Schema;
}
