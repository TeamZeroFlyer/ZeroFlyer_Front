import React, { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { getAuthToken } from "../../util/auth";
import style from "./FlyerDetail.module.css";

type ChildProps = {
  status: number;
};

type Client = {
  flyerId: string;
  qrId: string;
}

const FlyerDetailPage: React.FC = () => {
  const { flyerId, qrId, storeIdx } = useParams();
  const token = getAuthToken();
  const [imgUrl, setImgUrl] = React.useState<string>("");
  const { status } = useOutletContext<ChildProps>();

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
    if (flyerId && qrId && !isDupClient(flyerId, qrId)) {
      setDupClient(flyerId, qrId);
      scanCode();
    }
    //Todo: 서버url 확인
    fetch("https://qrecode-back.shop/user/flyer/show?idx=" + flyerId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setImgUrl(data.data);
      });
  }, []);

  const save = () => {
    if (status === 0) {
      sessionStorage.setItem("save", flyerId!);
      alert("로그인이 필요합니다.");
      window.location.href = "/login";
    } else {
      fetch("https://qrecode-back.shop/user/saveflyer?idx=" + flyerId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
        .then((response) => {
          if (!response.ok) {
            alert("이미 저장되어있는 전단지입니다.");
            window.location.href = "/";
            return;
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data.data === "success") {
            alert("저장되었습니다.");
            window.location.href = "/";
          }
        });
    }
  };

  return (
    <div className={style.container}>
      <div className={style.imgBox}>
        <img
          className={style.img}
          src={imgUrl}
          onError={(e) => {
            e.currentTarget.src =
              "https://upload.wikimedia.org/wikipedia/commons/5/5f/Red_X.svg";
          }}
        />
      </div>
      <div className={style.twoBtn}>
        <div className={style.btn2} onClick={() => save()}>
        <span className={style.green}>나무</span>를 심고 <span className={style.green}>포인트</span>을 적립해요!
        </div>
      </div>
    </div>
  );
};

const setDupClient = (flyerId: string, qrId: string) => {
  localStorage.setItem(
    "client",
    JSON.stringify({ flyerId: flyerId, qrId: qrId })
  );
};
const isDupClient = (scanFlyerId: string, scanQrId: string) => {
  const data = localStorage.getItem("client");
  if (data === null) return false;
  const client = JSON.parse(data) as Client;
  if (client.flyerId === scanFlyerId && client.qrId === scanQrId) return true;
  else return false;
};

export default FlyerDetailPage;
