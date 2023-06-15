import { getAuthToken } from "../../util/auth";
import { useLoaderData, json } from "react-router-dom";

import PointPay from "../../components/point/PointPay";

const UsingPoinPage = () => {
  const points = useLoaderData() as number;
  return <PointPay totalPoint={points} />;
};

export const loader = async () => {
  const token = getAuthToken();
  const response = await fetch("https://qrecode-back.shop/user/barcode", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json(
      { message: "포인트를 받아오는데 실패했습니다." },
      { status: 500 }
    );
  } else {
    const { data } = await response.json();
    return data.totalPoint;
  }
};

export default UsingPoinPage;
