import { EngineField } from "@/vocabulary/engine";
import { SchemaComponent } from "@/vocabulary/schema/elements";
import { EngineTextField } from "@/vocabulary/engine/controls";

export function useProps(schema: EngineField, component: SchemaComponent): Record<string, string | number | boolean> {
  let props: Record<string, string | number | boolean> = {};

  switch (component) {
    case "text-field":
      props = {
        ...defaultTextFieldProperties,
        ...schema.options?.fieldProps,
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
        ...schema.options?.fieldProps,
        ...schema.options?.radioButtonProps,
        ...schema.layout?.props,
      };
      break;
    case "checkbox":
      props = {
        ...defaultCheckboxProperties,
        ...schema.options?.fieldProps,
        ...schema.options?.checkboxProps,
        ...schema.layout?.props,
      };
      break;
    case "text-area":
      props = {
        ...defaultTextAreaProps,
        ...schema.options?.fieldProps,
        ...schema.options?.textAreaProps,
        ...schema.layout?.props,
      };
      break;
    case 'select':
      props = {
        ...defaultSelectProps,
        ...schema.options?.fieldProps,
        ...schema.options?.selectProps,
        ...schema.layout?.props,
      };
      break
    default:
      console.warn("component is not recognized");
  }
  return props;
}

const defaultTextFieldProperties = {
  "hide-details": "auto",
}

const defaultCheckboxProperties = {
  density: "compact",
  "hide-details": "auto",
  multiple: true,
};

const defaultRadioProps = {
  density: "compact",
  "hide-details": "auto"
};

const defaultTextAreaProps = {
  rows: 3,
  "auto-grow": true,
  "hide-details": "auto"
};

const defaultSelectProps = {
  "hide-details": "auto"
}
