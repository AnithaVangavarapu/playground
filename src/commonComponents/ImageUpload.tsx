import { Upload } from "lucide-react";
import { useRef, useState } from "react";
import { twMerge } from "tw-merge";
import clsx from "clsx";
interface Props {
  onChange?: (file: File, id: string) => void;
  label?: string;
  placeholder?: string;
  id: string;
  error?: string;
  required?: boolean;
  readonly?: boolean;
}

const ImageUpload = ({
  onChange,
  id,
  label,
  placeholder,
  error,
  required,
  readonly,
}: Props) => {
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
      onChange?.(imageFile, id);
    }
  };
  return (
    <div className={twMerge(clsx("mx-1 mt-3"))}>
      <div className="text-[12px]">
        {label} {required && <span className="text-red-400">*</span>}
      </div>
      <div className="border border-dashed text-[10px] place-items-center rounded-lg p-0.5">
        <button
          type="submit"
          onClick={handleUpload}
          className="flex items-center gap-2"
        >
          <Upload width={15} color="gray" />
          {placeholder}
        </button>
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          hidden
          onChange={handleFileChange}
          readOnly={readonly}
        />
        {error && <p className="text-[10px] text-red-400">{error}</p>}
        {/* {previewImage && (
          <div>
            <img
              src={previewImage}
              alt={previewImage}
              className="rounded max-w-full max-h-40"
            />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ImageUpload;
