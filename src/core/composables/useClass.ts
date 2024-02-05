import { EngineField } from "@/vocabulary/engine";

export function useClass() {
  function bindClass(schema: EngineField): string {
    let classString = "";
    if (schema.required) {
      classString += "required-input ";
    }
    if(schema.layout.class){
      classString += schema.layout.class
    }
    console.debug(classString)
    return classString;
  }

  return { bindClass };
}
