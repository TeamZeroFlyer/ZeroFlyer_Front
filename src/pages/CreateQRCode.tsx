import React, { useState } from "react";
import { Link } from "react-router-dom";

import QrGenerator from "../components/QrGenerator";

export type FlyerInf = {
  id: string;
  issuer: string;
  imgUrl: string;
};

const flyers: FlyerInf[] = [
  { id: "1", issuer: "juhong", imgUrl: "https://localhost:5173/flyer/1" },
  { id: "2", issuer: "hyeonsik", imgUrl: "https://localhost:5173/flyer/2" },
  { id: "3", issuer: "gitae", imgUrl: "https://localhost:5173/flyer/3" },
];

const CreateQRCode: React.FC = () => {
  const [isQRModalOpen, setIsQRModalOpen] = useState<boolean>(false);
  const [seletedFlyer, setSelectedFlyer] = useState<FlyerInf>();
  const [qrNumber, setQrNumber] = useState<number>(1);

  const qrOpenModalHandler = () => setIsQRModalOpen(true);
  const qrCloseHandler = () => setIsQRModalOpen(false);

  const createQrLink = (qrNumber: number) => {
    let linkArr = [];
    for (let i = 0; i < qrNumber; i++) {
      linkArr.push(
        <li>
          <Link to={`${i + 1}`}>qr{i + 1}</Link>
        </li>
      );
    }
    return linkArr;
  };

  return (
    <>
      {isQRModalOpen && (
        <QrGenerator
          onConfirm={qrCloseHandler}
          flyers={flyers}
          onSelectFlyer={setSelectedFlyer}
          onSelectQrNumber={setQrNumber}
        />
      )}
      <div>
        <div>
          <p>QR 코드 만들기</p>
          <button onClick={qrOpenModalHandler}>QR 생성</button>
        </div>
      </div>
      {seletedFlyer && createQrLink(qrNumber)}
    </>
  );
};

export default CreateQRCode;
