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

const isPropsEqual = (prevProps: Props, nextProps: Props) => {
  if (prevProps.value === nextProps.value) {
    console.log("isPropsEqual:true");
    return true;
  }
  return false;
};

const Text = React.memo(
  ({
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
  },
  isPropsEqual
);

export default Text;
