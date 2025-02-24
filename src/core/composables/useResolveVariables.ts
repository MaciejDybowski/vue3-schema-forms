import dayjs from "dayjs";
import jsonata from "jsonata";

import { useNumber } from "@/core/composables/useNumber";
import { useFormModelStore } from "@/store/formModelStore";
import { EngineField } from "@/types/engine/EngineField";

import { variableRegexp } from "../engine/utils";
import { useDateFormat } from "./useDateFormat";

interface VariableSyntaxProps {
  defaultValue: any;
  typeOfValue: any;
  formatterProps: any;
}

export function useResolveVariables() {
  const { dateFormat } = useDateFormat();
  const { formattedNumber, roundTo } = useNumber();

  async function resolve(field: EngineField, inputString: string, title: string = "title", rawNumber = false) {
    let allVariablesResolved = true;

    const arrayOfVariables = inputString.match(variableRegexp);
    if (!!arrayOfVariables) {
      for await (const match of arrayOfVariables) {
        const unwrapped = match.slice(1, -1);
        const split = unwrapped.split(":");
        let variable = split[0];
        const defaultValue = split.length >= 2 ? split[1] : null;
        const typeOfValue = split.length >= 3 ? split[2] : null;
        const formatterProps = split.length == 4 ? split[3] : null;
        const valueProps: VariableSyntaxProps = {
          defaultValue: defaultValue,
          typeOfValue: typeOfValue,
          formatterProps: formatterProps,
        };

        const formModelStore = useFormModelStore(field.formId);
        const model = formModelStore.getFormModelForResolve;
        if (variable.includes("[]") && field.path) {
          variable = fillPath(field.path, field.index as number, variable);
        }

        const nata = jsonata(variable);
        let value = await nata.evaluate(model);

        value = doSthWithValue(field, value, valueProps, title, rawNumber);
        inputString = inputString.replace(match, value + "");

        if (!value) {
          allVariablesResolved = false;
        }
      }
    }

    return { resolvedText: inputString, allVariablesResolved };
  }

  function fillPath(fieldPath: string | undefined, fieldIndex: number | undefined, variable: string) {
    if (!fieldPath && !fieldPath) {
      return variable;
    }
    const splitPath = fieldPath.split(".");
    const splitVariable = variable.split(".");
    splitVariable.forEach((item, index) => {});
    let temp = dopasujTablice(splitPath, splitVariable);
    variable = temp.join(".");
    return variable.replaceAll("[]", `[${fieldIndex}]`);
  }

  function dopasujTablice(tablicaA, tablicaB) {
    function ekstraktNazwa(pole) {
      return pole.split("[")[0];
    }

    return tablicaB.map((elementB) => {
      if (elementB.includes("[]")) {
        const nazwaB = ekstraktNazwa(elementB);
        const dopasowany = tablicaA.find((a) => ekstraktNazwa(a) === nazwaB);
        return dopasowany || elementB;
      }
      return elementB;
    });
  }

  function doSthWithValue(field, value: any, valueProps: VariableSyntaxProps, title, rawNumber = false) {
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
          valueProps.formatterProps ? valueProps.formatterProps : field.precisionMin ? Number(field.precisionMin) : 0,
          valueProps.formatterProps ? valueProps.formatterProps : field.precision ? Number(field.precision) : 2,
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

    if ((value == null && valueProps.defaultValue !== null) || (value == "" && value != 0) || value == undefined || value == "") {
      value = valueProps.defaultValue;
    }

    return value;
  }

  return { resolve, fillPath };
}
