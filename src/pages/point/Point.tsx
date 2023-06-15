import { getAuthToken } from "../../util/auth";
import { json, useLoaderData } from "react-router-dom";

import PointList from "../../components/point/PointList";

export type History = {
  storeName: string;
  timeStamp: string;
  point: number;
};

export type PointHistory = {
  scanCount: number;
  totalPoint: number;
  histories: History[];
};

const PointPage = () => {
  const pointHistory = useLoaderData() as PointHistory;
  return <PointList pointHistory={pointHistory} />;
};

export default PointPage;

export const loader = async () => {
  const token = getAuthToken();
  const response = await fetch("https://qrecode-back.shop/user/point", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json(
      { message: "포인트 내역을 받아오는데 실패했습니다." },
      { status: 500 }
    );
  } else {
    const { data } = await response.json();
    return data;
  }
};
