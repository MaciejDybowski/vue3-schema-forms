import { EngineField, NodeUpdateEvent } from '@/vocabulary/engine';
import get from 'lodash/get';
import { Schema } from '@/vocabulary/schema';
import jsonSchemaResolver from './jsonSchemaResolver';
import { DisplayBreakpoint } from 'vuetify';
import { Cols } from '@/vocabulary/schema/elements';
import set from 'lodash/set';

export function produceUpdateEvent(val: any, schema: EngineField) {
  const event: NodeUpdateEvent = { key: schema.key, value: val ? val : null };
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
  return value;
}

export function bindClass(schema: EngineField): string {
  let classString = '';
  if (schema.required) {
    classString += 'required-input ';
  }
  return classString;
}

export const variableRegexp: RegExp = new RegExp('{.*?}', 'g');

export async function resolveSchemaWithLocale(schema: Schema, locale: string): Promise<Schema> {
  const temp = JSON.parse(JSON.stringify(schema).replaceAll('~$locale~', locale));
  const resolved = await jsonSchemaResolver.resolve(temp);
  return resolved.result as Schema;
}

export function getColsByDisplay(displayBreakpoint: DisplayBreakpoint, cols: Cols): number {
  switch (displayBreakpoint) {
    case 'xxl':
      const xxl = cols.xxl;
      return xxl ? xxl : 12;
    case 'xl':
      const xl = cols.xl;
      return xl ? xl : 12;
    case 'lg':
      const lg = cols.lg;
      return lg ? lg : 12;
    case 'md':
      const md = cols.md;
      return md ? md : 12;
    case 'sm':
      const sm = cols.sm;
      return sm ? sm : 12;
    case 'xs':
      const xs = cols.xs;
      return xs ? xs : 12;
  }
}
