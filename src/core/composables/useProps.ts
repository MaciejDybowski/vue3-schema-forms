import { EngineField } from "@/vocabulary/engine";
import { SchemaComponent } from "@/vocabulary/schema/elements";
import { EngineTextField } from "@/vocabulary/engine/controls";

export function useProps(schema: EngineField, component: SchemaComponent): Record<string, string | number | boolean> {
  let props: Record<string, string | number | boolean> = {};

  switch (component) {
    case "text-field":
      props = {
        ...schema.options?.textFieldProps,
        ...schema.layout?.props,
      };
      if ((schema as EngineTextField).calculation) {
        props.readOnly = true;
      }
      break;
    case "radio-button":
      props = {
        ...defaultRadioProps,
        ...schema.options?.radioButtonProps,
        ...schema.layout?.props,
      };
      break;
    case "checkbox":
      props = {
        ...defaultCheckboxProperties,
        ...schema.options?.checkboxProps,
        ...schema.layout?.props,
      };
      break;
    case "text-area":
      props = {
        ...defaultTextAreaProps,
        ...schema.options?.textAreaProps,
        ...schema.layout?.props,
      };
      break;
    default:
      console.warn("component is not recognized");
  }
  return props;
}

const defaultCheckboxProperties = {
  density: "compact",
  "hide-details": true,
  multiple: true,
};

const defaultRadioProps = { density: "compact" };

const defaultTextAreaProps = {
  rows: 3,
  "auto-grow": true,
};
