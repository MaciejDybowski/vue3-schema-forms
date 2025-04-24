import { jsonSchemaResolver } from "@/core/engine/jsonSchemaResolver";
import { baseUri } from "@/main";
import { Schema } from "@/types/schema/Schema";

export const variableRegexp: RegExp = new RegExp("{.*?}", "g");

export async function resolveSchemaWithLocale(schema: Schema, locale: string): Promise<Schema> {
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

  function walk(obj: any, i18n: any) {
    if (Array.isArray(obj)) {
      obj.forEach((item) => walk(item, i18n));
    } else if (typeof obj === "object" && obj !== null) {
      for (const key in obj) {
        if (typeof obj[key] === "object") {
          walk(obj[key], i18n);
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
          for (const locale in i18n) {
            let translation = getDeepValue(i18n[locale], pathParts);
            if (typeof translation === "string") {
              for (const index in replacements) {
                const variable = replacements[Number(index)];
                translation = translation.replace(`{${index}}`, variable);
              }
              setDeepValue(i18n[locale], [...pathParts], translation);
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

  walk(schema.properties, schema.i18n);
}
