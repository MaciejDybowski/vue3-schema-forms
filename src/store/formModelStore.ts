import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useFormModelStore = (formId: string) =>
  defineStore(`formModelStore-${formId}`, () => {
    const model = ref({});
    const getFormModel = computed(() => {
      return model.value;
    });

    function updateFormModel(obj: object) {
      model.value = obj;
    }

    return { model, getFormModel, updateFormModel };
  })();
