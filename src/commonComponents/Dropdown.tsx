import clsx from "clsx";
import { twMerge } from "tw-merge";
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
}: Props) => {
  return (
    <div className={twMerge(clsx(`m-1`, classnames?.div))}>
      <label className={twMerge(clsx("text-[12px]", classnames?.label))}>
        {label}
        {required && <span className="text-red-400">*</span>}
      </label>
      <select
        onChange={(e) => onChange(e.target.value, id)}
        className={twMerge(
          clsx(`w-full border rounded-lg p-1 text-[10px]`, classnames?.select)
        )}
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

export default Dropdown;
