import { EngineField } from "@/types/engine/EngineField";
import { Schema } from "@/types/schema/Schema";

export interface EngineButtonField extends EngineField {
  mode: string;
  config: object & Record<string, any>;
  schema?: Schema;
}
