import React from "react";
import { Link } from "react-router-dom";

import style from "./QRForm.module.css";
import Button from "../../UI/Button";

const QRForm: React.FC<{
  onModalClick: () => void;
}> = (props) => {
  return (
    <div className={style.createQRCode}>
      <div className={style.header}>
        <p>QR코드 만들기</p>
        <div className={style.action}>
          <Link className={style.cancel} to="/qr">
            취소
          </Link>
          <Link className={style.create} to="#">
            생성
          </Link>
        </div>
      </div>
      <div className={style.flyer}>
        <Button width="100%" onClick={props.onModalClick}>
          전단지 선택하기
        </Button>
      </div>
    </div>
  );
};

export default QRForm;
