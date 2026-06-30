import {
  validateDateFormat,
  validateDateValues,
  isPastDate,
} from "../utils/date.util.js";

export const validateDateInput = (date) => {
  // stricly check proper date format YYYY-MM-DD
  if (!validateDateFormat(date)) {
    return "Date must be in YYYY-MM-DD format";
  }

  // check if date is valid
  if (!validateDateValues(date)) {
    return "Invalid date";
  }

  if (isPastDate(date)) {
    return "The selected date is invalid. Please choose today or a future date.";
  }

  return null;
};
