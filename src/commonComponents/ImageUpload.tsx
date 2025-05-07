import { Upload } from "lucide-react";
import { useRef } from "react";

const ImageUpload = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleUpload = () => {
    if (inputRef.current !== null) inputRef.current.click();
  };
  return (
    <div className="border border-dashed text-[10px] place-items-center rounded-lg">
      <button
        type="submit"
        onClick={handleUpload}
        className="flex items-center gap-2"
      >
        <Upload width={15} color="gray" />
        TapToSelect
      </button>
      <input type="file" accept="*/images" ref={inputRef} hidden />
    </div>
  );
};

export default ImageUpload;
