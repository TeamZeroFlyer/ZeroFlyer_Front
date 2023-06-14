import React from "react";
import { LoaderFunctionArgs, json} from "react-router-dom";

import QRCode from "../../components/qr/QRCode";

const QrScanner: React.FC = () => {
  //const qr = useLoaderData() as QRCodeType;
  return <QRCode qr={dummy} />;
};

export default QrScanner;

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const qrId = params.qrId;
  const response = await fetch(`https://qrecode-back.shop/qr/${qrId}`);
  if (!response.ok) {
    throw json(
      { message: "QR 코드를 불러오는데 실패했습니다." },
      { status: 500 }
    );
  } else {
    return response;
  }
};

/**
 * storeName: string
 * qrScan: number
 * qrId: string
 * qrCreateAt: date
 * flyerLink: string
 */

export type QRCodeType = {
  storeName: string;
  qrScan: number;
  qrId: string;
  qrCreateAt: Date;
  flyerLink: string;
};

const dummy: QRCodeType = {
  storeName: "새싹 미용실",
  qrScan: 63,
  qrId: "QR052301",
  qrCreateAt: new Date("2023-05-23"),
  flyerLink: "http://localhost:5173/flyer/1",
};
