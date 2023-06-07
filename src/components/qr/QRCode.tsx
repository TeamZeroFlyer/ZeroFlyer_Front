import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";

import { QRType } from "../pages/QrScanner";
import style from "./QRCode.module.css";

const QRCode: React.FC<{ qr: QRType }> = (props) => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (props.qr) {
      setUrl(props.qr.flyerLink);
    }
  }, [props.qr]);

  return (
    <div className={style.qrcode}>
      <h2 className={style.title}>QR 코드</h2>
      <div className={style.name}>
        <h1>새싹 미용실</h1>
        <div className={style.qr}>
          <div className={style.scan}>
            <p>63</p>
          </div>
          <div className={style.info}>
            <h2>QR052301</h2>
            <p>2023.05.23</p>
          </div>
          <QRCodeCanvas id="qrCode" value={url} size={250} level={"H"} />
        </div>
      </div>
    </div>
  );
};

export default QRCode;
