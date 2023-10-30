import * as components from '../src/components/index';
import { App } from 'vue';

const VueSchemaForms = {
  install: (app: App): void => {
    for (const componentName in components) {
      // @ts-ignore
      const component = components[componentName];
      app.component(componentName, component);
    }
  },
};

export default VueSchemaForms;
