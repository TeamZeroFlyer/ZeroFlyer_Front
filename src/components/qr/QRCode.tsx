import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { QRCodeType } from "../../pages/qr/QrScanner";
import { getAuthToken } from "../../util/auth";

import style from "./QRCode.module.css";
import leftArrowImg from "../../../public/icons/leftArrow.svg";
import { Link } from "react-router-dom";

const baseUrl = "https://qrecode.site";

const QRCode: React.FC<{ qr: QRCodeType }> = (props) => {
  const token = getAuthToken();
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const [url, setUrl] = useState<string>("");
  useEffect(() => {
    if (token) {
      setIsLogged(true);
    }
  }, []);
  useEffect(() => {
    if (props.qr) {
      const flyerUrl = `${baseUrl}/store/${props.qr.storeIdx}/flyer/${props.qr.flyerIdx}/qr/${props.qr.qrIdx}`;
      setUrl(flyerUrl);
    }
  }, [props.qr]);

  return (
    <div className={style.container}>
      <header className={style.header}>
        {isLogged && (
          <Link to=".." relative="path">
            <img src={leftArrowImg} alt="뒤로가기" />{" "}
          </Link>
        )}
        <p>QR 코드</p>
      </header>
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
              <QRCodeCanvas id="qrCode" value={url} size={210} level={"H"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCode;
