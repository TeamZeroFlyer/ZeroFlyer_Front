import React, { useEffect, useState } from "react";
import { LoaderFunctionArgs, useLoaderData, useParams } from "react-router-dom";

import QRCode from "../../components/qr/QRCode";
import { getAuthToken } from "../../util/auth";

const QrScanner: React.FC = () => {
  const param = useParams();
  useEffect(() => {
    let timer = setInterval(async () => {
      const qr = await getQRScan(Number(param.qrId)) as QRCodeType;
      setScanCount(qr.qrScanCount);
    }, 1500);

    return () => clearInterval(timer);
  }, []);
  const qr = useLoaderData() as QRCodeType;
  const [scanCount, setScanCount] = useState<number>(qr.qrScanCount);
  return <QRCode qr={qr} scanCounter={scanCount} />;
};

export default QrScanner;

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const token = getAuthToken();
  const qrId = params.qrId;
  const response = await fetch(
    `https://qrecode-back.shop/qr/scan?idx=${qrId}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  if (!response.ok) {
    console.log(await response.json())
    //throw new Error("QR 코드를 불러오는데 실패했습니다.");
  } else {
    const { data } = await response.json();
    return data;
  }
};

const getQRScan = async (qrId: number) => {
  const token = getAuthToken();
  const response = await fetch(
    `https://qrecode-back.shop/qr/scan?idx=${qrId}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  const { data } = await response.json();
  return data;
};

export type QRCodeType = {
  storeIdx: number;
  storeName: string;
  qrScanCount: number;
  qrNum: string;
  qrIdx: number;
  qrTimestamp: string;
  flyerIdx: number;
};
