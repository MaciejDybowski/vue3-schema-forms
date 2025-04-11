import { EngineField } from "@/types/engine/EngineField";

export function useClass() {
  function bindClass(schema: EngineField): string {
    let classString = "";

    if (schema.layout.class) {
      classString += schema.layout.class;
    }

    if (schema.layout.component.includes("number-field")) {
      classString += " content-right";
    }
    return classString;
  }

  return { bindClass };
}