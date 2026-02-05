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
          ...schema.options?.textFieldProps,
          ...schema.layout?.props,
          ...schema.options?.fieldProps,
        };
        if ((schema as EngineTextField).calculation) {
          props.value.readonly = true;
        }
        break;
      case 'radio-button':
        props.value = {
          ...defaultRadioProps,
          ...schema.options?.radioButtonProps,
          ...schema.layout?.props,
          ...schema.options?.fieldProps,
        };
        break;
      case 'checkbox':
        props.value = {
          ...defaultCheckboxProperties,
          ...schema.options?.checkboxProps,
          ...schema.layout?.props,
          ...schema.options?.fieldProps,
        };
        break;
      case 'text-area':
        props.value = {
          ...defaultTextAreaProps,
          ...schema.options?.textAreaProps,
          ...schema.layout?.props,
          ...schema.options?.fieldProps,
        };
        break;
      case 'select':
        props.value = {
          ...defaultSelectProps,
          ...schema.options?.selectProps,
          ...schema.layout?.props,
          ...schema.options?.fieldProps,
        };
        break;
      case 'button':
        props.value = {
          ...schema.layout?.props,
          ...schema.options?.buttonProps,
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
          'hide-details': 'auto',
          ...schema.layout?.props,
          ...schema.options?.fieldProps,
        };
        break;
      default:
        props.value = {
          'hide-details': 'auto',
          ...schema.layout?.props,
          ...schema.options?.fieldProps,
        };
      //console.warn('component is not recognized - used default props');
    }

    propsClone.value = cloneDeep(props.value);

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

    //console.debug(`[props] - ${schema.key}, index=${schema.index}, props=`, props.value);
    return props;
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
