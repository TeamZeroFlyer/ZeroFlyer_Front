import React from "react";
import { Link } from "react-router-dom";

import style from "./QRList.module.css";
import QRItem from "./QRItem";
import { QRManagement } from "../../pages/qr/ManageQRCode";

const QRList: React.FC<{
  qrcodes: QRManagement[],
}> = (props) => {
  return (
    <div className={style.qrList}>
      <div className={style.header}>
        <p>QR 목록</p>
        <Link to="/qr/new">QR 만들기</Link>
      </div>
      <hr />
      <div className={style.contents }>
        <QRItem qrcodes={ props.qrcodes} />
      </div>
    </div>
  );
};

export default QRList;
