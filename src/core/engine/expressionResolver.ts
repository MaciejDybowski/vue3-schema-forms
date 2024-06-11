import get from "lodash/get";

export const functions = {
  FIND_OLDEST_DATE: FIND_OLDEST_DATE,
  FIND_EARLIEST_DATE: FIND_EARLIEST_DATE,
  CALC_DATE_DIFF_RETURN_DAY: CALC_DATE_DIFF_RETURN_DAY,
  CALC_DATE_DIFF_RETURN_HOURS: CALC_DATE_DIFF_RETURN_HOURS,
  CALC_DATE_DIFF_RETURN_MINUTES: CALC_DATE_DIFF_RETURN_MINUTES,
  DELEGATION_DIET_CALC: DELEGATION_DIET_CALC
};

export function FIND_OLDEST_DATE(expression: string, model: object) {
  let regex = /FIND_OLDEST_DATE\((.*?)\)/;
  let match = regex.exec(expression);
  if (match) {
    let parameters = match[1];
    let parameterArray = parameters.split(",").map((param) => param.trim());

    const values = get(model, parameterArray[1], []);
    let min = "";
    if (values.length > 1) {
      min = values.map((item) => item[parameterArray[0]]).sort(function(a, b) {
        return Date.parse(a) - Date.parse(b);
      })[0];
    } else {
      min = values.length == 0 ? "" : values[0][parameterArray[0]];
    }
    return min;
  }
}

export function FIND_EARLIEST_DATE(expression: string, model: object) {

  let regex = /FIND_EARLIEST_DATE\((.*?)\)/;
  let match = regex.exec(expression);
  if (match) {
    let parameters = match[1];
    let parameterArray = parameters.split(",").map((param) => param.trim());

    const values = get(model, parameterArray[1], []);
    let max = "";
    if (values.length > 1) {
      max = values.map((item) => item[parameterArray[0]]).sort(function(a, b) {
        return Date.parse(a) - Date.parse(b);
      })[values.length - 1];
    } else {
      max = values.length == 0 ? "" : values[0][parameterArray[0]];
    }
    return max;
  }
}

export function CALC_DATE_DIFF_RETURN_DAY(expression: string, model: object) {
  let regex = /CALC_DATE_DIFF_RETURN_DAY\((.*?)\)/;
  let match = regex.exec(expression);
  if (match) {
    let parameters = match[1];
    let parameterArray = parameters.split(",").map((param) => param.trim());

    const date1 = get(model, parameterArray[0], 0);
    const date2 = get(model, parameterArray[1], 0);
    const result = calculateDateDifference(date1, date2);
    return isNaN(result.days) ? "" : result.days + "";
  }
}

export function CALC_DATE_DIFF_RETURN_HOURS(expression: string, model: object) {
  let regex = /CALC_DATE_DIFF_RETURN_HOURS\((.*?)\)/;
  let match = regex.exec(expression);
  if (match) {
    let parameters = match[1];
    let parameterArray = parameters.split(",").map((param) => param.trim());

    const date1 = get(model, parameterArray[0], 0);
    const date2 = get(model, parameterArray[1], 0);
    const result = calculateDateDifference(date1, date2);
    return isNaN(result.hours) ? "" : result.hours + "";
  }
}

export function CALC_DATE_DIFF_RETURN_MINUTES(expression: string, model: object) {
  let regex = /CALC_DATE_DIFF_RETURN_MINUTES\((.*?)\)/;
  let match = regex.exec(expression);
  if (match) {
    let parameters = match[1];
    let parameterArray = parameters.split(",").map((param) => param.trim());

    const date1 = get(model, parameterArray[0], 0);
    const date2 = get(model, parameterArray[1], 0);
    const result = calculateDateDifference(date1, date2);
    return isNaN(result.minutes) ? "" : result.minutes + "";
  }
}

function calculateDateDifference(date1, date2) {
  // Convert dates to Date objects
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  // Calculate the difference in milliseconds
  // @ts-ignore
  const diffInMs = Math.abs(d2 - d1);

  // Convert the difference to days, hours, and minutes
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const remainingMsAfterDays = diffInMs % (1000 * 60 * 60 * 24);

  const diffInHours = Math.floor(remainingMsAfterDays / (1000 * 60 * 60));
  const remainingMsAfterHours = remainingMsAfterDays % (1000 * 60 * 60);

  const diffInMinutes = Math.floor(remainingMsAfterHours / (1000 * 60));

  return {
    days: diffInDays,
    hours: diffInHours,
    minutes: diffInMinutes
  };
}

export function DELEGATION_DIET_CALC(expression: string, model: object) {
  let regex = /DELEGATION_DIET_CALC\((.*?)\)/;
  let match = regex.exec(expression);
  if (match) {
    let parameters = match[1];
    let parameterArray = parameters.split(",").map((param) => param.trim());
    let dni = get(model, parameterArray[0], 0);
    let godziny = get(model, parameterArray[1], 0);
    let sniadania = get(model, parameterArray[2], 0);
    let obiady = get(model, parameterArray[3], 0);
    let kolacje = get(model, parameterArray[4], 0);

    let dietaNalezna = 45 * dni;
    if (godziny <= 8 && godziny > 0) {
      dietaNalezna += 45 / 2;
    }
    if (godziny > 8) {
      dietaNalezna += 45;
    }

    if (sniadania > 0) {
      dietaNalezna = dietaNalezna - ((45 * 0.25) * sniadania);
    }

    if (obiady > 0) {
      dietaNalezna = dietaNalezna - ((45 * 0.5) * obiady);
    }

    if (kolacje > 0) {
      dietaNalezna = dietaNalezna - ((45 * 0.25) * kolacje);
    }

    return dietaNalezna;
  }
}
