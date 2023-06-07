import { GoogleOAuthProvider } from "@react-oauth/google";
import { useParams, useSearchParams } from "react-router-dom";

import style from "./LoginForm.module.css";
import GoogleLoginButton from "./GoogleLoginButton";
import KakaoLoginButton from "./KakaoLoginButton";
import logo from "../../../public/image/login_button/logo.svg";


const CLIENT_ID = import.meta.env.VITE_GOOGLE_LOGIN_API_KEY;
const KAKAO_LOGIN_KEY = import.meta.env.VITE_KAKAO_LOGIN_API_KEY;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

const LoginForm = () => {
  const [searchParams] = useSearchParams();
  const kakaoLoginHandler = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_LOGIN_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`;
  };

  return (
    <div className={style.loginForm}>
      <img src={logo} alt="logo" />
      <div className={style.contents}>
        <div className={style.buttons}>
          <KakaoLoginButton onClick={kakaoLoginHandler} />
          <GoogleOAuthProvider clientId={CLIENT_ID}>
            <GoogleLoginButton />
          </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
