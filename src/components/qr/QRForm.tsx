import React from "react";
import { Link, useParams } from "react-router-dom";

import style from "./QRForm.module.css";
import Button from "../../UI/Button";

const QRForm: React.FC<{
  onModalClick: () => void;
  onCreateClick: () => void;
}> = (props) => {
  const params = useParams();

  return (
    <div className={style.createQRCode}>
      <div className={style.header}>
        <p>QR코드 만들기</p>
        <div className={style.action}>
          <Link className={style.cancel} to="/qr">
            취소
          </Link>
          <span className={style.create} onClick={props.onCreateClick}>
            {!params.qrId ? "생성" : "수정"}
          </span>
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
