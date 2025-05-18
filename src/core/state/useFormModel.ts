import { computed, ref } from "vue";

export type FormModelInstance = ReturnType<typeof useFormModel>;


export function useFormModel() {
  const model = ref({});
  const context = ref({});

  const getFormModel = computed(() => model.value);

  const getFormModelForResolve = computed(() => ({
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
