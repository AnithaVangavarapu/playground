import clsx from "clsx";
import { twMerge } from "tw-merge";

interface ClassNames {
  div?: string;
  textArea?: string;
  label?: string;
  error?: string;
}
interface Props {
  label?: string;
  placeholder?: string;
  id?: string;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  classnames?: ClassNames;
}
const TextArea = ({
  label,
  placeholder,
  id,
  name,
  onChange,
  error,
  classnames,
}: Props) => {
  return (
    <div className={twMerge(clsx(`m-1`, classnames?.div))}>
      <label className={twMerge(clsx(`text-[12px]`, classnames?.label))}>
        {label}
      </label>
      <textarea
        name={name}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        className={twMerge(
          clsx(
            `border w-full rounded-lg border-gray-200 p-1 text-[10px]`,
            classnames?.textArea
          )
        )}
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

export default TextArea;
