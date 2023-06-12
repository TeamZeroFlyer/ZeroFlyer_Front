import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAuthToken } from "../util/auth";

// localhost:5173/flyer/:flyerId/qr/:qrId/
const FlyerDetailPage: React.FC = () => {
  const { flyerId, qrId } = useParams();
  const token = getAuthToken();
  const client = getDupClient();

  useEffect(() => {
    const scanCode = async () => {
      await fetch("https://qrecode-back.shop/scan", {
        method: "POST",
        headers: { Authentication: `Bearer ${token}` },
        body: JSON.stringify({
          flyerId: flyerId,
          qrId: qrId,
        }),
      });
    };

    // 이미 스캔한 대상이 아니라면.
    if (flyerId && qrId && !client) {
      setDupClient(flyerId, qrId);
      scanCode();
    }
  }, []);

  // TODO: 전단지 렌더링.
  return <div>임시 전단지 {flyerId}</div>;
};

const setDupClient = (flyerId: string, qrId: string) => {
  localStorage.setItem(
    "client",
    JSON.stringify({ flyerId: flyerId, qrId: qrId })
  );
};
const getDupClient = () => {
  return localStorage.getItem("client");
};

export default FlyerDetailPage;
