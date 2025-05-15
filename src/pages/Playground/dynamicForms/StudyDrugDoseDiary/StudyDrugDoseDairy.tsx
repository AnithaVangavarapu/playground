import { useStudyDrugDoseDairy } from "./useStudyDrugDoseDairy";
import RenderField from "../../formUtils/RenderField";
import React from "react";
const StudyDrugDoseDairy = React.memo(() => {
  const {
    title,
    fields,
    handleChange,
    handleFormSUbmit,
    formErrors,
    formStateData,
  } = useStudyDrugDoseDairy();

  return (
    <div className="mx-40 p-4">
      <div className="mb-3 font-bold">{title}</div>
      <form
        className="border rounded-lg border-gray-200 bg-white p-2 shadow-sm"
        onSubmit={handleFormSUbmit}
      >
        {fields.map((field) => {
          if (field.type === "columnLayout") {
            const items = field.items;
            items.forEach((item) => {
              return (
                <div key={item.id}>
                  {
                    <RenderField
                      field={item}
                      handleChange={handleChange}
                      error={formErrors[item.id]}
                      value={formStateData[item.id]}
                    />
                  }
                </div>
              );
            });
          }
          return (
            <div key={field.id}>
              {
                <RenderField
                  field={field}
                  handleChange={handleChange}
                  error={formErrors[field.id]}
                  value={formStateData[field.id]}
                />
              }
            </div>
          );
        })}
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
});

export default StudyDrugDoseDairy;
