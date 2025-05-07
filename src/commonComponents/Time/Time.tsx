import clsx from "clsx";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { twMerge } from "tw-merge";
import { Clock } from "lucide-react";
import "./time.css";
import { useState } from "react";
interface Props {
  label?: string;
  error?: string;
  handleChange: (val: string) => void;
}
const Time = ({ label, error, handleChange }: Props) => {
  const [time, setTime] = useState<DateObject | null>(null);
  const handleTime = () => {
    if (time !== null) {
      console.log(time.format("hh:mm a"));
      const Time = time.format("hh:mm a");
      handleChange(Time);
    }
  };
  return (
    <div className={twMerge(clsx("m-1"))}>
      <label className={twMerge(clsx("text-[12px]"))}>{label}</label>
      <div className="flex border justify-between p-1 rounded-lg border-gray-200">
        <DatePicker
          disableDayPicker
          format="hh:mm A"
          plugins={[<TimePicker hideSeconds />]}
          placeholder="Select time"
          onChange={(date) => {
            setTime(date), handleTime();
          }}
          value={time}
          inputClass="custom-input"
        />
        <Clock width={15} color="gray" />
      </div>
      {error && (
        <p className={twMerge(clsx(`text-[10px] text-red-400`))}>{error}</p>
      )}
    </div>
  );
};

export default Time;
