import { useStudyDrugDoseDairy } from "./useStudyDrugDoseDairy";
import RenderField from "../../formUtils/RenderField";
const StudyDrugDoseDairy = () => {
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
        {fields.map((field) => (
          <div key={field.id}>
            {
              <RenderField
                field={field}
                handleChange={handleChange}
                formErrors={formErrors}
                formStateData={formStateData}
              />
            }
          </div>
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

export default StudyDrugDoseDairy;
