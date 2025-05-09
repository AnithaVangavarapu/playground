import clsx from "clsx";
import { twMerge } from "tw-merge";

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
}: Props) => {
  return (
    <div className={twMerge(clsx(`m-1`, classnames?.div))}>
      <label className={twMerge(clsx(`text-[12px]`, classnames?.label))}>
        {label}
        {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type="text"
        name={name}
        id={id}
        onChange={(e) => onChange(e.target.value, id)}
        placeholder={placeholder}
        className={twMerge(
          clsx(
            `border w-full rounded-lg border-gray-200 p-1 text-[10px]`,
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

export default Text;
