import { Parser } from "expr-eval";
import get from "lodash/get";

const betterParser = new Parser({
  operators: {
    logical: true,
  },
});

export default betterParser;

export function SUM(calculation: string, model: object) {
  if (calculation.includes("SUM")) {
    let regex = /SUM\((.*?)\)/;
    let match = regex.exec(calculation);
    if (match) {
      let parameters = match[1];
      let parameterArray = parameters.split(",").map((param) => param.trim());
      const array = get(model, parameterArray[1]) == 0 ? [] : get(model, parameterArray[1], []);
      const sum = array?.reduce((partialSum: number, item: object) => partialSum + get(item, parameterArray[0], 0), 0);
      return calculation.replace(`SUM(${parameterArray.join(",")})`, sum + "");
    }
  }
  return calculation;
}
