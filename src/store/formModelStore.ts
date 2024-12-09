import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useFormModelStore = (formId: string) =>
  defineStore(`formModelStore-${formId}`, () => {
    const model = ref({});
    const context = ref({})
    const getFormModel = computed(() => {
      return model.value;
    });

    const getFormModelForResolve = computed(() => {
      return {
        ...model.value,
        context: {
          ...context.value
        }
      }
    })

    function updateFormModel(obj: object) {
      model.value = obj;
    }
    function updateFormContext(obj: object){
      context.value = obj
    }

    return { model, getFormModel, updateFormModel, updateFormContext, getFormModelForResolve };
  })();
