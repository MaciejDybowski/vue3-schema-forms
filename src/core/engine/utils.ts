import { cloneDeep } from 'lodash';

import { jsonSchemaResolver } from '@/core/engine/jsonSchemaResolver';
import {
  collectNestedFormsPathKeys,
  flattenNestedFormsPathNodes,
  hasOptionsRefs,
  MAX_NESTED_FORM_DEPTH,
  resolveOptionsRefTemplate,
  stripFlatStructureFlag,
} from '@/core/engine/resolveJsonSchemaUtils';
import { baseUri, logger } from '@/main';
import { Schema } from '@/types/schema/Schema';
import { SchemaOptions } from '@/types/schema/SchemaOptions';

export const variableRegexp: RegExp = new RegExp('{.*?}', 'g');

type ExtendedSchemaForResolver = Schema & {
  options?: SchemaOptions;
};

function resolveLocaleToken(schema: any, locale: string) {
  return JSON.parse(JSON.stringify(schema).replaceAll('~$locale~', locale));
}

function hasLocaleRefPlaceholders(schema: any): boolean {
  return JSON.stringify(schema).includes('/~$locale~/');
}

export async function resolveSchemaWithLocale(
  originalSchema: Schema,
  locale: string,
  options?: SchemaOptions
): Promise<Schema> {
  let schema: ExtendedSchemaForResolver = cloneDeep(originalSchema);

  if (logger.resolvedSchemaLogger) {
    console.debug(`[Vue Schema Forms] => Resolved Schema, dane wejściowe:`, schema, options);
  }

  if (options) {
    schema.options = options;
  }

  if (options?.i18n) {
    const resolvedTranslations = await jsonSchemaResolver.resolve(options.i18n, { baseUri });
    schema.i18n = { ...schema.i18n, ...resolvedTranslations.result };
  }

  const availableLanguages = schema.i18n ? Object.keys(schema.i18n) : [];
  const localeWithoutCountry = availableLanguages.includes(locale) ? locale : locale.split('-')[0];

  for (let currentDepth = 0; currentDepth < MAX_NESTED_FORM_DEPTH; currentDepth += 1) {
    const nestedFormsPathKeys = collectNestedFormsPathKeys(schema.properties ?? {}, options ?? {}, '', MAX_NESTED_FORM_DEPTH);
    stripFlatStructureFlag(schema.properties ?? {}, options ?? {}, MAX_NESTED_FORM_DEPTH);

    resolveRefsAndReplace(schema);

    const schemaForResolve = resolveLocaleToken(schema, localeWithoutCountry);
    const resolved = await jsonSchemaResolver.resolve(schemaForResolve, { baseUri });
    schema = cloneDeep(resolved.result);

    flattenNestedFormsPathNodes(schema.properties ?? {}, nestedFormsPathKeys, '', schema, MAX_NESTED_FORM_DEPTH);

    const hasMoreOptionsRefs = hasOptionsRefs(schema.properties ?? {}, options ?? {}, MAX_NESTED_FORM_DEPTH);
    const hasMoreLocaleRefs = hasLocaleRefPlaceholders(schema);

    if (!hasMoreOptionsRefs && !hasMoreLocaleRefs) {
      break;
    }

    if (currentDepth === MAX_NESTED_FORM_DEPTH - 1 && logger.resolvedSchemaLogger) {
      console.debug(
        `[Vue Schema Forms] => Osiągnięto limit ${MAX_NESTED_FORM_DEPTH} poziomów dla nested form blocks.`,
      );
    }
  }

  delete schema.i18n;
  delete schema.options;

  if (logger.resolvedSchemaLogger) {
    console.debug(`[Vue Schema Forms] => Resolved Schema`, schema);
  }
  return schema;
}

function resolveRefsAndReplace(schema: any) {
  const optionsRefPrefix = '#/options/';

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

  function collectNumericReplacements(node: Record<string, any>): Record<number, string> {
    const replacements: Record<number, string> = {};

    Object.keys(node)
      .filter((k) => !isNaN(Number(k)))
      .forEach((k) => {
        replacements[Number(k)] = node[k];
      });

    return replacements;
  }

  function walk(obj: any) {
    if (Array.isArray(obj)) {
      obj.forEach((item) => walk(item));
    } else if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        if (typeof obj[key] === 'object') {
          walk(obj[key]);
        }
      }

      // Obsługa $ref wskazujących na options (np. '#/options/nestedFormsPath')
      // – wstawia parametry numeryczne {0}, {1} itd. w docelowy URL z options
      if (typeof obj.$ref === 'string' && obj.$ref.startsWith(optionsRefPrefix) && schema.options) {
        const optionKey = obj.$ref.slice(optionsRefPrefix.length);
        const refTemplate = resolveOptionsRefTemplate(schema.options, optionKey);

        if (refTemplate) {
          const replacements = collectNumericReplacements(obj);
          let resolvedRef = refTemplate;

          for (const index in replacements) {
            resolvedRef = resolvedRef.replace(`{${index}}`, replacements[Number(index)]);
          }

          // Zastąp $ref na bezpośredni URL z podmienionymi parametrami
          obj.$ref = resolvedRef;

          // Usuń parametry numeryczne – zostały już wstawione
          for (const index in replacements) {
            delete obj[index];
          }
        } else if (logger.resolvedSchemaLogger) {
          console.debug(`[Vue Schema Forms] => Niepoprawna definicja options.${optionKey} dla $ref`, schema.options?.[optionKey]);
        }
      }

      if (obj.$ref && obj.$ref.includes('/~$locale~/')) {
        const refPath = obj.$ref.split('/~$locale~/')[1];
        const pathParts = refPath.split('/');

        const replacements = collectNumericReplacements(obj);

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
