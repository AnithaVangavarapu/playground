import { useState } from "react";
import { type Validation } from "../../../types/types";
export const FormValidation = (
  validationRules: Validation,
  value: string,
  id: string,
  fieldType: string
) => {
  if (
    (validationRules?.required?.value && value === "") ||
    value === undefined ||
    value === null
  ) {
    return validationRules?.required?.message;
  }
  if (fieldType === "date") {
    if (validationRules?.lessThan?.value === "today") {
      const today = new Date();
      const comparisonValue = new Date(value);
      if (comparisonValue > today) {
        return validationRules?.lessThan?.message;
      }
    }
  }
  if (fieldType === "time") {
    if (validationRules?.lessThan?.value === "now") {
      const today = new Date();
      const currentTime = today.toLocaleTimeString();
      if (currentTime === value || currentTime < value) {
        return validationRules?.lessThan?.message;
      }
    }
  }
  if (validationRules?.pattern) {
    if (!validationRules?.pattern?.pattern.match(value)) {
      return validationRules?.pattern?.message;
    }
  }
  if (validationRules?.range) {
    if (fieldType === "number") {
      if (
        Number(value) < validationRules?.range?.min ||
        Number(value) > validationRules?.range?.max
      ) {
        return validationRules?.range?.message;
      }
    }
  }
  return null;
};
