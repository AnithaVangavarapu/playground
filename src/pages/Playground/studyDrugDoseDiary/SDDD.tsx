import { useSDDD } from "./useSDDD";
import { VisibilityCheck } from "./VisibilityCheck";
import { PopulateForm } from "./PopulateForm";
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
const SDDD = () => {
  const {
    title,
    fields,
    handleChange,
    handleFormSUbmit,
    formErrors,
    formStateData,
  } = useSDDD();

  const renderField = (field: FormFieldProp) => {
    const type: string = field.type;

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
                {renderField(item)}
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
                ? PopulateForm(numberField.valuePopulateFrom, formStateData)
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
              VisibilityCheck(timeField.visibilityDependsOn, formStateData)
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
    }
  };
  return (
    <div className="mx-40 p-4">
      <div>{title}</div>
      <form
        className="border rounded-lg border-gray-200 bg-white p-2"
        onSubmit={handleFormSUbmit}
      >
        {fields.map((field) => (
          <div key={field.id}>{renderField(field)}</div>
        ))}
        <div className="text-center">
          <button
            className="border rounded-lg p-1 text-[10px] w-15 font-medium bg-blue-950 text-white border-blue-950 cursor-pointer"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SDDD;
