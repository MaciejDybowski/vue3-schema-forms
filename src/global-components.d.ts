import components from "./components";
import "@vue/runtime-core";
import { FormErrorVisualization } from "@/components";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    VueSchemaForms: typeof components.VueSchemaForms;
    FormErrorVisualization: typeof components.FormErrorVisualization;
  }
}

declare module "vue" {
  export interface GlobalComponents {
    VueSchemaForms: typeof components.VueSchemaForms;
    FormErrorVisualization: typeof components.FormErrorVisualization;
  }
}
