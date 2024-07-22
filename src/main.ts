import { App, Component } from "vue";

import { vueSchemaFromControls } from "@/components/controls";

import * as components from "../src/components/index";
import * as exportedComposables from "../src/core/composables";

export declare type Components = Record<string, Component>;
export let formUpdateLogger = false;

export type VueSchemaForms = {
  install: (app: App) => void;
};

export type VueSchemaFormsOptions = {
  formUpdateLogger?: boolean;
  customComponents?: Components;
  installFormControls?: boolean;
};

// jeżeli nie sprawi problemów w najbliższym czasie to do usunięcia
// import * as schemaFormModelStore from './store/formModelStore';
// export const schemaFormModelStoreInit = schemaFormModelStore;
export const composables = exportedComposables;

export const createVueSchemaForms = (options?: VueSchemaFormsOptions): VueSchemaForms => {
  if (options?.formUpdateLogger) {
    formUpdateLogger = options.formUpdateLogger;
  }

  return {
    install: (app: App): void => {
      for (const componentName in components) {
        const component = components[componentName];
        if (!app.component(componentName)) {
          console.debug(`[vue3-schema-forms] - register component - ${componentName}`);
          app.component(componentName, component);
        }
      }

      if (options?.customComponents) {
        for (const componentName in options.customComponents) {
          const component = options.customComponents[componentName];
          console.debug(`[vue3-schema-forms] - register custom component = ${componentName}`);
          app.component(`node-${componentName}`, component);
        }
      }

      if (options?.installFormControls) {
        for (const componentName in vueSchemaFromControls) {
          const component = vueSchemaFromControls[componentName];
          if (!app.component(`node-${componentName}`)) {
            console.debug(`[vue3-schema-forms] - install form control - ${componentName}`);
            app.component(`node-${componentName}`, component);
          }
        }
      }
    },
  };
};
