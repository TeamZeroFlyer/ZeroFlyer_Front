import style from "./NoneMember.module.css";
import logoImg from "../../../../public/image/login_button/logo.svg";

const NoneMember = () => {
  // "ADVERTISER" "USER"
  const switchMode = (mode: string) => {
    const token = localStorage.getItem("accessToken");
    if (token){
        fetch("https://qrecode-back.shop/user/setstatus", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({"lastStatus" : mode})
        })
          .then(response => {
            return response.json()
          })
          .then(data => {
            if( data.data === "success"){
              console.log("success", mode)
              window.location.href = "/";
        }})
          .catch(_ => {
            localStorage.removeItem("accessToken");
            window.location.href = "/login";
          })
      }
  };

  return (
    <div className={style.noneMember}>
      <div className={style.logo}>
        <img src={logoImg} alt="로고" />
      </div>
      <div className={style.nav}>
        <div className={style.citizen} onClick={()=>switchMode("USER")}>
          <a>
            시티즌 모드로 시작하기
          </a>
          <div>
            <p className={style.phrase}>QR 스캔으로 전단지 광고를 시청하면</p>
            <p className={style.phrase}>나무를 심고 포인트를 쌓을 수 있어요!</p>
          </div>
        </div>
        <div className={style.advertizer} onClick={()=>switchMode("ADVERTISER")}>
          <a>광고주 모드로 시작하기</a>
          <div>
            <p className={style.phrase}>사장님, 종이 전단지 광고를</p>
            <p className={style.phrase}>QR 디지털 광고로 전환해 보세요!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoneMember;
