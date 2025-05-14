import { visibilityCheck } from "./Functions/visibilityCheck";
import { populateForm } from "./Functions/populateForm";
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
              formErrors.hasOwnProperty(DatePickerField.id)
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
              formErrors.hasOwnProperty(numberField.id)
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
              formErrors.hasOwnProperty(selectField.id)
                ? formErrors[selectField.id]
                : undefined
            }
            required={selectField.validation?.required?.value === true}
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
              formErrors.hasOwnProperty(timeField.id)
                ? formErrors[timeField.id]
                : undefined
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
              formErrors.hasOwnProperty(fileUploadField.id)
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
              formErrors.hasOwnProperty(textField.id)
                ? formErrors[textField.id]
                : undefined
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
              formErrors.hasOwnProperty(textareaField.id)
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
