import { Dropdown } from "../../../commonComponents";
const SDDD = () => {
  const handleChange = (val: string) => {
    console.log(val);
  };
  const options = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];
  return (
    <div>
      <Dropdown
        onChange={handleChange}
        options={options}
        label="SelectYour option"
        placeholder="Choose your option"
        error="required"
      />
    </div>
  );
};

export default SDDD;
