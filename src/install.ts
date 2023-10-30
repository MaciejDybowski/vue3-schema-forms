import * as components from '../src/components/index';
import VueSchemaForms from '@/components/engine/vue-schema-forms.vue';
import { App } from 'vue';
import { Component } from '@vue/runtime-core';

export default {
  install: (app: App, options?: any) => {
    for (const componentName in components) {
      // @ts-ignore
      const component = components[componentName] as Component
      app.component(componentName, component);
    }
  },
};

export {VueSchemaForms}
