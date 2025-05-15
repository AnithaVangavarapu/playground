import { type ValuePopulateFrom } from "../../../../types/types";
export const populateForm = (
  populateFormValues: ValuePopulateFrom,
  value: any
) => {
  const type = populateFormValues.type;
  const formulaType = populateFormValues.formulaType;
  const fields = populateFormValues.fields;
  const defaultValue = populateFormValues.default;
  if (type === "formula") {
    switch (formulaType) {
      case "multiply":
        const total = fields.reduce((acc) => acc * Number(value), 1);
        // console.log("total", total);
        return isNaN(total) ? defaultValue : String(total);
      default:
        return;
    }
  }
  return defaultValue;
};
