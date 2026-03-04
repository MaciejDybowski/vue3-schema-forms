import { cloneDeep } from 'lodash';

import { jsonSchemaResolver } from '@/core/engine/jsonSchemaResolver';
import { baseUri } from '@/main';
import { Schema } from '@/types/schema/Schema';
import { SchemaOptions } from '@/types/schema/SchemaOptions';

export const variableRegexp: RegExp = new RegExp('{.*?}', 'g');

export async function resolveSchemaWithLocale(
  originalSchema: Schema,
  locale: string,
  options?: SchemaOptions,
): Promise<Schema> {
  const schema = cloneDeep(originalSchema);

  if (options?.nestedFormsPath) {
    const nestedFormsPathTemplate = resolveNestedFormsPathTemplate(options.nestedFormsPath);
    if (nestedFormsPathTemplate) {
      resolveNestedFormsRefs(schema, nestedFormsPathTemplate, (options.context as Record<string, any>) ?? {});
    }
  }

  if (options?.i18n) {
    const resolvedTranslations = await jsonSchemaResolver.resolve(options.i18n, { baseUri });
    schema.i18n = { ...schema.i18n, ...resolvedTranslations.result };
  }

  resolveRefsAndReplace(schema);

  let languages = originalSchema.i18n ? Object.keys(originalSchema.i18n) : [];
  let localeWithoutCountry = languages.includes(locale) ? locale : locale.split('-')[0];

  const temp = JSON.parse(JSON.stringify(schema).replaceAll('~$locale~', localeWithoutCountry));
  let resolved: any = await jsonSchemaResolver.resolve(temp, { baseUri });

  const stillHasRef = JSON.stringify(resolved.result).includes('/~$locale~/');
  if (stillHasRef) {
    return resolveSchemaWithLocale(resolved.result as Schema, localeWithoutCountry);
  }

  return resolved.result as Schema;
}

/**
 * Extracts the URL template string from nestedFormsPath option.
 * Supports both plain string and { $ref: '...' } object forms.
 */
function resolveNestedFormsPathTemplate(nestedFormsPath: string | { $ref: string }): string | null {
  if (typeof nestedFormsPath === 'string') {
    return nestedFormsPath;
  }
  if (typeof nestedFormsPath === 'object' && nestedFormsPath.$ref) {
    return nestedFormsPath.$ref;
  }
  return null;
}

/**
 * Walks the schema and replaces every { $ref: '#/nestedFormsPath', '0': ..., '1': ... }
 * with a resolved $ref URL built from the template and the numeric params.
 *
 * Param value syntax:
 *  - '{context.project.id:default}' – dot-path resolved from options.context, fallback to default
 *  - 'staticValue'                  – used as-is
 */
function resolveNestedFormsRefs(obj: any, template: string, context: Record<string, any>): void {
  function resolveParam(param: string): string {
    const match = param.match(/^\{([^:}]+)(?::([^}]*))?}$/);
    if (match) {
      const [, path, defaultVal = ''] = match;
      const value = path
        .split('.')
        .reduce((acc: any, key) => (acc != null ? acc[key] : undefined), context);
      return value != null ? String(value) : defaultVal;
    }
    return param;
  }

  if (Array.isArray(obj)) {
    obj.forEach((item) => resolveNestedFormsRefs(item, template, context));
  } else if (typeof obj === 'object' && obj !== null) {
    if (obj.$ref === '#/nestedFormsPath') {
      const params: Record<number, string> = {};
      Object.keys(obj)
        .filter((k) => !isNaN(Number(k)))
        .forEach((k) => {
          params[Number(k)] = resolveParam(obj[k]);
        });

      let resolvedUrl = template;
      for (const index in params) {
        resolvedUrl = resolvedUrl.replace(`{${index}}`, params[Number(index)]);
      }

      obj.$ref = resolvedUrl;
      for (const index in params) {
        delete obj[index];
      }
    } else {
      for (const key in obj) {
        resolveNestedFormsRefs(obj[key], template, context);
      }
    }
  }
}

function resolveRefsAndReplace(schema: any) {
  function getDeepValue(obj: any, path: string[]): any {
    return path.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
  }

  function setDeepValue(obj: any, path: string[], value: any) {
    const lastKey = path.pop();
    const target = path.reduce((acc, key) => {
      if (!acc[key]) acc[key] = {};
      return acc[key];
    }, obj);
    if (lastKey) target[lastKey] = value;
  }

  // Głęboka kopia, żeby nie modyfikować zamrożonego obiektu
  const i18nCopy = cloneDeep(schema.i18n);

  function walk(obj: any) {
    if (Array.isArray(obj)) {
      obj.forEach((item) => walk(item));
    } else if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        if (typeof obj[key] === 'object') {
          walk(obj[key]);
        }
      }

      if (obj.$ref && obj.$ref.includes('/~$locale~/')) {
        const refPath = obj.$ref.split('/~$locale~/')[1];
        const pathParts = refPath.split('/');

        const replacements: Record<number, string> = {};
        Object.keys(obj)
          .filter((k) => !isNaN(Number(k)))
          .forEach((k) => {
            replacements[Number(k)] = obj[k];
          });

        if (Object.keys(replacements).length > 0) {
          for (const locale in i18nCopy) {
            let translation = getDeepValue(i18nCopy[locale], pathParts);
            if (typeof translation === 'string') {
              for (const index in replacements) {
                translation = translation.replace(`{${index}}`, replacements[Number(index)]);
              }
              setDeepValue(i18nCopy[locale], [...pathParts], translation);
            }
          }

          for (const index in replacements) {
            delete obj[index];
          }
        }
      }
    }
  }

  walk(schema.properties);
  schema.i18n = i18nCopy;
}

export function adjustColorForDarkMode(hex: string) {
  hex = hex.replace(/^#/, '');
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  r = Math.min(255, Math.round(r + (255 - r) * 0.4));
  g = Math.min(255, Math.round(g + (255 - g) * 0.4));
  b = Math.min(255, Math.round(b + (255 - b) * 0.4));
  r = Math.round(r * 0.8 + 128 * 0.2);
  g = Math.round(g * 0.8 + 128 * 0.2);
  b = Math.round(b * 0.8 + 128 * 0.2);
  const toHex = (c: any) => c.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
