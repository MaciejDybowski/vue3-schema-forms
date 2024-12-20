import jsonata from "jsonata";

import { useNumber } from "@/core/composables/useNumber";
import { useFormModelStore } from "@/store/formModelStore";
import { EngineField } from "@/types/engine/EngineField";

import { variableRegexp } from "../engine/utils";
import { useDateFormat } from "./useDateFormat";
import dayjs from "dayjs";
import { controlOrMetaKey } from "@storybook/manager-api";

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
        const defaultValue = split.length === 2 ? split[1] : null;

        const formModelStore = useFormModelStore(field.formId);
        const model = formModelStore.getFormModelForResolve;

        if(variable.includes("[]") && field.path){
          const splitPath = field.path?.split(".")
          const splitVariable = variable.split(".")

          console.debug(splitPath, splitVariable)
          splitVariable.forEach((item,index) => {

          })
          // variable = splitVariable.join(".")

          // to obsłużyło poziom 2 tablica w tablicy
          console.debug(`[${field.key}] variable to resolve = `, variable)
          console.debug(`fieldPath = ${field.path}, fieldIndex = ${field.index}`)


          let temp = dopasujTablice(splitPath, splitVariable)
          console.debug("temp", temp)
          variable = temp.join(".")

          variable = variable.replace("[]", `[${field.index}]`)
          console.debug("after", variable)
          // if(variable.includes("[]")){
          //   variable = variable.replace(field.path, field.path+`[${field.index}]`)
          // }
          // to obsłużyło poziom 1 zagnieżdzenia tablicy
        }
        //console.debug(variable)


        const nata = jsonata(variable);
        let value = await nata.evaluate(model);

        value = doSthWithValue(field, value, defaultValue, title, rawNumber)
        inputString = inputString.replace(match, value + "");

        if (!value) {
          allVariablesResolved = false;
        }
      }
    }

    return { resolvedText: inputString, allVariablesResolved };
  }

  function dopasujTablice(tablicaA, tablicaB) {
    // Funkcja pomocnicza do wyodrębnienia nazwy pola bez indeksu
    function ekstraktNazwa(pole) {
      return pole.split('[')[0];
    }

    // Iterujemy po tablicy B i próbujemy uzupełnić indeksy
    return tablicaB.map(elementB => {
      // Jeśli element ma "[]", próbujemy dopasować do tablicy A
      if (elementB.includes("[]")) {
        const nazwaB = ekstraktNazwa(elementB);
        // Znajdź pierwszy pasujący element z tablicy A
        const dopasowany = tablicaA.find(a => ekstraktNazwa(a) === nazwaB);
        // Zastąp element B, jeśli znaleziono dopasowanie
        return dopasowany || elementB;
      }
      // Jeśli element nie ma "[]", przepisz go bez zmian
      return elementB;
    });
  }
  function uzupelnijTablice(tablicaA, tablicaB) {
    // Funkcja pomocnicza do wyodrębnienia nazwy pola bez nawiasów kwadratowych
    function ekstraktNazwa(pole) {
      return pole.replace(/\[\]$/, ""); // Usuwa końcowe "[]"
    }

    // Tworzymy nową tablicę wynikową
    const wynik = tablicaA.map(elementA => {
      const nazwaA = ekstraktNazwa(elementA);
      // Sprawdzamy, czy w tablicy B istnieje element z nazwą i "[]"
      const istniejeWTablicyB = tablicaB.some(
        elementB => ekstraktNazwa(elementB) === nazwaA && elementB.endsWith("[]")
      );
      // Jeśli istnieje, dodajemy "[]", w przeciwnym razie pozostawiamy bez zmian
      return istniejeWTablicyB ? `${nazwaA}[]` : elementA;
    });
    return wynik;
  }

  function doSthWithValue(field, value: any, defaultValue: any, title, rawNumber=false){
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
        value = formattedNumber(value, "decimal", field.precision ? Number(field.precision) : 2);
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

    return value;
  }

  return { resolve };
}
