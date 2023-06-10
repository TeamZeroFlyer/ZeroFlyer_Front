import QRList from "../../components/qr/QRList";
import Header from "../../components/footer/Header";

type QR = {
  qrId: string;
  flyerTitle: string;
  scan: number;
};

export type QRManagement = {
  date: Date;
  qrcodes: QR[];
};

const dummy: QRManagement[] = [
  {
    date: new Date('2023-05-23'),
    qrcodes: [
      { qrId: "QR052301", flyerTitle: "첫 방문 고객 할인", scan: 89 },
      { qrId: "QR052302", flyerTitle: "첫 방문 고객 할인", scan: 27 },
    ],
  }, {
    date: new Date('2023-05-22'),
    qrcodes: [
      { qrId: "QR052201", flyerTitle: "첫 방문 고객 할인", scan: 31 },
      { qrId: "QR052202", flyerTitle: "첫 방문 고객 할인", scan: 29 },
      { qrId: "QR052203", flyerTitle: "첫 방문 고객 할인", scan: 3 },
    ],
  },     
];

const ManageQRCode = () => {
  return (
    <>
      <Header>QR코드 관리</Header>
      <QRList qrcodes={ dummy} />
    </>
  );
};

export default ManageQRCode;
