import { Date } from "../../../commonComponents";
const SDDD = () => {
  const handleChange = (val: Date | null) => {
    console.log(val);
  };

  return (
    <div>
      <Date
        onChange={handleChange}
        label="SelectYour Date"
        placeholder="Chose a date"
      />
    </div>
  );
};

export default SDDD;
