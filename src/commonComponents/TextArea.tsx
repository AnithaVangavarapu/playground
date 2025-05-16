import clsx from "clsx";
import { twMerge } from "tw-merge";
import React from "react";

interface ClassNames {
  div?: string;
  textArea?: string;
  label?: string;
  error?: string;
}
interface Props {
  label?: string;
  placeholder?: string;
  id: string;
  name?: string;
  onChange: (val: string, id: string) => void;
  error?: string;
  classnames?: ClassNames;
  required?: boolean;
  readonly?: boolean;
}
const TextArea = ({
  label,
  placeholder,
  id,
  name,
  onChange,
  error,
  classnames,
  required,
  readonly,
}: Props) => {
  console.log("TextArea rendered");
  return (
    <div className={twMerge(clsx(`m-1`, classnames?.div))}>
      <label
        className={twMerge(
          clsx(`text-[12px] text-gray-500  font-medium`, classnames?.label)
        )}
      >
        {label}
        {required && <span className="text-red-400">*</span>}
      </label>
      <textarea
        name={name}
        id={id}
        onChange={(e) => onChange(e.target.value, id)}
        placeholder={placeholder}
        className={twMerge(
          clsx(
            `border w-full rounded-lg border-gray-200 p-1 text-[10px] h-15 focus:outline-none`,
            classnames?.textArea
          )
        )}
        readOnly={readonly}
      />
      {error && (
        <p
          className={twMerge(
            clsx(`text-red-400 text-[10px]`, classnames?.error)
          )}
        >
          {error}
        </p>
      )}
    </div>
  );
};
const isPropsEqual = (prevProps: Props, nextProps: Props) => {
  return (
    prevProps.id === nextProps.id &&
    prevProps.label === nextProps.label &&
    prevProps.name === nextProps.name &&
    prevProps.placeholder === nextProps.placeholder &&
    prevProps.readonly === nextProps.readonly &&
    prevProps.required === nextProps.required &&
    prevProps.error === nextProps.error
  );
};
export default React.memo(TextArea, isPropsEqual);
