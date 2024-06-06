import { ref, watch } from "vue";
import {
  MIN,
  MAX,
  CALC_DATE_DIFF_RETURN_DAY,
  CALC_DATE_DIFF_RETURN_HOURS, CALC_DATE_DIFF_RETURN_MINUTES
} from "../engine/evalExprParser";
import set from "lodash/set";

export function useExpression(key: string, expression: string, model: object){

  let result = ref();
  result.value = MIN(result.value ? result.value :expression, model);
  result.value = MAX(result.value ? result.value :expression, model)
  result.value = CALC_DATE_DIFF_RETURN_DAY(result.value ? result.value :expression, model)
  result.value = CALC_DATE_DIFF_RETURN_HOURS(result.value ? result.value :expression, model)
  result.value = CALC_DATE_DIFF_RETURN_MINUTES(result.value ? result.value :expression, model)

  watch(model, () => {
    result.value = MIN(result.value ? result.value :expression, model);
    result.value = MAX(result.value ? result.value :expression, model)
    result.value = CALC_DATE_DIFF_RETURN_HOURS(result.value ? result.value :expression, model)
    result.value = CALC_DATE_DIFF_RETURN_HOURS(result.value ? result.value :expression, model)
    result.value = CALC_DATE_DIFF_RETURN_MINUTES(result.value ? result.value :expression, model)
    set(model, key, result.value)
  });

  return result.value;
}