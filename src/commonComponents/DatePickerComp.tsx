import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";
import React, { useState } from "react";
import { twMerge } from "tw-merge";
import clsx from "clsx";
interface ClassNames {
  outerdiv?: string;
  innerdiv?: string;
  label?: string;
  error?: string;
}
interface DatePickerCompProps {
  id: string;
  label?: string;
  onChange: (val: Date | null, id: string) => void;
  error?: string;
  classnames?: ClassNames;
  placeholder?: string;
  required?: boolean;
  readonly?: boolean;
}

const DatePickerComp = ({
  id,
  label,
  onChange,
  classnames,
  error,
  placeholder,
  required,
  readonly,
}: DatePickerCompProps) => {
  console.log("DatePicker rendered");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  return (
    <div className={twMerge(clsx(`m-1`, classnames?.outerdiv))} id={id}>
      <label
        className={twMerge(
          clsx(`text-[12px] text-gray-500  font-medium`, classnames?.label)
        )}
      >
        {label}
        {required && <span className="text-red-400">*</span>}
      </label>
      <div
        className={twMerge(
          clsx(
            `flex border border-gray-200 justify-between items-center rounded-lg `,
            classnames?.innerdiv
          )
        )}
      >
        <DatePicker
          selected={selectedDate}
          onSelect={(date) => setSelectedDate(date)}
          onChange={(date) => onChange(date, id)}
          className="focus:outline-none text-[10px] p-1"
          placeholderText={placeholder}
          readOnly={readonly}
        />
        <Calendar color="gray " width={15} className="m-1" />
      </div>
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
const isPropsEqual = (
  prevProps: DatePickerCompProps,
  nextProps: DatePickerCompProps
) => {
  return (
    prevProps.id === nextProps.id &&
    prevProps.label === nextProps.label &&
    prevProps.error === nextProps.error &&
    prevProps.placeholder === nextProps.placeholder &&
    prevProps.readonly === nextProps.readonly &&
    prevProps.required === nextProps.required
  );
};
export default React.memo(DatePickerComp, isPropsEqual);
// export default DatePickerComp;
