import set from "lodash/set";

import { EngineField } from "@/types/engine/EngineField";
import { EngineTextField } from "@/types/engine/controls";

import { variableRegexp } from "../../core/engine/utils";
import { useResolveVariables } from "./useResolveVariables";
import { useCustomIfExpression } from "@/core/composables/useCustomIfExpression";

export function useProps() {
  function bindProps(schema: EngineField, model: any = {}) {
    let props: Record<string, string | number | boolean> = {};
    const { resolve } = useResolveVariables(schema);

    switch (schema.layout.component) {
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
      case "select":
        props = {
          ...defaultSelectProps,
          ...schema.options?.fieldProps,
          ...schema.options?.selectProps,
          ...schema.layout?.props,
        };
        break;
      case "button":
        props = {
          ...schema.options?.buttonProps,
          ...schema.layout?.props,
        };
        break;
      default:
        props = {
          "hide-details": "auto",
          ...schema.options?.fieldProps,
          ...schema.layout?.props,
        };
      //console.warn('component is not recognized - used default props');
    }

    for (let [key, value] of Object.entries(props)) {

      if(typeof value === "string" && value.includes("if")){

        useCustomIfExpression(key, props, model)

        //console.debug(props[key])
      }

      if (typeof value === "string" && variableRegexp.test(value)) {
        const obj = resolve(value);
        if (obj.allVariablesResolved) {
          set(props, key, obj.resolvedText);
        } else {
          delete props[key];
        }
      }
    }

    return props;
  }

  return { bindProps: bindProps };
}

const defaultTextFieldProperties = {
  "hide-details": "auto",
};

const defaultCheckboxProperties = {
  density: "compact",
  "hide-details": "auto",
  multiple: true,
};

const defaultRadioProps = {
  density: "compact",
  "hide-details": "auto",
};

const defaultTextAreaProps = {
  rows: 3,
  "auto-grow": true,
  "hide-details": "auto",
};

const defaultSelectProps = {
  "hide-details": "auto",
};
