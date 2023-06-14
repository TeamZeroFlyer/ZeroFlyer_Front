import React, { useState} from "react";
import { getAuthToken } from "../../util/auth";
import { redirect } from "react-router-dom";

import QrGenerator from "../../components/qr/QrGenerator";
import QRForm from "../../components/qr/QRForm";
import FlyerPreview from "../../components/FlyerPreview";
import PartTimeList from "../../components/qr/PartTimeList";
import style from "./CreateQRCode.module.css";

export type FlyerInf = {
  id: number;
  src: string;
  flyerName: string;
  hashTag: string[];
  alt: string;
};

export type PTJob = {
  name: string;
  phone: string;
};

const CreateQRCode: React.FC = () => {
  const [isQRModalOpen, setIsQRModalOpen] = useState<boolean>(false);
  const [seletedFlyer, setSelectedFlyer] = useState<FlyerInf>();
  const [qrNumber, setQrNumber] = useState<number>(1);
  const [ptJob, setPtJob] = useState<PTJob[]>([]);

  const qrOpenModalHandler = () => setIsQRModalOpen(true);
  const qrCloseHandler = () => setIsQRModalOpen(false);

  const qrCreateHandler = async () => {
    if (seletedFlyer && qrNumber > 0 && validateForm(ptJob)) {
      const token = getAuthToken();
      
      const reponse = await fetch("https://qrecode-back.shop/qr/new", {
        method: "POST",
        headers: { Authentication: `Bearer ${token}` },
        body: JSON.stringify({
          flyerId: seletedFlyer.id,
          ptj: ptJob,
        })
      });

      if (!reponse.ok) {
        //TODO: 에러처리.
        //throw new Error("QR을 생성하는데 문제가 발생했습니다.");
        // throw json(
        //   { message: "QR을 생성하는데 문제가 발생했습니다." },
        //   { status: 500 }
        // );
      } else {
        return redirect("/qr");
      }
    }
  };

  return (
    <div className={style.createQRCode}>
      {isQRModalOpen && (
        <QrGenerator
          onConfirm={qrCloseHandler}
          onSelectFlyer={setSelectedFlyer}
          onSelectQrNumber={setQrNumber}
        />
      )}
      <QRForm
        onModalClick={qrOpenModalHandler}
        onCreateClick={qrCreateHandler}
      />
      {seletedFlyer && (
        <FlyerPreview
          previewFlyer={seletedFlyer}
          qrNumber={qrNumber}
          selectQrNumber={setQrNumber}
        />
      )}
      {seletedFlyer && <PartTimeList ea={qrNumber} onSelectPT={setPtJob} />}
    </div>
  );
};

const validateForm = (ptList: PTJob[]) => {
  if (ptList.length === 0) return false;
  const isValid = ptList.every(
    (entry) =>
      entry.name !== "" && entry.name && entry.phone !== "" && entry.phone
  );
  return isValid;
};

export default CreateQRCode;
