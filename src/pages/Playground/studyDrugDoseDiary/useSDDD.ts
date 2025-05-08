import { useState, useEffect } from "react";
import { type FormFieldProp, type FormActions } from "../../../types/types";
import { Text, DatePickerComp } from "../../../commonComponents";
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
  const [formStateData, setFormStateData] = useState<Record<string, any>>([]);
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
  return { title, fields, handleChange };
};
