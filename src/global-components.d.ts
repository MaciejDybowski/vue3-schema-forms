import '@vue/runtime-core';

import VueSchemaForms from '@/components/engine/VueSchemaForms.vue';
import FormErrorVisualization from '@/components/engine/validation/FormErrorVisualization.vue';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    VueSchemaForms: typeof VueSchemaForms;
    FormErrorVisualization: typeof FormErrorVisualization;
  }
}
