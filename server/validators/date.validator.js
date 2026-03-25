import { validateDateFormat, validateDateValues } from "../utils/date.util.js";

export const validateDateInput = (date) => {
  // stricly check proper date format YYYY-MM-DD
  if (!validateDateFormat(date)) {
    return "Date must be in YYYY-MM-DD format";
  }

  // check if date is valid
  if (!validateDateValues(date)) {
    return "Invalid date";
  }

  return null;
};
