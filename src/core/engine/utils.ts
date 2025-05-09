import { jsonSchemaResolver } from "@/core/engine/jsonSchemaResolver";
import { SchemaOptions, baseUri } from "@/main";
import { Schema } from "@/types/schema/Schema";
import { cloneDeep } from "lodash";

export const variableRegexp: RegExp = new RegExp("{.*?}", "g");

export async function resolveSchemaWithLocale(schema: Schema, locale: string, options?: SchemaOptions): Promise<Schema> {
  if (options) {
    const resolvedTranslations = await jsonSchemaResolver.resolve(options.i18n, { baseUri });
    schema.i18n = { ...schema.i18n, ...resolvedTranslations.result };
  }
  resolveRefsAndReplace(schema);
  
  const temp = JSON.parse(JSON.stringify(schema).replaceAll("~$locale~", locale));
  const resolved = await jsonSchemaResolver.resolve(temp, { baseUri });

  return resolved.result as Schema;
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

  // Tworzymy kopię i18n, żeby uniknąć modyfikacji zamrożonych obiektów
  const i18nCopy = cloneDeep(schema.i18n);

  function walk(obj: any) {
    if (Array.isArray(obj)) {
      obj.forEach((item) => walk(item));
    } else if (typeof obj === "object" && obj !== null) {
      for (const key in obj) {
        if (typeof obj[key] === "object") {
          walk(obj[key]);
        }
      }

      if (obj.$ref && obj.$ref.includes("/~$locale~/")) {
        const refPath = obj.$ref.split("/~$locale~/")[1]; // np. "home/item" albo "longSpan"
        const pathParts = refPath.split("/"); // ['home', 'item'] lub ['longSpan']

        // Zbieramy wszystkie zamienniki {0}, {1}, {2}, ...
        const replacements: Record<number, string> = {};
        Object.keys(obj)
          .filter((k) => !isNaN(Number(k)))
          .forEach((k) => {
            replacements[Number(k)] = obj[k];
          });

        if (Object.keys(replacements).length > 0) {
          for (const locale in i18nCopy) {
            let translation = getDeepValue(i18nCopy[locale], pathParts);
            if (typeof translation === "string") {
              for (const index in replacements) {
                const variable = replacements[Number(index)];
                translation = translation.replace(`{${index}}`, variable);
              }
              setDeepValue(i18nCopy[locale], [...pathParts], translation);
            }
          }

          // Po podmianie usuwamy klucze 0,1,2,...
          for (const index in replacements) {
            delete obj[index];
          }
        }
      }
    }
  }

  walk(schema.properties);

  // Nadpisujemy schema.i18n zaktualizowaną wersją
  schema.i18n = i18nCopy;
}