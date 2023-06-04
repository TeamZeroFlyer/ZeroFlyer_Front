import React, { useState } from "react";

import style from "./FlyerPreview.module.css";
import { FlyerInf } from "src/pages/CreateQRCode";
import Hashtag from "../ui/Hashtag";

const FlyerPreview: React.FC<{
  previewFlyer: FlyerInf;
  selectQrNumber: (qrNumber: number) => void;
}> = (props) => {
  const [qrNumber, setQrNumber] = useState<number>(1);
  const onNumberInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputNumber = Number(event.target.value);
    setQrNumber(inputNumber);
    props.selectQrNumber(inputNumber);
  };

  return (
    <div className={style.flyerPreview}>
      <h3>전단지 정보</h3>
      {props.previewFlyer && (
        <div className={style.content}>
          <img src={props.previewFlyer.src} alt={props.previewFlyer.alt} />
          <div className={style.flyer}>
            <div>
              <p className={style.label}>전단지 별명</p>
              <p className={style.name}>{props.previewFlyer.flyerName}</p>
            </div>
            <div>
              <p className={style.label}>유효 기간</p>
              <p className={style.name}>2023-05-22 ~ 2023-06-31</p>
            </div>
          </div>
          <div className={style.input}>
            <input
              type="number"
              onChange={onNumberInputChangeHandler}
              value={qrNumber}
            />
          </div>
        </div>
      )}
      <div className={style.hashtag}>
        <Hashtag>
          #합리적인가격
        </Hashtag>
        <Hashtag>
          #헤어스파
        </Hashtag>
        <Hashtag>
          #두피클리닉
        </Hashtag>
      </div>
    </div>
  );
};

export default FlyerPreview;
