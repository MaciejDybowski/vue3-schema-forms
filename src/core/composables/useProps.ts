import { useEventBus } from '@vueuse/core';
import { cloneDeep } from 'lodash';

import { ref } from 'vue';

import { useJSONataExpression } from '@/core/composables/useJSONataExpression';
import { variableRegexp } from '@/core/engine/utils';
import { logger } from '@/main';
import { EngineField } from '@/types/engine/EngineField';
import { EngineTextField } from '@/types/engine/controls';

import { useResolveVariables } from './useResolveVariables';

export function useProps() {
  const { resolve } = useResolveVariables();
  const { resolveJSONataExpression } = useJSONataExpression();
  const vueSchemaFormEventBus = useEventBus<string>('form-model');

  let props = ref<Record<string, string | number | boolean | any>>({});
  let propsClone = ref<Record<string, string | number | boolean>>({});

  async function bindProps(schema: EngineField) {
    switch (schema.layout.component) {
      case 'alert':
        props.value = {
          ...schema.layout?.props,
        };
        break;
      case 'text-field':
        props.value = {
          ...defaultTextFieldProperties,
          ...schema.options?.fieldProps,
          ...schema.options?.textFieldProps,
          ...schema.layout?.props,
        };
        if ((schema as EngineTextField).calculation) {
          props.value.readonly = true;
        }
        break;
      case 'radio-button':
        props.value = {
          ...defaultRadioProps,
          ...schema.options?.fieldProps,
          ...schema.options?.radioButtonProps,
          ...schema.layout?.props,
        };
        break;
      case 'checkbox':
        props.value = {
          ...defaultCheckboxProperties,
          ...schema.options?.fieldProps,
          ...schema.options?.checkboxProps,
          ...schema.layout?.props,
        };
        break;
      case 'text-area':
        props.value = {
          ...defaultTextAreaProps,
          ...schema.options?.fieldProps,
          ...schema.options?.textAreaProps,
          ...schema.layout?.props,
        };
        break;
      case 'select':
        props.value = {
          ...defaultSelectProps,
          ...schema.options?.fieldProps,
          ...schema.options?.selectProps,
          ...schema.layout?.props,
        };
        break;
      case 'button':
        props.value = {
          ...schema.options?.buttonProps,
          ...schema.layout?.props,
        };
        break;
      case 'static-content': {
        props.value = {
          ...schema.layout?.props,
        };
        break;
      }
      case 'validation-messages-viewer': {
        props.value = {
          ...schema.layout?.props,
        };
        break;
      }
      case 'avatar': {
        props.value = {
          ...schema.layout?.props,
        };
        break;
      }
      case 'image':
        props.value = {
          ...schema.layout?.props,
        };
        break;
      case 'user-input':
        props.value = {
          ...schema.options?.fieldProps,
          'hide-details': 'auto',
          ...schema.layout?.props,
        };
        break;
      default:
        props.value = {
          ...schema.options?.fieldProps,
          'hide-details': 'auto',
          ...schema.layout?.props,
        };
    }
    overrideReadonlyPropIfExistsInFieldProps(schema);
    propsClone.value = cloneDeep(props.value);
    await resolveExpressionsInPropsAndRunListener(schema);
    //console.debug(`[props] - ${schema.key}, index=${schema.index}, props=`, props.value);
    return props;
  }

  async function resolveExpressionsInPropsAndRunListener(schema: EngineField) {
    for (let [key, value] of Object.entries(props.value)) {
      if (typeof value === 'string' && value.includes('nata(')) {
        await resolveJSONataExpression(key, props.value, schema);
      }

      if (typeof value === 'string' && variableRegexp.test(value)) {
        const obj = await resolve(schema, value);
        props.value[key] = obj.resolvedText;

        vueSchemaFormEventBus.on(() => propsValueMappingListener(key, schema));
      }
    }
  }

  async function propsValueMappingListener(keyToResolve: string, schema: EngineField) {
    await new Promise((r) => setTimeout(r, 10));
    const inputString = propsClone.value[keyToResolve];
    const obj = await resolve(schema, inputString as string);
    props.value[keyToResolve] = obj.resolvedText;

    if (logger.propsValueMappingListener)
      console.debug(
        `[vue-schema-forms] [PropsValueMappingListener] => key=[${keyToResolve}], value=[${obj.resolvedText}]`,
      );
  }

  /*
    Readonly in fieldProps should have global effect on form field and when individual field has this props as expression it must be overridden
   */
  function overrideReadonlyPropIfExistsInFieldProps(schema: EngineField) {
    if (
      schema.options.fieldProps?.readonly == true &&
      typeof schema.layout.props?.readonly == 'string'
    ) {
      props.value.readonly = true;
    }
  }

  return { bindProps: bindProps, fieldProps: props };
}

const defaultTextFieldProperties = {
  'hide-details': 'auto',
};

const defaultCheckboxProperties = {
  density: 'compact',
  'hide-details': 'auto',
  multiple: true,
};

const defaultRadioProps = {
  density: 'compact',
  'hide-details': 'auto',
};

const defaultTextAreaProps = {
  rows: 3,
  'auto-grow': true,
  'hide-details': 'auto',
};

const defaultSelectProps = {
  'hide-details': 'auto',
};
