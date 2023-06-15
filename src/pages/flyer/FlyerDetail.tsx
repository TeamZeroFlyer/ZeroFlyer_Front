import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getAuthToken } from "../../util/auth";
import style from "./FlyerDetail.module.css";

// localhost:5173/flyer/:flyerId/qr/:qrId/
const FlyerDetailPage: React.FC = () => {
  const { flyerId, qrId } = useParams();
  const token = getAuthToken();
  const client = getDupClient();

  useEffect(() => {
    const scanCode = async () => {
      await fetch("https://qrecode-back.shop/scan", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
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

    //Todo: 서버url 확인
    fetch("https://qrecode-back.shop/store/info" + flyerId, {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
          },
      })
      .then(response => {
          return response.json()
      })
      .then(data => {
        data.data
    });

  }, []);

  return (
    <>
    <div className={style.container}>
        <div className={style.imgBox}>
            <img className={style.img} src={''} alt='https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/9be89183664a4898914b84dece371161ba044478/public/icons/plus.svg'/>
        </div>
        <div className={style.twoBtn}>
            <div className={style.btn} onClick={()=>{}}><span className={style.green}>전단지</span>삭제</div>
            <div className={style.btn2}>전단지 <span className={style.green}>쿠폰</span>을<br></br> 저장해요!</div>
        </div>
    </div>
    </>
);
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
