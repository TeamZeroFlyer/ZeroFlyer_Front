import { json } from "react-router-dom";
import { getAuthToken } from "../../util/auth";

import QRList from "../../components/qr/QRList";
import Header from "../../components/footer/Header";

type QR = {
  qrId: string;
  flyerTitle: string;
  scan: number;
  ptj: { name: string;  phone: string},
};

export type QRManagement = {
  date: Date;
  qrcodes: QR[];
};

const dummy: QRManagement[] = [
  {
    date: new Date("2023-05-23"),
    qrcodes: [
      { qrId: "QR052301", flyerTitle: "첫 방문 고객 할인", scan: 89, ptj: {name: '조연제', phone: '010-8522-2039'} },
      { qrId: "QR052302", flyerTitle: "첫 방문 고객 할인", scan: 27, ptj: {name: '안주홍', phone: '010-5018-0177'}},
    ],
  },
  {
    date: new Date("2023-05-22"),
    qrcodes: [
      { qrId: "QR052201", flyerTitle: "첫 방문 고객 할인", scan: 31 , ptj: {name: '정재윤', phone: '010-1234-5678'}},
      { qrId: "QR052202", flyerTitle: "첫 방문 고객 할인", scan: 29 , ptj: {name: '김기태', phone: '010-1004-8282'}},
      { qrId: "QR052203", flyerTitle: "첫 방문 고객 할인", scan: 3 , ptj: {name: '조연제', phone: '010-1111-2222'}},
    ],
  },
];

const ManageQRCode = () => {
  //const qrList = useLoaderData() as QRManagement[];
  return (
    <>
      <Header>QR코드 관리</Header>
      <QRList qrcodes={dummy} />
    </>
  );
};

export const loader = async () => {
  const token = getAuthToken();
  const response = await fetch("https://qrecode-back.shop/qr", {
    headers: { Authentication: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw json(
      { message: "QR코드를 가져오는데 실패했습니다." },
      { status: 500 },
    );
  } else {
    return response;
  }
};

export default ManageQRCode;
