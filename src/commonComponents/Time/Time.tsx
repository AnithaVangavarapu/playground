import clsx from "clsx";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { twMerge } from "tw-merge";
import { Clock } from "lucide-react";
import "./time.css";
import React, { useState } from "react";
interface Props {
  label?: string;
  error?: string;
  handleChange: (val: string, id: string) => void;
  id: string;
  placeholder?: string;
  required?: boolean;
  visible?: boolean;
  readonly?: boolean;
}
const Time = ({
  label,
  error,
  handleChange,
  id,
  placeholder,
  required,
  visible,
  readonly,
}: Props) => {
  const [time, setTime] = useState<DateObject | null>(null);
  console.log("rendered time component");
  const handleTime = () => {
    if (time !== null) {
      console.log(time.format("hh:mm a"));
      const Time = time.format("hh:mm a");
      handleChange(Time, id);
    }
  };
  return (
    <div className={twMerge(clsx("m-1"))} hidden={visible}>
      <label
        className={twMerge(clsx("text-[12px] text-gray-500  font-medium"))}
      >
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div className="flex border justify-between p-1 rounded-lg border-gray-200">
        <DatePicker
          disableDayPicker
          format="hh:mm A"
          plugins={[<TimePicker hideSeconds />]}
          placeholder={placeholder}
          onChange={(date) => {
            setTime(date), handleTime();
          }}
          value={time}
          inputClass="custom-input"
          readOnly={readonly}
        />
        <Clock width={15} color="gray" />
      </div>
      {error && (
        <p className={twMerge(clsx(`text-[10px] text-red-400`))}>{error}</p>
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
    prevProps.readonly === nextProps.readonly &&
    prevProps.required === nextProps.required &&
    prevProps.visible === nextProps.visible
  );
};
export default React.memo(Time, isPropsEqual);
// export default Time;
