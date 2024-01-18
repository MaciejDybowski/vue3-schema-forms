import { EngineField } from "@/vocabulary/engine";

export function useClass() {
  function bindClass(schema: EngineField): string {
    let classString = "";
    if (schema.required) {
      classString += "required-input ";
    }
    return classString;
  }

  return { bindClass };
}
