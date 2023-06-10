import React, { useState, useEffect } from "react";

import QrGenerator from "../../components/qr/QrGenerator";
import QRForm from "../../components/qr/QRForm";
import FlyerPreview from "../../components/FlyerPreview";
import PartTimeList from "../../components/qr/PartTimeList";
import style from "./CreateQRCode.module.css"

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
    <div className={style.createQRCode}>
      {isQRModalOpen && (
        <QrGenerator
          onConfirm={qrCloseHandler}
          onSelectFlyer={setSelectedFlyer}
          onSelectQrNumber={setQrNumber}
        />
      )}
      <QRForm onModalClick={qrOpenModalHandler} />
      {seletedFlyer && (
        <FlyerPreview
          previewFlyer={seletedFlyer}
          selectQrNumber={setQrNumber}
        />
      )}

      { seletedFlyer && <PartTimeList ea={qrNumber} />}
    </div>
  );
};

export default CreateQRCode;
