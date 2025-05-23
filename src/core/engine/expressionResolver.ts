import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import jsonata from 'jsonata';
import get from 'lodash/get';

export const functions: Record<string, Function> = {
  FIND_OLDEST_DATE: FIND_OLDEST_DATE,
  FIND_EARLIEST_DATE: FIND_EARLIEST_DATE,
  CALC_DATE_DIFF_RETURN_DAY: CALC_DATE_DIFF_RETURN_DAY,
  CALC_DATE_DIFF_RETURN_HOURS: CALC_DATE_DIFF_RETURN_HOURS,
  CALC_DATE_DIFF_RETURN_MINUTES: CALC_DATE_DIFF_RETURN_MINUTES,
  DELEGATION_DIET_CALC: DELEGATION_DIET_CALC,
  ARRAY_SIZE: ARRAY_SIZE,
  HASH_GENERATOR: HASH_GENERATOR,
  JSONATA: JSONATA,
};

export async function JSONATA(expression: string, model: object) {
  let regex = /JSONATA\((.*?)\)/;
  let match = regex.exec(expression);
  if (match) {
    let nataExpression = expression.slice(8).slice(0, -1);
    const nata = jsonata(nataExpression);
    return await nata.evaluate(model);
  }
}

export function FIND_OLDEST_DATE(expression: string, model: object) {
  let regex = /FIND_OLDEST_DATE\((.*?)\)/;
  let match = regex.exec(expression);
  if (match) {
    let parameters = match[1];
    let parameterArray = parameters.split(',').map((param) => param.trim());

    const values = get(model, parameterArray[1], []);
    let min = '';
    if (values.length > 1) {
      min = values
        .map((item) => item[parameterArray[0]])
        .sort(function (a, b) {
          return Date.parse(a) - Date.parse(b);
        })[0];
    } else {
      min = values.length == 0 ? '' : values[0][parameterArray[0]];
    }
    return min;
  }
}

export function FIND_EARLIEST_DATE(expression: string, model: object) {
  let regex = /FIND_EARLIEST_DATE\((.*?)\)/;
  let match = regex.exec(expression);
  if (match) {
    let parameters = match[1];
    let parameterArray = parameters.split(',').map((param) => param.trim());

    const values = get(model, parameterArray[1], []);
    let max = '';
    if (values.length > 1) {
      max = values
        .map((item) => item[parameterArray[0]])
        .sort(function (a, b) {
          return Date.parse(a) - Date.parse(b);
        })[values.length - 1];
    } else {
      max = values.length == 0 ? '' : values[0][parameterArray[0]];
    }
    return max;
  }
}

export function CALC_DATE_DIFF_RETURN_DAY(expression: string, model: object) {
  let regex = /CALC_DATE_DIFF_RETURN_DAY\((.*?)\)/;
  let match = regex.exec(expression);
  if (match) {
    let parameters = match[1];
    let parameterArray = parameters.split(',').map((param) => param.trim());

    const date1 = get(model, parameterArray[0], 0);
    const date2 = get(model, parameterArray[1], 0);
    const result = calculateDateDifference(date1, date2);
    return isNaN(result.days) ? '' : result.days + '';
  }
}

export function ARRAY_SIZE(expression: string, model: object) {
  let regex = /ARRAY_SIZE\((.*?)\)/;
  let match = regex.exec(expression);
  if (match) {
    let arrayPath = match[1];
    return get(model, arrayPath, []).length;
  }
}

export function HASH_GENERATOR(expression: string, model: object) {
  let regex = /HASH_GENERATOR\((.*?)\)/;
  let match = regex.exec(expression);
  if (match) {
    let sizeOfHash = match[1];
    return generateRandomHash(parseInt(sizeOfHash));
  }
}

export function CALC_DATE_DIFF_RETURN_HOURS(expression: string, model: object) {
  let regex = /CALC_DATE_DIFF_RETURN_HOURS\((.*?)\)/;
  let match = regex.exec(expression);
  if (match) {
    let parameters = match[1];
    let parameterArray = parameters.split(',').map((param) => param.trim());

    const date1 = get(model, parameterArray[0], 0);
    const date2 = get(model, parameterArray[1], 0);
    const result = calculateDateDifference(date1, date2);
    return isNaN(result.hours) ? '' : result.hours + '';
  }
}

export function CALC_DATE_DIFF_RETURN_MINUTES(expression: string, model: object) {
  let regex = /CALC_DATE_DIFF_RETURN_MINUTES\((.*?)\)/;
  let match = regex.exec(expression);
  if (match) {
    let parameters = match[1];
    let parameterArray = parameters.split(',').map((param) => param.trim());

    const date1 = get(model, parameterArray[0], 0);
    const date2 = get(model, parameterArray[1], 0);
    const result = calculateDateDifference(date1, date2);
    return isNaN(result.minutes) ? '' : result.minutes + '';
  }
}

dayjs.extend(duration);
dayjs.extend(customParseFormat);

function calculateDateDifference(date1: string | number | Date, date2: string | number | Date) {
  if (date1 == 0 || date2 == 0) return { days: 0, hours: 0, minutes: 0 };

  const d1 = dayjs(date1);
  const d2 = dayjs(date2);

  if (!d1.isValid() || !d2.isValid()) {
    return { days: 0, hours: 0, minutes: 0 };
  }

  const diffInMs = Math.abs(d2.diff(d1));
  const diffDuration = dayjs.duration(diffInMs);

  return {
    days: Math.floor(diffDuration.asDays()),
    hours: diffDuration.hours(),
    minutes: diffDuration.minutes(),
  };
}

export function DELEGATION_DIET_CALC(expression: string, model: object) {
  let regex = /DELEGATION_DIET_CALC\((.*?)\)/;
  let match = regex.exec(expression);
  if (match) {
    let parameters = match[1];
    let parameterArray = parameters.split(',').map((param) => param.trim());
    let dni = get(model, parameterArray[0], 0);
    let godziny = get(model, parameterArray[1], 0);
    let sniadania = get(model, parameterArray[2], 0);
    let obiady = get(model, parameterArray[3], 0);
    let kolacje = get(model, parameterArray[4], 0);
    let wysokoscDiety = get(model, parameterArray[5], 0);
    let odliczeniaSniadania = get(model, parameterArray[6], 0);
    let odliczeniaObiad = get(model, parameterArray[7], 0);
    let odliczeniaKolacja = get(model, parameterArray[8], 0);

    let dietaNalezna = wysokoscDiety * dni;
    if (godziny <= 8 && godziny > 0) {
      dietaNalezna += wysokoscDiety / 2;
    }
    if (godziny > 8) {
      dietaNalezna += wysokoscDiety;
    }

    if (sniadania > 0) {
      dietaNalezna = dietaNalezna - sniadania * odliczeniaSniadania;
    }

    if (obiady > 0) {
      dietaNalezna = dietaNalezna - obiady * odliczeniaObiad;
    }

    if (kolacje > 0) {
      dietaNalezna = dietaNalezna - kolacje * odliczeniaKolacja;
    }

    return dietaNalezna;
  }
}

function generateRandomHash(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters[randomIndex];
  }

  return result;
}
