import React from "react";
import { QRCodeCanvas } from "qrcode.react";

import QRCode from "../components/QRCode";

export type QRType = {
  qrId: string;
  flyerLink: string;
};

const QR: QRType[] = [
  { qrId: "1", flyerLink: "http://localhost:5173/flyer/1" },
  { qrId: "2", flyerLink: "http://localhost:5173/flyer/1" },
  { qrId: "3", flyerLink: "http://localhost:5173/flyer/1" },
];

const QrScanner: React.FC = () => {

  const qrcode = (
    <QRCodeCanvas id="qrCode" value={QR[1].flyerLink} size={300} level={"H"} />
  );

  return (
    <div>
      <QRCode />
    </div>
  );
};

export default QrScanner;
