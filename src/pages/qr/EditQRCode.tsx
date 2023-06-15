import React, { useState } from "react";
import { getAuthToken } from "../../util/auth";
import {
  LoaderFunctionArgs,
  json,
  useLoaderData,
  useParams,
  useRouteLoaderData,
  useNavigate,
} from "react-router-dom";
import { FlyerInf, PTJob } from "./CreateQRCode";

import QrGenerator from "../../components/qr/QrGenerator";
import QRForm from "../../components/qr/QRForm";
import FlyerPreview from "../../components/FlyerPreview";
import PartTimeList from "../../components/qr/PartTimeList";
import style from "./CreateQRCode.module.css";

type QR = {
  idx: number;
  qrNum: string;
  qrStart: string;
  qrEnd: string;
  ptjName: string;
  ptjPhone: string;
  flyerIdx: 1;
  flyerName: string;
  scanCount: number;
  timeStamp: string;
};

const EditQRCode: React.FC = () => {
  const params = useParams();
  const flyerList = useRouteLoaderData("flyer") as FlyerInf[];
  console.log(flyerList);
  const qr = useLoaderData() as QR;
  console.log(qr);

  const navigate = useNavigate();

  const [isQRModalOpen, setIsQRModalOpen] = useState<boolean>(false);
  const [seletedFlyer, setSelectedFlyer] = useState<FlyerInf>(
    flyerList.find((flyer) => flyer.idx === qr.flyerIdx)!
  );
  console.log(seletedFlyer);
  const [qrNumber, setQrNumber] = useState<number>(1);
  const [ptJob, setPtJob] = useState<PTJob>({
    ptjName: qr.ptjName,
    ptjPhone: qr.ptjPhone,
  });

  const qrOpenModalHandler = () => setIsQRModalOpen(true);
  const qrCloseHandler = () => setIsQRModalOpen(false);

  const qrEditHandler = async () => {
    if (seletedFlyer && qrNumber > 0 && validateForm(ptJob)) {
      const token = getAuthToken();
      console.log({
        qrFlyerIdx: seletedFlyer.idx,
        qrPtjName: ptJob.ptjName,
        qrPtjPhone: ptJob.ptjPhone,
      });
      const reponse = await fetch(
        `https://qrecode-back.shop/qr/update?idx=${params.qrId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type" : "application/json",
          },
          body: JSON.stringify({
            qrFlyerIdx: seletedFlyer.idx,
            qrPtjName: ptJob.ptjName,
            qrPtjPhone: ptJob.ptjPhone,
          }),
        }
      );

      if (!reponse.ok) {
        //TODO: 에러처리.
        //throw new Error("QR을 생성하는데 문제가 발생했습니다.");
        // throw json(
        //   { message: "QR을 생성하는데 문제가 발생했습니다." },
        //   { status: 500 }
        // );
      } else {
        return navigate("/qr");
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
          flyers={flyerList}
        />
      )}
      <QRForm onModalClick={qrOpenModalHandler} onCreateClick={qrEditHandler} />
      {seletedFlyer && (
        <FlyerPreview
          previewFlyer={seletedFlyer}
          qrNumber={qrNumber}
          selectQrNumber={setQrNumber}
        />
      )}
      {seletedFlyer && <PartTimeList ea={1} onEditPt={setPtJob} pt={ptJob} />}
    </div>
  );
};

const validateForm = (ptj: PTJob) => {
  const isValid =
    ptj.ptjName !== "" && ptj.ptjName && ptj.ptjPhone !== "" && ptj.ptjPhone;
  return isValid;
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const token = getAuthToken();
  const qrId = params.qrId;

  const response = await fetch(`https://qrecode-back.shop/qr?idx=${qrId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw json(
      { message: "데이터를 가져오는데 실패했습니다." },
      { status: 500 }
    );
  } else {
    const { data } = await response.json();
    return data;
  }
};

export default EditQRCode;
