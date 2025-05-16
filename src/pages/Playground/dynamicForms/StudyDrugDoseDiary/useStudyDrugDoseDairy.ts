import { useState, useEffect, useCallback } from "react";
import { type FormFieldProp, type FormActions } from "../../../../types/types";
import { formValidation } from "../../formUtils/Functions/formValidation";
interface FormDataProps {
  formId: string;
  formTitle: string;
  showAs: string;
  fields: FormFieldProp[];
  actions?: FormActions;
}
export const useStudyDrugDoseDairy = () => {
  const [formData, setFormData] = useState<FormDataProps | null>(null);
  const [title, setTitle] = useState<string>("");
  const [fields, setFields] = useState<FormFieldProp[]>([]);
  const [formStateData, setFormStateData] = useState<Record<string, any>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data: FormDataProps) => setFormData(data))
      .catch((error) => {
        console.log(error);
        setFormData(null);
      });
  }, []);
  useEffect(() => {
    if (formData !== null) {
      setTitle(formData?.formTitle);
      setFields(formData?.fields);
    }
  }, [formData]);

  const handleChange = useCallback((val: any, id: string) => {
    setFormStateData((prev) => ({
      ...prev,
      [id]: val,
    }));
  }, []);

  const handleFormValidation = async () => {
    let errors: Record<string, any> = {};

    fields.forEach((field: FormFieldProp) => {
      const getVisibility = (f: FormFieldProp) => {
        if (!f.visibilityDependsOn) return true;
        const dependsOnValue = formStateData[f.visibilityDependsOn.field];
        return dependsOnValue === f.visibilityDependsOn.value;
      };

      if (field.type === "columnLayout") {
        const items = field.items;
        items.forEach((item: FormFieldProp) => {
          if (item.validation) {
            const isVisible = getVisibility(item);
            const value = formStateData[item.id] ? formStateData[item.id] : "";
            const error = formValidation(
              item?.validation,
              value,
              item.type,
              isVisible
            );
            if (error) {
              errors[item.id] = error;
            }
          }
        });
      } else {
        if (field.validation) {
          const isVisible = getVisibility(field);
          const value = formStateData[field.id] ? formStateData[field.id] : "";
          const error = formValidation(
            field?.validation,
            value,
            field.type,
            isVisible
          );
          if (error) {
            errors[field.id] = error;
          }
        }
      }
    });

    setFormErrors(errors);
    return errors;
  };
  const handleFormSUbmit = async (e: any) => {
    e.preventDefault();
    let errors = {};
    errors = await handleFormValidation();
    if (Object.keys(errors).length > 0) {
      console.log("errors", errors);
    } else {
      console.log(formStateData);
    }
  };
  return {
    title,
    fields,
    handleChange,
    handleFormSUbmit,
    formErrors,
    formStateData,
  };
};
