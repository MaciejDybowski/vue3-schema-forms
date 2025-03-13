import { jsonSchemaResolver } from "@/core/engine/jsonSchemaResolver";
import { Schema } from "@/types/schema/Schema";
import contextObjectStories from "@/stories/features/ContextObject.stories";

export const variableRegexp: RegExp = new RegExp("{.*?}", "g");

export async function resolveSchemaWithLocale(schema: Schema, locale: string): Promise<Schema> {
  const temp = JSON.parse(JSON.stringify(schema).replaceAll("~$locale~", locale));
  const baseUri = window.origin
  const resolved = await jsonSchemaResolver.resolve(temp, { baseUri });
  return resolved.result as Schema;
}
