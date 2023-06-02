import React from "react";
import { Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

type qrType = {
  qrId: string;
  flyerLink: string;
};

const QR: qrType[] = [
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
      {qrcode}
      <Link to={QR[1].flyerLink}> link to {QR[1].flyerLink}</Link>
    </div>
  );
};

export default QrScanner;
