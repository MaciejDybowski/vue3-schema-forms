import components from './components';
import '@vue/runtime-core';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    VueSchemaForms: typeof components.VueSchemaForms;
  }
}
