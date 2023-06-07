import { BsThreeDotsVertical } from "react-icons/bs";

import style from "./QRList.module.css";

const QRList = () => {
  return (
      <div className={style.contents}>
        <div className={style.img}>
          <img src="https://picsum.photos/seed/img1/40/40" alt="" />
        </div>
        <div className={style.qrInfo}>
          <div style={{padding: '0.3rem 0'}}>
            <p style={{ fontWeight: "bold" }}>QR052301</p>
            <p style={{ fontSize: "0.8rem" }}>첫 방문 고객 할인</p>
          </div>
          <div style={{ padding: "1rem 0 1rem 0" }}>
            <span>63</span>
            <span>
              <BsThreeDotsVertical />
            </span>
          </div>
        </div>
      </div>
  );
};

export default QRList;
