import get from "lodash/get";

export const functions = {
  FIND_OLDEST_DATE: FIND_OLDEST_DATE,
  FIND_EARLIEST_DATE: FIND_EARLIEST_DATE,
  CALC_DATE_DIFF_RETURN_DAY: CALC_DATE_DIFF_RETURN_DAY,
  CALC_DATE_DIFF_RETURN_HOURS: CALC_DATE_DIFF_RETURN_HOURS,
  CALC_DATE_DIFF_RETURN_MINUTES: CALC_DATE_DIFF_RETURN_MINUTES
}

export function FIND_OLDEST_DATE(expression: string, model: object){
  if (expression.includes("FIND_OLDEST_DATE")) {
    let regex = /FIND_OLDEST_DATE\((.*?)\)/;
    let match = regex.exec(expression);
    if(match){
      let parameters = match[1];
      let parameterArray = parameters.split(",").map((param) => param.trim());

      const values = get(model, parameterArray[1], []);
      let min = ""
      if(values.length > 1){
        min = values.map((item) => item[parameterArray[0]]).sort(function(a,b){
          return Date.parse(a) - Date.parse(b);
        })[0];
      } else {
        min = values[0][parameterArray[0]]
      }

      return expression.replace(`FIND_OLDEST_DATE(${parameterArray.join(", ")})`, min + "");
    }
  }
  return expression;
}

export function FIND_EARLIEST_DATE(expression: string, model: object){
  if (expression.includes("FIND_EARLIEST_DATE")) {
    let regex = /FIND_EARLIEST_DATE\((.*?)\)/;
    let match = regex.exec(expression);
    if(match){
      let parameters = match[1];
      let parameterArray = parameters.split(",").map((param) => param.trim());

      const values = get(model, parameterArray[1], []);
      let min = ""
      if(values.length > 1){
        min = values.map((item) => item[parameterArray[0]]).sort(function(a,b){
          return Date.parse(a) - Date.parse(b);
        })[values.length-1];
      } else {
        min = values[0][parameterArray[0]]
      }

      return expression.replace(`FIND_EARLIEST_DATE(${parameterArray.join(", ")})`, min + "");
    }
  }
  return expression;
}

export function CALC_DATE_DIFF_RETURN_DAY(expression: string,  model: object){
  if (expression.includes("CALC_DATE_DIFF_RETURN_DAY")) {
    let regex = /CALC_DATE_DIFF_RETURN_DAY\((.*?)\)/;
    let match = regex.exec(expression);
    if(match){
      let parameters = match[1];
      let parameterArray = parameters.split(",").map((param) => param.trim());

      const date1 = get(model, parameterArray[0], 0)
      const date2 = get(model, parameterArray[1], 0)
      const result = calculateDateDifference(date1, date2)
      return result.days+""
    }


  } else {
    return expression;
  }
}

export function CALC_DATE_DIFF_RETURN_HOURS(expression: string,  model: object){
  if (expression.includes("CALC_DATE_DIFF_RETURN_HOURS")) {
    let regex = /CALC_DATE_DIFF_RETURN_HOURS\((.*?)\)/;
    let match = regex.exec(expression);
    if(match){
      let parameters = match[1];
      let parameterArray = parameters.split(",").map((param) => param.trim());

      const date1 = get(model, parameterArray[0], 0)
      const date2 = get(model, parameterArray[1], 0)
      const result = calculateDateDifference(date1, date2)
      return result.hours+""
    }

  } else {
    return expression;
  }
}

export function CALC_DATE_DIFF_RETURN_MINUTES(expression: string,  model: object){
  if (expression.includes("CALC_DATE_DIFF_RETURN_MINUTES")) {
    let regex = /CALC_DATE_DIFF_RETURN_MINUTES\((.*?)\)/;
    let match = regex.exec(expression);
    if(match){
      let parameters = match[1];
      let parameterArray = parameters.split(",").map((param) => param.trim());

      const date1 = get(model, parameterArray[0], 0)
      const date2 = get(model, parameterArray[1], 0)
      const result = calculateDateDifference(date1, date2)
      return result.minutes+""
    }

  } else {
    return expression;
  }
}

function calculateDateDifference(date1, date2) {
  // Convert dates to Date objects
  const d1 = new Date(date1).getMilliseconds();
  const d2 = new Date(date2).getMilliseconds();

  // Calculate the difference in milliseconds
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