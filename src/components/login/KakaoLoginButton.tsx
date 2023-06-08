import React from "react";

import loginButtonImg from "../../../public/image/login_button/kakao_login_medium_wide.png";
import style from "./KakaoLoginButton.module.css"
const KakaoLoginButton: React.FC<{
    onClick: () => void;
}> = (props) => {
  return (
    <button onClick={props.onClick} className={style["login-button"]}>
      <img src={loginButtonImg} alt="" />
    </button>
  );
};

export default KakaoLoginButton;
