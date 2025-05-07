import QRCode from "react-qr-code";
import { useState } from "react";

const GenerateQR = () => {
  const [qrValue, setQrValue] = useState<string>("");
  const [showQR, setShowQR] = useState<boolean>(false);
  const handleShowQR = () => {
    if (qrValue !== "") {
      setShowQR(true);
    } else {
      setShowQR(false);
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <div>
        <input
          type="text"
          className="border"
          value={qrValue}
          onChange={(e) => setQrValue(e.target.value)}
        />
        <button onClick={handleShowQR} className="border">
          Add
        </button>
      </div>

      {showQR && (
        <div>
          <QRCode bgColor="white" fgColor="black" value={qrValue} size={100} />
          <button
            onClick={() => {
              setQrValue(""), setShowQR(false);
            }}
            className="border"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default GenerateQR;
