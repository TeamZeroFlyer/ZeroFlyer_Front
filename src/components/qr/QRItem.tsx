import React from "react";

import style from "./QRItem.module.css";
import faceImg from "../../../public/image/qr/parttime.svg";
import threedot from "../../../public/icons/threedot.svg";
import { QRManagement } from "../../pages/qr/ManageQRCode";
import { Link } from "react-router-dom";

const QRItem: React.FC<{
  qrcodes: QRManagement[];
  isPTchecked: boolean;
}> = (props) => {
  return (
    <>
      {props.qrcodes &&
        props.qrcodes.map((qrManagement, idx) => (
          <ul className={style.qrItem}>
            <p key={idx}>{getFormattedDate(qrManagement.date)}</p>
            {qrManagement.qrcodes.map((qr) => (
              <Link to={`/qr/${qr.qrId}`}>
                <li key={qr.qrId} className={style.li}>
                  <div className={`${style.img} ${style.item}`}>
                    <img src={faceImg} alt="아르바이트생 얼굴" />
                  </div>
                  <div className={`${style.info} ${style.item}`}>
                    <p className={style.id}>{ props.isPTchecked ? qr.ptj.name : qr.qrId}</p>
                    <p className={style.title}>{ props.isPTchecked ? qr.ptj.phone : qr.flyerTitle}</p>
                  </div>
                  <div className={`${style.action} ${style.item}`}>
                    <span>{qr.scan}</span>
                    <img src={threedot} />
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        ))}
    </>
  );
};

export default QRItem;

const getFormattedDate = (date: Date) => {
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = date.getDate();
  const dayOfWeek = daysOfWeek[date.getDay()];
  return `${month}월 ${day}일(${dayOfWeek})`;
};
