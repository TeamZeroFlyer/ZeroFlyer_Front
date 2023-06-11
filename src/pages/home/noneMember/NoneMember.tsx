import style from "./NoneMember.module.css";
import logoImg from "../../../../public/image/login_button/logo.svg";
import { Link } from "react-router-dom";
const NoneMember = () => {
  return (
    <div className={style.noneMember}>
      <div className={style.logo}>
        <img src={logoImg} alt="로고" />
      </div>
      <div className={style.nav}>
        <div className={style.citizen}>
          <Link to="#">
            시티즌 모드로 시작하기
          </Link>
          <div>
            <p className={style.phrase}>QR 스캔으로 전단지 광고를 시청하면</p>
            <p className={style.phrase}>나무를 심고 포인트를 쌓을 수 있어요!</p>
          </div>
        </div>
        <div className={style.advertizer}>
          <Link to="#">광고주 모드로 시작하기</Link>
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
