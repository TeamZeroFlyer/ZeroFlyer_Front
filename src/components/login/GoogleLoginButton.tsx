import { useGoogleLogin } from "@react-oauth/google";

import googleButtonImg from "../../../public/image/login_button/google.png";
import style from "./GoogleLoginButton.module.css";

const GoogleLoginButton = () => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });
  return (
    <div className={style.googleLoginButton} onClick={()=>login()}>
      <button className={style["login-button"]}>
        <div className={style.contents}>
          <img className={style.img} src={googleButtonImg} alt="" />
          <div className={style.text}>
            구글 로그인
          </div>
        </div>
      </button>
    </div>
  );
};

export default GoogleLoginButton;
