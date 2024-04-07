import * as components from "../src/components/index";

import { App } from "vue";

import * as exportedComposables from "../src/core/composables";
import { Components } from '@/vocabulary/engine';
import { exportedControls } from '../src/components/controls';


import * as schemaFormModelStore from "./store/formModelStore"

export let formUpdateLogger = false;

export type VueSchemaForms = {
  install: (app: App) => void;
};

export type VueSchemaFormsOptions = {
  formUpdateLogger?: boolean;
  customComponents?: Components;
};

export const schemaFormModelStoreTest = schemaFormModelStore
export const composables = exportedComposables;
export const formControls:Components = exportedControls

export const createVueSchemaForms = (options?: VueSchemaFormsOptions): VueSchemaForms => {
  if (options?.formUpdateLogger) {
    formUpdateLogger = options.formUpdateLogger;
  }

  return {
    install: (app: App): void => {
      for (const componentName in components) {
        const component = components[componentName];
        app.component(componentName, component);
      }

      if (options?.customComponents) {
        for (const componentName in options.customComponents) {
          const component = options.customComponents[componentName];
          console.debug(`Register custom component = ${componentName}`);
          app.component(`node-${componentName}`, component);
        }
      }
    },
  };
};
