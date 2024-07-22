import get from "lodash/get";
import set from "lodash/set";
import { watch } from "vue";

export function useResolveDependency(key: string, source: string, modelToWatch: object, objectToSet: object) {
  const result = get(modelToWatch, source, null);

  watch(modelToWatch, () => {
    const tempResult = get(modelToWatch, source, null);
    if (result !== tempResult) {
      set(objectToSet, key, tempResult);
    }
  });

  if (result) {
    set(objectToSet, key, result);
  }
}
