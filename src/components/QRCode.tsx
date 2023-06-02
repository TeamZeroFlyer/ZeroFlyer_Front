import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { FlyerInf } from "../pages/CreateQRCode";

const QRCode: React.FC<{selectFlyer: FlyerInf|undefined}> = (props) => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (props.selectFlyer) {
      setUrl(props.selectFlyer.imgUrl);
    }
  }, [props.selectFlyer])

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={url}
      size={300}
      level={"H"}
    />
  );

  return (
      <div>
        {qrcode}
      </div>
  );
}

export default QRCode;