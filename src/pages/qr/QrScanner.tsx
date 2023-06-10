import React from "react";

import QRCode from "../../components/qr/QRCode";

const QrScanner: React.FC = () => {
  return (
      <QRCode qr={dummy} />
  );
};

export default QrScanner;

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
