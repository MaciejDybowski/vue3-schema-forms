import { EngineField } from "./index";
import { Source } from "@/vocabulary/schema/elements";

export interface EngineProps {
  schema: EngineField;
  model: object;
}

export interface EngineTextField extends EngineField {
  calculation?: string;
}

export interface EngineStaticField extends EngineField {
  content: string;
}

export interface EngineDuplicatedSection extends EngineField {}

export interface EngineSourceField extends EngineField {
  source: Source;
}
