import { ref, watch } from "vue";
import set from "lodash/set";
import {functions} from "../engine/expressionResolver"

export function useExpression(key: string, expression: string, model: object){

  let result = ref();
  let f = functions[extractFunctionName(expression)]
  result.value = f(expression, model)

  watch(model, () => {
    result.value = f(expression, model)
    set(model, key, result.value)
  });

  return result.value;
}

function extractFunctionName(expression: string): string{
  try {
    const match = expression.match(/^(.*?)\(/);
    if (match) {
      return match[1].trim();
    }
  } catch (error){
   console.error(error)
  } finally {
    return ""
  }
}