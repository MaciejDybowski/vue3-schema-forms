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

    const readyMap = ref({});
    const isFromReady = computed(() => {
      if (Object.values(readyMap.value).length == 0) {
        return true;
      }
      // @ts-ignore
      return Object.values(readyMap.value).every(({ load, update }) => load && update);
    });

    function updateReadyMap(key: string, value: boolean, noRequireWaitForUpdate: boolean = false) {
      //console.debug("updateReadyMapCall", key, value);
      if (key in readyMap.value) {
        readyMap.value[key].load = value;
        if (noRequireWaitForUpdate) {
          readyMap.value[key].update = noRequireWaitForUpdate;
        }
      } else {
        readyMap.value[key] = { load: value, update: noRequireWaitForUpdate };
      }
      //console.debug(readyMap.value, isFromReady.value);
    }

    function updateReadyMapUpdate(key: string, value: any) {
      if (typeof value == "object") {
        //console.debug("updateReadyMapUpdateCall", key);
        if (key in readyMap.value) {
          readyMap.value[key].update = true;
        }
        //console.debug(readyMap.value, isFromReady.value);
      }
    }

    return { model, getFormModel, updateFormModel, isFromReady, updateReadyMap, updateReadyMapUpdate };
  })();
