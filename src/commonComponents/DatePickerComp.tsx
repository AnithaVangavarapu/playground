import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";
import { useState } from "react";
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
}

const DatePickerComp = ({
  id,
  label,
  onChange,
  classnames,
  error,
  placeholder,
}: DatePickerCompProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  return (
    <div className={twMerge(clsx(`m-1`, classnames?.outerdiv))} id={id}>
      <label className={twMerge(clsx(`text-[12px]`, classnames?.label))}>
        {label}
      </label>
      <div
        className={twMerge(
          clsx(
            `flex border justify-between items-center rounded-lg `,
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

export default DatePickerComp;
