import { EngineField, NodeUpdateEvent } from '@/vocabulary/engine';
import get from 'lodash/get';
import { Schema } from '@/vocabulary/schema';
import jsonSchemaResolver from './jsonSchemaResolver';
import { DisplayBreakpoint } from 'vuetify';
import { Cols, SchemaComponent } from '@/vocabulary/schema/elements';
import { EngineTextField } from '@/vocabulary/engine/controls';

export function produceUpdateEvent(val: any, schema: EngineField) {
  const event: NodeUpdateEvent = { key: schema.key, value: val };
  schema.on.input(event);
}

export function getValueFromModel(model: object, schema: EngineField): any {
  const value = get(model, schema.key, null);
  if (schema.default && value === null) {
    produceUpdateEvent(schema.default, schema);
    return schema.default;
  }
  return value;
}

export function bindProps(
  schema: EngineField,
  component: SchemaComponent,
): Record<string, string | number | boolean> {
  let props: Record<string, string | number | boolean> = {};

  switch (component) {
    case 'text-field':
      props = { ...schema.options?.textFieldProps, ...schema.layout?.props };
      if ((schema as EngineTextField).calculation) {
        props.readOnly = true;
      }
      break;
    case 'radio-button':
      props = { ...schema.options?.radioButtonProps, ...schema.layout?.props };
      break;
    case 'checkbox':
      props = { ...schema.options?.checkboxProps, ...schema.layout?.props };
      break;
    default:
      console.warn('component is not recognized');
  }
  return props;
}

export function bindClass(schema: EngineField): string {
  let classString = '';
  if (schema.required) {
    classString += 'required-input ';
  }
  return classString;
}

export const variableRegexp: RegExp = new RegExp('{.*?}', 'g');

export async function resolveSchemaWithLocale(
  schema: Schema,
  locale: string,
): Promise<Schema> {
  const temp = JSON.parse(
    JSON.stringify(schema).replaceAll('~$locale~', locale),
  );
  const resolved = await jsonSchemaResolver.resolve(temp);
  return resolved.result as Schema;
}

export function getColsByDisplay(
  displayBreakpoint: DisplayBreakpoint,
  cols: Cols,
): number {
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

export function mapRules(required: boolean): any[] {
  let arr: any[] = [];
  if (required) {
    arr.push((value: any) => {
      if (value) return true;
      return 'Field is required';
    });
  }
  return arr;
}
