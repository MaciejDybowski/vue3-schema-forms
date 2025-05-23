import { ComputedRef, Ref, computed, ref } from 'vue';

import { FormModelForDependency } from '@/types/shared/FormModelForDependency';
import { FormOptionsContext } from '@/types/shared/FormOptionsContext';

export type FormModelInstance = ReturnType<typeof useFormModel>;

export function useFormModel() {
  const model: Ref<Record<string, any>> = ref({});
  const context: Ref<FormOptionsContext> = ref({});

  const getFormModel = computed(() => model.value);

  const getFormModelForResolve: ComputedRef<FormModelForDependency> = computed(() => ({
    ...model.value,
    context: {
      ...context.value,
    },
  }));

  function updateFormModel(obj: object) {
    model.value = obj;
  }

  function updateFormContext(obj: object) {
    context.value = obj;
  }

  return {
    model,
    getFormModel,
    updateFormModel,
    updateFormContext,
    getFormModelForResolve,
  };
}
