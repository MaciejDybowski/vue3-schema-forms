import * as components from "../src/components/index";
import { App } from "vue";

export type VueSchemaForms = {
  install: (app: App) => void;
};
export const createVueSchemaForms = (options?: any): VueSchemaForms => {
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
