import { jsonSchemaResolver } from "@/core/engine/jsonSchemaResolver";
import { Schema } from "@/types/schema/Schema";

export const variableRegexp: RegExp = new RegExp("{.*?}", "g");

export async function resolveSchemaWithLocale(schema: Schema, locale: string): Promise<Schema> {
  const temp = JSON.parse(JSON.stringify(schema).replaceAll("~$locale~", locale));
  const baseUri = window.origin;
  console.debug("baseUri", baseUri);
  const resolved = await jsonSchemaResolver.resolve(temp, { baseUri });
  console.debug("resolved", resolved.result);
  return resolved.result as Schema;
}
