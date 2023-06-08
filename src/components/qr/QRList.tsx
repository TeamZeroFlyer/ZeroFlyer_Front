import { BsThreeDotsVertical } from "react-icons/bs";

import style from "./QRList.module.css";

const QRList = () => {
  return (
    <div className={style.contents}>
      <div className={style.img}>
        <img src="https://picsum.photos/seed/img1/40/40" alt="" />
      </div>
      <div className={style.qrInfo}>
        <div className={style.qrTitle}>
          <p>QR052301</p>
          <p>첫 방문 고객 할인</p>
        </div>
        <div className={style.action}>
          <span>63</span>
          <BsThreeDotsVertical className={style.threedot} />
        </div>
      </div>
    </div>
  );
};

export default QRList;
