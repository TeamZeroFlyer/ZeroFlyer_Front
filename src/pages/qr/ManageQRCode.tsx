import { json, useRouteLoaderData } from "react-router-dom";
import { getAuthToken } from "../../util/auth";

import QRList from "../../components/qr/QRList";
import Header from "../../components/footer/Header";

type QR = {
  idx: number;
  qrNum: string;
  flyerName: string;
  scanCount: number;
  ptjName: string;
  ptjPhone: string;
};

export type QRManagement = {
  date: string;
  qrList: QR[];
};

const ManageQRCode = () => {
  const qrList = useRouteLoaderData("qrList") as QRManagement[];
  console.log(qrList)
  return (
    <>
      <Header>QR코드 관리</Header>
      <QRList qrcodes={qrList} />
    </>
  );
};

export const loader = async () => {
  const token = getAuthToken();
  const response = await fetch("https://qrecode-back.shop/qr", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    console.log(await response.json())
    throw json(
      { message: "QR코드를 가져오는데 실패했습니다." },
      { status: 500 }
    );
  } else {
    const { data } = await response.json();
    return data;
  }
};

export default ManageQRCode;
