import React, { useEffect } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { getAuthToken } from "../../util/auth";
import style from "./FlyerDetail.module.css";
type ChildProps = {
  status: number
}
// localhost:5173/flyer/:flyerId/qr/:qrId/
const FlyerDetailPage: React.FC = () => {
  const { flyerId, qrId } = useParams();
  const token = getAuthToken();
  const client = getDupClient();
  const [imgUrl, setImgUrl] = React.useState<string>("");
  const {status} = useOutletContext<ChildProps>();

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
    fetch("https://qrecode-back.shop/user/flyer/show?idx=" + flyerId, {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
          },
      })
      .then(response => {
          return response.json()
      })
      .then(data => {
        setImgUrl(data.data);
    });

  }, []);

  const save = () => {
    if(status === 0){
      sessionStorage.setItem("save", flyerId!);
      alert("로그인이 필요합니다.");
      window.location.href = "/login";
    }else{
      fetch("https://qrecode-back.shop/user/saveflyer?idx=" + flyerId, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
        })
        .then(response => {
          if(!response.ok){
            alert('이미 저장되어있는 전단지입니다.');
            window.location.href = "/";
            return;
          }
            return response.json()
        })
        .then(data => {
          console.log(data)
          if(data.data === 'success'){
            alert('저장되었습니다.');
            window.location.href = "/";
          }
      });

    }
  }

  return (
    <>
    <div className={style.container}>
        <div className={style.imgBox}>
            <img className={style.img} src={imgUrl} alt='https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/9be89183664a4898914b84dece371161ba044478/public/icons/plus.svg'/>
        </div>
        <div className={style.twoBtn}>
            {status !== 0 && <Link to='/'><div className={style.btn} onClick={()=>{}}><span className={style.green}>홈</span>으로 이동</div></Link>}
            <div className={style.btn2} onClick={()=>save()}>전단지 <span className={style.green}>쿠폰</span>을<br></br> 저장해요!</div>
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
