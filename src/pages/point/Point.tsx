import { getAuthToken } from "../../util/auth";
import { json, useLoaderData } from "react-router-dom";

import PointList from "../../components/point/PointList";

export type History = {
  store: string;
  date: Date;
  point: {
    operator: string;
    value: number;
  };
};

export type PointHistory = {
  scan: number;
  totalPoint: number;
  histories: History[];
};

const dummy: PointHistory = {
  scan: 127,
  totalPoint: 3600,
  histories: [
    {
      store: "새싹 미용실",
      date: new Date("2023-06-02T12:29"),
      point: { operator: "+", value: 10 },
    },
    {
      store: "새싹 헬스장",
      date: new Date("2023-06-02T12:13"),
      point: { operator: "+", value: 10 },
    },
    {
      store: "새싹 까페",
      date: new Date("2023-06-01T13:23"),
      point: { operator: "-", value: 300 },
    },
  ],
};

const PointPage = () => {
  const pointHistory = useLoaderData();
  return <PointList pointHistory={dummy} />;
};

export default PointPage;

const loader = async () => {
  const token = getAuthToken();
  const response = await fetch("https://qrecode-back.shop/point-history", {
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
    return response;
  }
};
