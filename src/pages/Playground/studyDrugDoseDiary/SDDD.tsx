import { useSDDD } from "./useSDDD";
import {
  type ColumnLayoutFiled,
  type FormFieldProp,
  type NumberField,
} from "../../../types/types";
import { DatePickerComp, Text } from "../../../commonComponents";
const SDDD = () => {
  const { title, fields, handleChange } = useSDDD();
  console.log(title, fields);

  const renderField = (field: FormFieldProp) => {
    const type: string = field.type;

    switch (type) {
      case "date":
        return (
          <DatePickerComp
            onChange={handleChange}
            id={field.id}
            label={field.label}
            placeholder={field.placeholder}
          />
        );

      case "columnLayout":
        const columnLayoutField = field as ColumnLayoutFiled;
        const columnsWidths = columnLayoutField.columnWidthRatio
          .split(",")
          .map((part) => `${part.trim()}fr`)
          .join(" ");
        console.log(columnsWidths);
        return (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            {columnLayoutField.items.map((item) => (
              <div key={item.id} className="flex flex-col">
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
          />
        );
    }
  };
  return (
    <div className="mx-50 p-4">
      <div>{title}</div>
      <form className="border rounded-lg border-gray-200 bg-white p-2">
        {fields.map((field) => (
          <div key={field.id}>{renderField(field)}</div>
        ))}
      </form>
    </div>
  );
};

export default SDDD;
