import React from "react";

import style from "./FlyerPreview.module.css";
import { FlyerInf } from "../pages/qr/CreateQRCode";
import Hashtag from "../UI/Hashtag";
import QuantityInput from "../UI/QuantityInput";

const FlyerPreview: React.FC<{
  previewFlyer: FlyerInf;
  qrNumber: number;
  selectQrNumber: React.Dispatch<React.SetStateAction<number>>;
}> = (props) => {
  return (
    <div className={style.flyerPreview}>
      <p>전단지 정보</p>
      {props.previewFlyer && (
        <div className={style.content}>
          <img src={props.previewFlyer.flyerUrl} alt="전단지 미리보기" />
          <div className={style.flyer}>
            <div>
              <p className={style.label}>전단지 별명</p>
              <p className={style.name}>{props.previewFlyer.flyerName}</p>
            </div>
            <div>
              <p className={style.label}>유효 기간</p>
              <p className={style.name}>2023-05-22 ~ 2023-06-31</p>
            </div>
            <div className={style.input}>
              <label htmlFor="number">개수:</label>
              <QuantityInput
                value={props.qrNumber}
                onNumberChange={props.selectQrNumber}
              />
            </div>
          </div>
        </div>
      )}
      <div className={style.hashtag}>
        {props.previewFlyer.flyerTag
          .split("#")
          .filter((item) => item !== "")
          .map((value) => (
            <Hashtag>{`#${value}`}</Hashtag>
          ))}
      </div>
    </div>
  );
};

export default FlyerPreview;
