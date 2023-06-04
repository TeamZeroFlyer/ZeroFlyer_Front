import React, { useState } from "react";
import { Link } from "react-router-dom";

import QrGenerator from "../components/QrGenerator";
import style from "./CreateQRCode.module.css";
import Button from "../ui/Button";
import FlyerPreview from "../components/FlyerPreview";

export type FlyerInf = {
  id: number;
  src: string;
  flyerName: string;
  hashTag: string[];
  alt: string;
};

const CreateQRCode: React.FC = () => {
  const [isQRModalOpen, setIsQRModalOpen] = useState<boolean>(false);
  const [seletedFlyer, setSelectedFlyer] = useState<FlyerInf>();
  const [qrNumber, setQrNumber] = useState<number>(1);

  const qrOpenModalHandler = () => setIsQRModalOpen(true);
  const qrCloseHandler = () => setIsQRModalOpen(false);

  return (
    <>
      {isQRModalOpen && (
        <QrGenerator
          onConfirm={qrCloseHandler}
          onSelectFlyer={setSelectedFlyer}
          onSelectQrNumber={setQrNumber}
        />
      )}
      <div className={style.createQRCode}>
        <div className={style.title}>
          <h2>QR코드 만들기</h2>
          <div>
            <span className={style.cancle}>
              <Link to="/qr">취소</Link>
            </span>
            <span style={{ fontWeight: "bold" }}>
              <Link to="#">생성</Link>
            </span>
          </div>
        </div>
        <div className={style.flyer}>
          <Button onClick={qrOpenModalHandler} width="100%">
            전단지 선택
          </Button>
        </div>
        <div>
          {seletedFlyer && (
            <FlyerPreview
              previewFlyer={seletedFlyer}
              selectQrNumber={setQrNumber}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CreateQRCode;
