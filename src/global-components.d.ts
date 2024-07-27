import VueSchemaForms from '@/components/engine/VueSchemaForms.vue';
import FormErrorVisualization from '@/components/engine/validation/FormErrorVisualization.vue';

import '@vue/runtime-core';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    VueSchemaForms: typeof VueSchemaForms;
    FormErrorVisualization: typeof FormErrorVisualization;
  }
}
