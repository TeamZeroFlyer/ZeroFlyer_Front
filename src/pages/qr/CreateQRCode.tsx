import React, { useState } from "react";
import { getAuthToken } from "../../util/auth";
import { redirect, json, useLoaderData } from "react-router-dom";

import QrGenerator from "../../components/qr/QrGenerator";
import QRForm from "../../components/qr/QRForm";
import FlyerPreview from "../../components/FlyerPreview";
import PartTimeList from "../../components/qr/PartTimeList";
import style from "./CreateQRCode.module.css";

export type FlyerInf = {
  idx: number;
  flyerUrl: string;
  flyerName: string;
  flyerTag: string;
};

export type PTJob = {
  name: string;
  phone: string;
};

const CreateQRCode: React.FC = () => {
  const flyers = useLoaderData() as FlyerInf[];
  const [isQRModalOpen, setIsQRModalOpen] = useState<boolean>(false);
  const [seletedFlyer, setSelectedFlyer] = useState<FlyerInf>();
  const [qrNumber, setQrNumber] = useState<number>(1);
  const [ptJob, setPtJob] = useState<PTJob[]>([]);

  const qrOpenModalHandler = () => setIsQRModalOpen(true);
  const qrCloseHandler = () => setIsQRModalOpen(false);

  const qrCreateHandler = async () => {
    if (!seletedFlyer) {
      alert("전단지를 선택해 주세요.");
      return;
    }
    if (qrNumber < 0) {
      alert("아르바이트생은 한 명 이상 필요합니다.");
      return;
    }
    if (!validateForm(ptJob)) {
      alert("아르바이트생 정보를 입력해 주세요.");
      return;
    }

    if (seletedFlyer && qrNumber > 0 && validateForm(ptJob)) {
      const token = getAuthToken();
      console.log({
        flyerId: seletedFlyer.idx,
        ptj: ptJob,
      })
      const reponse = await fetch("https://qrecode-back.shop/qr/new", {
        method: "POST",
        headers: { Authentication: `Bearer ${token}` },
        body: JSON.stringify({
          flyerId: seletedFlyer.idx,
          ptj: ptJob,
        }),
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
          flyers={flyers}
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

export const loader = async () => {
  const token = getAuthToken();
  const response = await fetch("https://qrecode-back.shop/store/flyer", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    if (error.statusCode === `131`) {
      alert("점포를 먼저 등록해주세요.");
      return redirect("/setting/edit");
    } else {
      throw json(
        { message: "전단지 목록을 가져오는데 실패했습니다." },
        { status: 500 }
      );
    }
  } else {
    const { data } = await response.json();
    return data;
  }
};

export default CreateQRCode;
