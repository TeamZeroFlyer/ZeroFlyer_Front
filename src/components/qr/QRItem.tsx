import React, { useState} from "react";

import style from "./QRItem.module.css";
import faceImg from "../../../public/image/qr/parttime.svg";
import threedot from "../../../public/icons/threedot.svg";
import { QRManagement } from "../../pages/qr/ManageQRCode";
import { Link } from "react-router-dom";
import Dropdown from "./QrDropdown";

const QRItem: React.FC<{
  qrcodes: QRManagement[];
  isPTchecked: boolean;
}> = (props) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedQRId, setSelectedQRId] = useState<number>();
  const toggleDropdown = (qrId: number) => {
    if (selectedQRId === qrId) {
      setSelectedQRId(-1);
    } else {
      setSelectedQRId(qrId);
    }
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <>
      {props.qrcodes &&
        props.qrcodes.map((qrManagement, idx) => (
          <ul key={idx} className={style.qrItem}>
            <p>{getFormattedDate(qrManagement.date)}</p>
            {qrManagement.qrcodes.map((qr) => (
              <li key={qr.qrNum} className={style.li}>
                <Link
                  to={`/qr/${qr.idx}`}
                  className={`${style.item} ${style.link}`}
                >
                  <div className={`${style.img} ${style.linkItem}`}>
                    <img src={faceImg} alt="아르바이트생 얼굴" />
                  </div>
                  <div className={`${style.linkItem} ${style.info}`}>
                    <p className={style.id}>{props.isPTchecked ? qr.ptjName : qr.qrNum}</p>
                    <p className={style.title}>{props.isPTchecked ? qr.ptjPhone : qr.flyerName}</p>
                  </div>
                </Link>
                <div
                  className={`${style.action} ${style.item}`}
                  onClick={toggleDropdown.bind(null, qr.idx)}
                >
                  <span>{qr.scanCount}</span>
                  <img src={threedot} />
                  {selectedQRId === qr.idx && <Dropdown qrId={qr.idx} />}
                </div>
              </li>
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
