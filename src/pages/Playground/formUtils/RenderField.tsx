import { visibilityCheck } from "./Functions/visibilityCheck";
import { populateForm } from "./Functions/populateForm";
// import { isEqual } from "lodash";
import {
  type ColumnLayoutFiled,
  type FormFieldProp,
  type NumberField,
  type DateField,
  type SelectField,
  type TimeField,
  type FileUploadField,
  type TextField,
  type TextAreaField,
} from "../../../types/types";
import {
  DatePickerComp,
  Dropdown,
  ImageUpload,
  Text,
  TextArea,
  Time,
} from "../../../commonComponents";
// import React from "react";
interface Props {
  field: FormFieldProp;
  handleChange: (val: any, id: string) => void;

  formErrors: Record<string, string>;
  formStateData: Record<string, any>;
}

const RenderField = ({
  field,
  handleChange,
  formErrors,
  formStateData,
}: Props) => {
  const type: string = field.type;
  console.log("field that rerenders", field.id);
  const renderedField = () => {
    switch (type) {
      case "date":
        const DatePickerField = field as DateField;
        return (
          <DatePickerComp
            onChange={handleChange}
            id={DatePickerField.id}
            label={DatePickerField.label}
            placeholder={DatePickerField.placeholder}
            error={
              formErrors[DatePickerField.id]
                ? formErrors[DatePickerField.id]
                : undefined
            }
            required={DatePickerField.validation?.required?.value === true}
            readonly={DatePickerField.readOnly === true}
          />
        );

      case "columnLayout":
        const columnLayoutField = field as ColumnLayoutFiled;
        const columnsWidths = columnLayoutField.columnWidthRatio
          .split(",")
          .map((part) => `${part.trim()}fr`)
          .join(" ");

        return (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: columnsWidths,
            }}
          >
            {columnLayoutField.items.map((item) => (
              <div key={item.id} className="">
                <RenderField
                  field={item}
                  handleChange={handleChange}
                  formErrors={formErrors}
                  formStateData={formStateData}
                />
              </div>
            ))}
          </div>
        );
      case "number":
        const numberField = field as NumberField;
        return (
          <Text
            onChange={handleChange}
            id={numberField.id}
            label={numberField.label}
            placeholder={numberField.placeholder}
            error={
              formErrors[numberField.id]
                ? formErrors[numberField.id]
                : undefined
            }
            required={numberField.validation?.required?.value === true}
            readonly={numberField.readOnly === true}
            value={
              numberField.valuePopulateFrom
                ? populateForm(numberField.valuePopulateFrom, formStateData)
                : undefined
            }
          />
        );
      case "select":
        const selectField = field as SelectField;
        return (
          <Dropdown
            options={selectField.options}
            label={selectField.label}
            onChange={handleChange}
            id={selectField.id}
            placeholder={selectField.placeholder}
            error={
              formErrors[selectField.id]
                ? formErrors[selectField.id]
                : undefined
            }
            required={selectField.validation?.required?.value === true}
            value={formStateData[selectField.id]}
          />
        );

      case "time":
        const timeField = field as TimeField;
        return (
          <Time
            handleChange={handleChange}
            id={timeField.id}
            label={timeField.label}
            placeholder={timeField.placeholder}
            error={
              formErrors[timeField.id] ? formErrors[timeField.id] : undefined
            }
            required={timeField.validation?.required?.value === true}
            visible={
              timeField.visibilityDependsOn &&
              visibilityCheck(timeField.visibilityDependsOn, formStateData)
            }
            readonly={timeField.readOnly === true}
          />
        );
      case "fileUpload":
        const fileUploadField = field as FileUploadField;
        return (
          <ImageUpload
            onChange={handleChange}
            id={fileUploadField.id}
            label={fileUploadField.label}
            placeholder={fileUploadField.placeholder}
            error={
              formErrors[fileUploadField.id]
                ? formErrors[fileUploadField.id]
                : undefined
            }
            required={fileUploadField.validation?.required?.value === true}
            readonly={fileUploadField.readOnly === true}
          />
        );
      case "text":
        const textField = field as TextField;
        return (
          <Text
            onChange={handleChange}
            id={textField.id}
            label={textField.label}
            placeholder={textField.placeholder}
            required={textField.validation?.required?.value === true}
            error={
              formErrors[textField.id] ? formErrors[textField.id] : undefined
            }
            readonly={textField.readOnly === true}
            visible={
              textField.visibilityDependsOn &&
              visibilityCheck(textField.visibilityDependsOn, formStateData)
            }
          />
        );
      case "textarea":
        const textareaField = field as TextAreaField;
        return (
          <TextArea
            onChange={handleChange}
            id={textareaField.id}
            label={textareaField.label}
            placeholder={textareaField.placeholder}
            error={
              formErrors[textareaField.id]
                ? formErrors[textareaField.id]
                : undefined
            }
            required={textareaField.validation?.required?.value === true}
            readonly={textareaField.readOnly === true}
          />
        );
      default:
        return null;
    }
  };

  return <>{renderedField()}</>;
};
export default RenderField;
// const isPropsEqual = (prevProps: Props, nextProps: Props) => {
//   return (
//     prevProps.field.id === nextProps.field.id &&
//     prevProps.error === nextProps.error &&
//     prevProps.value === nextProps.value &&
//     isEqual(prevProps.field, nextProps.field)
//   );
// };
// export default React.memo(RenderField, isPropsEqual);
