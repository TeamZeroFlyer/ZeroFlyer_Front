import React from "react";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";

import QRCode from "../../components/qr/QRCode";
import { getAuthToken } from "../../util/auth";

const QrScanner: React.FC = () => {
  const qr = useLoaderData() as QRCodeType;
  return <QRCode qr={qr} />;
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
    throw new Error("QR 코드를 불러오는데 실패했습니다.");
  } else {
    const { data } = await response.json();
    return data;
  }
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
