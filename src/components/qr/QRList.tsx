import React, { useState } from "react";
import { Link } from "react-router-dom";

import style from "./QRList.module.css";
import QRItem from "./QRItem";
import { QRManagement } from "../../pages/qr/ManageQRCode";

const QRList: React.FC<{
  qrcodes: QRManagement[];
}> = (props) => {
  const [showPartTime, setShowPartTime] = useState(false);

  const handleCheckboxChange = () => {
    setShowPartTime((prevShowPartTime) => !prevShowPartTime);
  };

  return (
    <div className={style.qrList}>
      <div className={style.header}>
        <p>QR 목록</p>
        <Link to="/qr/new">QR 만들기</Link>
      </div>
      <hr />
      <div className={style.contents}>
        <label>
          <span className={style.ptlabel}>알바 보기</span>
          <input
            role="switch"
            type="checkbox"
            checked={showPartTime}
            onChange={handleCheckboxChange}
          />
        </label>
        <QRItem isPTchecked={showPartTime} qrcodes={props.qrcodes} />
      </div>
    </div>
  );
};

export default QRList;
