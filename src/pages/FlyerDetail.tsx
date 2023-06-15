import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAuthToken } from "../util/auth";

import FullFyler from "./flyer/FullFlyer";

const FlyerDetailPage: React.FC = () => {
  const { flyerId, qrId, storeIdx } = useParams();
  console.log(flyerId);
  console.log(qrId);
  console.log(storeIdx);
  const token = getAuthToken();
  //const client = getDupClient();

  useEffect(() => {
    const scanCode = async () => {
      const response = await fetch("https://qrecode-back.shop/qr/logging", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token ? token : "none-member"}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          storeIdx: storeIdx,
          flyerIdx: flyerId,
          qrIdx: qrId,
        }),
      });

      if (!response.ok) {
        throw new Error("서버에서 문제가 발생했습니다.");
      }
    };
    scanCode();
    // 이미 스캔한 대상이 아니라면.
    // if (storeIdx && flyerId && qrId && !client) {
    //   setDupClient(storeIdx, flyerId, qrId);
    //   scanCode();
    // }
  }, []);

  // TODO: 전단지 렌더링.
  return <FullFyler />;
};

// const setDupClient = (storeIdx: string, flyerId: string, qrId: string) => {
//   localStorage.setItem(
//     "client",
//     JSON.stringify({ storeIdx: storeIdx, flyerId: flyerId, qrId: qrId })
//   );
// };
// const getDupClient = () => {
//   return localStorage.getItem("client");
// };

export default FlyerDetailPage;
