import GenerateQR from "../../../components/GenerateQR";

const SDDD = () => {
  const handleChange = (val: string) => {
    console.log(val);
  };

  return (
    <div>
      <GenerateQR />
    </div>
  );
};

export default SDDD;
