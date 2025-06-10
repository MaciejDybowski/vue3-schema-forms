import { inject, provide } from 'vue';

import { FormModelInstance, useFormModel } from './useFormModel';

const FORM_MODEL_KEY = Symbol();

export function provideFormModel() {
  const form = useFormModel();
  provide(FORM_MODEL_KEY, form);
  return form;
}

export function useInjectedFormModel(): FormModelInstance {
  const form = inject<FormModelInstance>(FORM_MODEL_KEY);
  if (!form) throw new Error('Form model not provided');
  return form;
}