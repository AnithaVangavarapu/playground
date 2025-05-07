import { useState } from "react";
import TimePicker from "react-time-picker";

interface Props {
  label?: string;
  onChange?: (val: string) => void;
}
const Time = ({ label, onChange }: Props) => {
  const [selectedTime, setSelectedTime] = useState(`00:00`);
  return (
    <div>
      <label>{label}</label>
      <TimePicker />
    </div>
  );
};

export default Time;
