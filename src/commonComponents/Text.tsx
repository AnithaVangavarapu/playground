import clsx from "clsx";
import { twMerge } from "tw-merge";
import React, { useRef } from "react";
interface ClassNames {
  div?: string;
  input?: string;
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
  value?: string;
  visible?: boolean;
}

const Text = ({
  label,
  placeholder,
  id,
  name,
  onChange,
  error,
  classnames,
  required,
  readonly,
  value,
  visible,
}: Props) => {
  console.log("rendered text field");
  console.log(error);
  const timeoutRef = useRef<number | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      onChange(e.target.value, id);
    }, 1000);
  };
  return (
    <div className={twMerge(clsx(`m-1`, classnames?.div))} hidden={visible}>
      <label
        className={twMerge(
          clsx(`text-[12px] text-gray-500  font-medium`, classnames?.label)
        )}
      >
        {label}
        {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type="text"
        name={name}
        id={id}
        onChange={handleChange}
        placeholder={placeholder}
        className={twMerge(
          clsx(
            `border w-full rounded-lg border-gray-200 p-1.5 text-[10px]`,
            classnames?.input
          )
        )}
        readOnly={readonly}
        value={value}
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
    prevProps.error === nextProps.error &&
    prevProps.label === nextProps.label &&
    prevProps.placeholder === nextProps.placeholder &&
    prevProps.name === nextProps.name &&
    prevProps.readonly === nextProps.readonly &&
    prevProps.required === nextProps.required &&
    prevProps.value === nextProps.value &&
    prevProps.visible === nextProps.visible
  );
};
export default React.memo(Text, isPropsEqual);
