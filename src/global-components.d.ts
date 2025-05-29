import { DefineComponent } from 'vue';

import '@vue/runtime-core';

import { FormExternalAction } from '@/types/engine/FormExternalAction';
import { FormModel } from '@/types/engine/FormModel';
import { ValidationFromBehaviour } from '@/types/engine/ValidationFromBehaviour';
import { ValidationFromError } from '@/types/engine/ValidationFromError';
import { Schema } from '@/types/schema/Schema';
import { SchemaOptions } from '@/types/schema/SchemaOptions';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    VueSchemaForms: DefineComponent<
      {
        schema: Schema;
        options?: SchemaOptions;
        defaultFormActions?: boolean;
        validationBehaviour?: ValidationFromBehaviour;
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {
        'update:modelValue': (val: FormModel) => void;
        isFormReady: () => void;
        callAction: (payload: FormExternalAction) => void;
      }
    >;
    FormErrorVisualization: DefineComponent<
      {
        errorMessages: Array<ValidationFromError>;
      },
      {},
      {},
      {},
      {},
      {},
      {}
    >;
  }
}
