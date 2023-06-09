import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";

import { QRType } from "../../pages/qr/QrScanner";
import style from "./QRCode.module.css";
import Header from "../footer/Header";

const QRCode: React.FC<{ qr: QRType }> = (props) => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (props.qr) {
      setUrl(props.qr.flyerLink);
    }
  }, [props.qr]);

  return (
    <div className={style.container}>
      <Header>QR 코드</Header>
      {/* <div className={style.title}>
        <p>QR 코드</p>
      </div> */}
      <div className={style.qrcode}>
        <div className={style.outline}>
          <h1>새싹 미용실</h1>
          <div className={style.qr}>
            <div className={style.scan}>
              <div>
                <p>63</p>
              </div>
            </div>
            <div className={style.info}>
              <h2>QR052301</h2>
              <p>2023.05.23</p>
            </div>
            <div>
              <QRCodeCanvas id="qrCode" value={url} size={200} level={"H"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCode;
