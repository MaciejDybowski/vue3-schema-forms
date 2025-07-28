import { App, Component } from 'vue';

import { vueSchemaFromControls } from '@/components/controls';
import DuplicatedSectionBatchAddDialogBody from '@/components/controls/duplicated-section/DuplicatedSectionBatchAddDialogBody.vue';

export * from './components';

import * as components from '../src/components/index';
export * from "./core/state/useFormModelProvider"
export * from "./core/composables/useGeneratorCache"

export declare type Components = Record<string, Component>;
export let logger = {
  formUpdateLogger: false,
  calculationListener: false,
  JSONataExpressionListener: false,
  propsValueMappingListener: false,
  conditionalRenderingListener: false,
  dictionaryLogger: false,
  duplicatedSchemaWatchLogger: false,
  eventEmitterListener: false,
  registerComponentLogger: false,
};

export let duplicatedSectionBatchAddComponent = {
  'batch-add-dialog-body': DuplicatedSectionBatchAddDialogBody,
} as Components;

export type VueSchemaLoggers = {
  formUpdateLogger?: boolean;
  calculationListener?: boolean;
  customIfExpressionListener?: boolean;
  propsValueMappingListener?: boolean;
  conditionalRenderingListener?: boolean;
  dictionaryLogger?: boolean;
  duplicatedSchemaWatchLogger?: boolean;
  eventEmitterListener?: boolean;
  registerComponentLogger?: boolean;
};

export type VueSchemaForms = {
  install: (app: App) => void;
};

export type VueSchemaFormsOptions = {
  logger?: VueSchemaLoggers;
  customComponents?: Components;
  installFormControls?: boolean;
  duplicatedSectionBatchAddComponent?: Components;
  baseUri?: string;
};

export let baseUri = window.origin;

export const createVueSchemaForms = (options?: VueSchemaFormsOptions): VueSchemaForms => {
  if (options?.logger) {
    logger = { ...logger, ...options.logger };
  }
  if (options?.duplicatedSectionBatchAddComponent) {
    duplicatedSectionBatchAddComponent = options?.duplicatedSectionBatchAddComponent;
  }
  if (options?.baseUri) {
    baseUri = options?.baseUri;
  }

  return {
    install: (app: App): void => {
      for (const componentName in components) {
        // @ts-ignore
        const component = components[componentName];
        if (!app.component(componentName)) {
          if (logger.registerComponentLogger) {
            console.debug(`[vue3-schema-forms] - register component - ${componentName}`);
          }
          app.component(componentName, component);
        }
      }

      if (options?.customComponents) {
        for (const componentName in options.customComponents) {
          const component = options.customComponents[componentName];
          if (logger.registerComponentLogger) {
            console.debug(`[vue3-schema-forms] - register custom component = ${componentName}`);
          }
          app.component(`node-${componentName}`, component);
        }
      }

      if (options?.installFormControls) {
        for (const componentName in vueSchemaFromControls) {
          const component = vueSchemaFromControls[componentName];
          if (!app.component(`node-${componentName}`)) {
            if (logger.registerComponentLogger) {
              console.debug(`[vue3-schema-forms] - install form control - ${componentName}`);
            }
            app.component(`node-${componentName}`, component);
          }
        }
      }
    },
  };
};


