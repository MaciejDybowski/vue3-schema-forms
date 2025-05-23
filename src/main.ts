import { App, Component } from "vue";

import { vueSchemaFromControls } from "@/components/controls";
import DuplicatedSectionBatchAddDialogBody
  from "@/components/controls/duplicated-section/DuplicatedSectionBatchAddDialogBody.vue";

import {
  useCalculation,
  useClass,
  useConditionalRendering,
  useDateFormat,
  useDateTimeFormat,
  useDictionary,
  useExpression,
  useFormModel,
  useLabel,
  useLocale,
  useProps,
  useResolveVariables,
  useRules,
  useSource
} from "@/core/composables";
import { EngineField } from "@/types/engine/EngineField";
import { Schema } from "@/types/schema/Schema";
import { SchemaComponent } from "@/types/schema/SchemaComponent";
import { SchemaField } from "@/types/schema/SchemaField";
import { SchemaOptions } from "@/types/schema/SchemaOptions";
import { Cols } from "@/types/shared/Cols";
import { DuplicatedSectionOptions } from "@/types/shared/DuplicatedSectionOptions";
import { Layout } from "@/types/shared/Layout";
import { SchemaFieldType } from "@/types/shared/SchemaFieldType";
import { Source } from "@/types/shared/Source";
import { StaticContentTag } from "@/types/shared/StaticContentTag";
import { Translation } from "@/types/shared/Translation";

import * as components from "../src/components/index";

export declare type Components = Record<string, Component>;
export let logger = {
  formUpdateLogger: false,
  calculationListener: false,
  JSONataExpressionListener: false,
  propsValueMappingListener: false,
  conditionalRenderingListener: false,
  dictionaryLogger: false,
  duplicatedSchemaWatchLogger: false,
  eventEmitterListener: false,
  registerComponentLogger: false
};

export let duplicatedSectionBatchAddComponent = {
  "batch-add-dialog-body": DuplicatedSectionBatchAddDialogBody
} as Components;

export type VueSchemaLoggers = {
  formUpdateLogger?: boolean;
  calculationListener?: boolean;
  customIfExpressionListener?: boolean;
  propsValueMappingListener?: boolean;
  conditionalRenderingListener?: boolean;
  dictionaryLogger?: boolean;
  duplicatedSchemaWatchLogger?: boolean;
  eventEmitterListener?: boolean;
  registerComponentLogger?: boolean;
};

export type VueSchemaForms = {
  install: (app: App) => void;
};

export type VueSchemaFormsOptions = {
  logger?: VueSchemaLoggers;
  customComponents?: Components;
  installFormControls?: boolean;
  duplicatedSectionBatchAddComponent?: Components;
  baseUri?: string;
};

export let baseUri = window.origin;

export const createVueSchemaForms = (options?: VueSchemaFormsOptions): VueSchemaForms => {
  if (options?.logger) {
    logger = { ...logger, ...options.logger };
  }
  if (options?.duplicatedSectionBatchAddComponent) {
    duplicatedSectionBatchAddComponent = options?.duplicatedSectionBatchAddComponent;
  }
  if (options?.baseUri) {
    baseUri = options?.baseUri;
  }

  return {
    install: (app: App): void => {
      for (const componentName in components) {
        // @ts-ignore
        const component = components[componentName];
        if (!app.component(componentName)) {
          if (logger.registerComponentLogger) {
            console.debug(`[vue3-schema-forms] - register component - ${componentName}`);
          }
          app.component(componentName, component);
        }
      }

      if (options?.customComponents) {
        for (const componentName in options.customComponents) {
          const component = options.customComponents[componentName];
          if (logger.registerComponentLogger) {
            console.debug(`[vue3-schema-forms] - register custom component = ${componentName}`);
          }
          app.component(`node-${componentName}`, component);
        }
      }

      if (options?.installFormControls) {
        for (const componentName in vueSchemaFromControls) {
          const component = vueSchemaFromControls[componentName];
          if (!app.component(`node-${componentName}`)) {
            if (logger.registerComponentLogger) {
              console.debug(`[vue3-schema-forms] - install form control - ${componentName}`);
            }
            app.component(`node-${componentName}`, component);
          }
        }
      }
    }
  };
};

export type {
  EngineField,
  Schema,
  SchemaOptions,
  SchemaComponent,
  SchemaField,
  Cols,
  DuplicatedSectionOptions,
  Layout,
  SchemaFieldType,
  Source,
  StaticContentTag,
  Translation
};
export {
  useLabel,
  useCalculation,
  useClass,
  useConditionalRendering,
  useDateFormat,
  useDateTimeFormat,
  useDictionary,
  useExpression,
  useFormModel,
  useLocale,
  useProps,
  useResolveVariables,
  useRules,
  useSource
};
