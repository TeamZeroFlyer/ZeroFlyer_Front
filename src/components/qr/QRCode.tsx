import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";

import style from "./QRCode.module.css";
import Header from "../footer/Header";
import { QRCodeType } from "../../pages/qr/QrScanner";

const QRCode: React.FC<{ qr: QRCodeType }> = (props) => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (props.qr) {
      setUrl(props.qr.flyerLink);
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
                <p>{props.qr.qrScan}</p>
              </div>
            </div>
            <div className={style.info}>
              <h2>{props.qr.qrId}</h2>
              <p>{formatDate(props.qr.qrCreateAt)}</p>
            </div>
            <div className={style.code}>
              <QRCodeCanvas id="qrCode" value={props.qr.flyerLink} size={200} level={"H"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
}

export default QRCode;
