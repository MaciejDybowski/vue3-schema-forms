import { useJSONataExpression } from '@/core/composables/useJSONataExpression';
import { EngineField } from '@/types/engine/EngineField';
import { EngineTextField } from '@/types/engine/controls';

import { variableRegexp } from "@/core/engine/utils";
import { useResolveVariables } from './useResolveVariables';
import { ref } from 'vue';
import { useEventBus } from '@vueuse/core';
import { cloneDeep } from 'lodash';
import { logger } from '@/main';

export function useProps() {
  const { resolve } = useResolveVariables();
  const { resolveJSONataExpression } = useJSONataExpression();
  const vueSchemaFormEventBus = useEventBus<string>('form-model');

  let props = ref<Record<string, string | number | boolean>>({});
  let propsClone = ref<Record<string, string | number | boolean>>({});


  async function bindProps(schema: EngineField) {

    switch (schema.layout.component) {
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
      case "static-content": {
        props.value = {
          ...schema.layout?.props,
        }
        break
      }
      case "avatar": {
        props.value = {
          ...schema.layout?.props,
        }
        break
      }
      case "image":
        props.value = {
          ...schema.layout?.props,
        }
        break;
      default:
        props.value = {
          'hide-details': 'auto',
          ...schema.options?.fieldProps,
          ...schema.layout?.props,
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

        vueSchemaFormEventBus.on((event, payloadIndex) => propsValueMappingListener(event, payloadIndex, key, schema));
      }
    }

    //console.debug(`[props] - ${schema.key}, index=${schema.index}`);
    return props;
  }

  async function propsValueMappingListener(event: string, payloadIndex: number, keyToResolve: string, schema: EngineField) {
    //if (schema.index == undefined || schema.index == payloadIndex) {
      await new Promise(r => setTimeout(r, 10));
      const inputString = propsClone.value[keyToResolve];
      const obj = await resolve(schema, inputString as string);
      props.value[keyToResolve] = obj.resolvedText;

      if (logger.propsValueMappingListener) console.debug(`[vue-schema-forms] [PropsValueMappingListener] => key=[${keyToResolve}], value=[${obj.resolvedText}], index=[${payloadIndex}]`);
    //}

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
