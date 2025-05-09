import { useState, useEffect } from "react";
import { type FormFieldProp, type FormActions } from "../../../types/types";
import { FormValidation } from "./FormValidation";
interface FormDataProps {
  formId: string;
  formTitle: string;
  showAs: string;
  fields: FormFieldProp[];
  actions?: FormActions;
}
export const useSDDD = () => {
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

  const handleChange = (val: any, id: string) => {
    setFormStateData((prev) => ({
      ...prev,
      [id]: val,
    }));
  };

  const handleFormValidation = async () => {
    let errors: Record<string, any> = {};

    fields.forEach((field: FormFieldProp) => {
      if (field.type === "columnLayout") {
        const items = field.items;
        items.forEach((item: FormFieldProp) => {
          if (item.validation) {
            const value = formStateData[item.id] ? formStateData[item.id] : "";
            const error = FormValidation(
              item?.validation,
              value,
              item?.id,
              item.type
            );
            if (error) {
              errors[item.id] = error;
            }
          }
        });
      } else {
        if (field.validation) {
          const value = formStateData[field.id] ? formStateData[field.id] : "";
          const error = FormValidation(
            field?.validation,
            value,
            field?.id,
            field.type
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
