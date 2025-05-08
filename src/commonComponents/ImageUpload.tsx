import { Upload } from "lucide-react";
import { useRef, useState } from "react";

interface Props {
  onChange?: (file: File) => void;
}

const ImageUpload = ({ onChange }: Props) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleUpload = () => {
    if (inputRef.current !== null) inputRef.current.click();
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0];
    if (imageFile) {
      const previewURL = URL.createObjectURL(imageFile);
      setPreviewImage(previewURL);
      onChange?.(imageFile);
    }
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
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        hidden
        onChange={handleFileChange}
      />
      {previewImage && (
        <div>
          <img
            src={previewImage}
            alt={previewImage}
            className="rounded max-w-full max-h-40"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
