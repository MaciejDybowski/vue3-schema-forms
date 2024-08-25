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

    const readyMap = ref({
      test: false,
    });
    const isFromReady = computed(() => {
      return Object.values(readyMap.value).every((value) => value);
    });

    function updateReadyMap(key: string, value: boolean) {
      readyMap.value[key] = value;
    }

    return { model, getFormModel, updateFormModel, isFromReady, updateReadyMap };
  })();
