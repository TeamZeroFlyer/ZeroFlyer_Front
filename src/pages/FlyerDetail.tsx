import React from "react";
import { useParams } from "react-router-dom";

// localhost:5173/flyer/:flyerId/qr/:qrId/
const FlyerDetailPage: React.FC = () => {
  const { flyerId } = useParams();

  return <div>임시 전단지 {flyerId}</div>;
};

export default FlyerDetailPage;
