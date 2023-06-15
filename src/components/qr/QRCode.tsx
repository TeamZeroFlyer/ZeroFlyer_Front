import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";

import style from "./QRCode.module.css";
import Header from "../footer/Header";
import { QRCodeType } from "../../pages/qr/QrScanner";

const baseUrl = import.meta.env.VITE_REDIRECT_URI;

const QRCode: React.FC<{ qr: QRCodeType }> = (props) => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (props.qr) {
      const flyerUrl = `${baseUrl}/store/${props.qr.storeIdx}/flyer/${props.qr.flyerIdx}/qr/${props.qr.qrNum}`;
      setUrl(flyerUrl);
    }
  }, [props.qr]);

  return (
    <div className={style.container}>
      <Header>QR 코드</Header>
      <div className={style.qrcode}>
        <div className={style.outline}>
          <h1>{props.qr.storeName}</h1>
          <div className={style.qr}>
            <div className={style.scan}>
              <div>
                <p>{props.qr.qrScanCount}</p>
              </div>
            </div>
            <div className={style.info}>
              <h2>{props.qr.qrNum}</h2>
              <p>{props.qr.qrTimestamp}</p>
            </div>
            <div className={style.code}>
              <QRCodeCanvas
                id="qrCode"
                value={url}
                size={200}
                level={"H"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCode;
