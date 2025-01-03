import get from "lodash/get";

import dayjs from "@/components/controls/date/dayjs";

import { useNumber } from "@/core/composables/useNumber";
import { usePreparedModelForExpression } from "@/core/composables/usePreparedModelForExpression";
import { EngineField } from "@/types/engine/EngineField";

import { variableRegexp } from "../engine/utils";
import { useDateFormat } from "./useDateFormat";

export function useResolveVariables() {
  const { dateFormat } = useDateFormat();
  const { formattedNumber, roundTo } = useNumber();

  function resolve(field: EngineField, inputString: string, title: string = "title", rawNumber = false) {
    let allVariablesResolved = true;

    inputString?.match(variableRegexp)?.forEach((match: string) => {
      const unwrapped = match.slice(1, -1);
      const split = unwrapped.split(":");
      const variable = split[0];

      const defaultValue = split.length === 2 ? split[1] : null;

      const model = usePreparedModelForExpression(field);
      let value = get(model, variable, defaultValue);

      /* TODO - przepisać na JSONata
      const formModelStore = useFormModelStore(field.formId);
      const model = formModelStore.getFormModel
      const fieldToVariable = field.path ? field.path + "["+ field.index + "]." + variable: variable
      console.debug(fieldToVariable)
      const nata = jsonata(fieldToVariable);
      let value = await nata.evaluate(model);
      */

      if (typeof value === "number" && value !== 0) {
        if (rawNumber) {
          // gdy chcemy używać liczb w adresie URL to nie może być to kropka ani nie może być to formatowane
          // TODO
          value = Number(value);
          if (!!value && !isNaN(value)) {
            value = value + "";
            value = value?.replaceAll(",", ".");
          }
        } else {
          value = formattedNumber(
            value,
            "decimal",
            field.precisionMin ? field.precisionMin : 0,
            field.precision ? Number(field.precision) : 2,
          );
        }
      }
      if (
        typeof value === "string" &&
        dayjs(value).isValid() &&
        value.length == 10 &&
        (value.includes("/") || value.includes(".") || value.includes("-"))
      ) {
        value = dayjs(value).format(dateFormat.value);
      }
      if (typeof value == "object" && value !== null) {
        value = value[title];
      }

      if ((value == null && defaultValue !== null) || (value == "" && value != 0)) {
        value = defaultValue;
      }
      if (!value) {
        allVariablesResolved = false;
      }
      inputString = inputString.replace(match, value + "");
    });

    return { resolvedText: inputString, allVariablesResolved };
  }

  return { resolve };
}
