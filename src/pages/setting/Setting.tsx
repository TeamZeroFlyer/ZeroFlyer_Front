import Header from "../../components/footer/Header";
import style from "./Setting.module.css";
import { useOutletContext, useNavigate } from 'react-router-dom';

type ChildProps = {
    status: number
  }

const Setting = () => { 
    const {status} = useOutletContext<ChildProps>();
    const navigate = useNavigate();
    const editStore = () => {
      if (status === 2){
        navigate("/setting/edit");
      }
    };

    const switchMode = () => {
        const token = localStorage.getItem("accessToken");
        console.log(JSON.stringify({"lastStatus" : status === 1 ? "ADVERTISER" : "USER"}));
        if (token){
            fetch("https://qrecode-back.shop/user/setstatus", {
              method: "POST",
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
              },
              body: JSON.stringify({"lastStatus" : status === 1 ? "ADVERTISER" : "USER"})
            })
              .then(response => {
                return response.json()
              })
              .then(data => {
                if( data.data === "success"){
                  window.location.href = "/";
            }})
              .catch(_ => {
                localStorage.removeItem("accessToken");
                window.location.href = "/login";
              })
          }

    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
    };

    return(
        <>
        <Header>설정</Header>
        <div className={style.general}>
            <div className={style.title}>일반</div>
            <div className={style.element}  onClick={()=>editStore()}>
                {status === 1 ? "로그인 정보" : "가게 정보"} <img src="https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/9be89183664a4898914b84dece371161ba044478/public/icons/lock.svg"/>
            </div>
            <div className={style.element}  onClick={()=>switchMode()}>
            {status === 1 ? "광고주" : "일반"} 모드로 전환 <img src="https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/9be89183664a4898914b84dece371161ba044478/public/icons/smile.svg"/>
            </div>
            <div className={style.element}>
            상품 구매
            </div>
        </div>

        <div className={style.general}>
            <div className={style.title}>정보</div>
            <div className={style.element}>
                QR:ECOde 소개 <img src="https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/9be89183664a4898914b84dece371161ba044478/public/icons/plant.svg"/>
            </div>
            <div className={style.element}>
                이용약관 <img src="https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/9be89183664a4898914b84dece371161ba044478/public/icons/guard.svg"/>
            </div>
            <div className={style.element}>
                개인정보처리방침 <img src="https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/9be89183664a4898914b84dece371161ba044478/public/icons/page.svg"/>
            </div>
        </div>


        <div className={style.logout}>
            <span className={style.text} onClick={()=>logout()}>로그아웃</span>
        </div>
        </>
    );
};

export default Setting;