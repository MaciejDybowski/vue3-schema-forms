import * as components from '../src/components/index';
import { App } from 'vue';

export let formUpdateLogger = false;

export type VueSchemaForms = {
  install: (app: App) => void;
};

export type VueSchemaFormsOptions = {
  formUpdateLogger: boolean
}

export const createVueSchemaForms = (options?: VueSchemaFormsOptions): VueSchemaForms => {
  if (options?.formUpdateLogger) {
    formUpdateLogger = options.formUpdateLogger;
  }
  // TODO options
  return {
    install: (app: App): void => {
      for (const componentName in components) {
        // @ts-ignore
        const component = components[componentName];
        app.component(componentName, component);
      }
    },
  };
};
