import React from "react";

import loginButtonImg from "../../../public/image/login_button/kakao_login_medium_wide.png";
import style from "./KakaoLoginButton.module.css";

const KakaoLoginButton: React.FC = () => {
  return (
    <button className={style.loginButton}>
      <img src={loginButtonImg} alt="카카오 로그인 버튼 이미지" />
    </button>
  );
};

export default KakaoLoginButton;
