import clsx from "clsx";
import { twMerge } from "tw-merge";
import React, { useCallback } from "react";
interface ClassNames {
  div?: string;
  label?: string;
  error?: string;
  select?: string;
}
interface Option {
  value: string;
  label: string;
}
interface Props {
  options: Option[];
  label?: string;
  placeholder?: string;
  onChange: (val: string, id: string) => void;
  classnames?: ClassNames;
  error?: string;
  id: string;
  required?: boolean;
  value: string;
}

const Dropdown = ({
  options,
  label,
  placeholder,
  onChange,
  classnames,
  error,
  id,
  required,
  value,
}: Props) => {
  console.log("===dropdown rendered for ", id);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(e.target.value, id);
    },
    [id, onChange]
  );
  return (
    <div className={twMerge(clsx(`m-1`, classnames?.div))}>
      <label
        className={twMerge(
          clsx("text-[12px] text-gray-500  font-medium", classnames?.label)
        )}
      >
        {label}
        {required && <span className="text-red-400">*</span>}
      </label>
      <select
        onChange={handleChange}
        className={twMerge(
          clsx(
            `w-full border border-gray-200 rounded-lg p-1.5 text-[10px] text-gray-400`,
            classnames?.select
          )
        )}
        value={value}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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
    prevProps.error === nextProps.error &&
    prevProps.placeholder === nextProps.placeholder &&
    prevProps.required === nextProps.required &&
    prevProps.onChange === nextProps.onChange &&
    prevProps.value === nextProps.value
  );
};
// export default Dropdown;
export default React.memo(Dropdown, isPropsEqual);
