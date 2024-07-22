import jsonSchemaResolver from "./jsonSchemaResolver";
import { Schema } from "@/types/schema/Schema";

export const variableRegexp: RegExp = new RegExp("{.*?}", "g");

export async function resolveSchemaWithLocale(schema: Schema, locale: string): Promise<Schema> {
  const temp = JSON.parse(JSON.stringify(schema).replaceAll("~$locale~", locale));
  const resolved = await jsonSchemaResolver.resolve(temp);
  return resolved.result as Schema;
}
