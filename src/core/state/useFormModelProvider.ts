import { inject, provide } from 'vue';

import { FormModelInstance, useFormModel } from './useFormModel';

const FORM_MODEL_KEY = Symbol();

export function provideFormModel() {
  const form = useFormModel();
  provide(FORM_MODEL_KEY, form);
  return form;
}

export function useInjectedFormModel(): FormModelInstance {
  let form = inject<FormModelInstance>(FORM_MODEL_KEY);
  if (!form) {
    console.warn(`Form model not provided - autoprovider was fired`);
    provideFormModel();
    form = inject<FormModelInstance>(FORM_MODEL_KEY);
  }
  return form as FormModelInstance;
}
