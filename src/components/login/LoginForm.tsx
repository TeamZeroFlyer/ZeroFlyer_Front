import {Link} from "react-router-dom";

import style from "./LoginForm.module.css";
import GoogleLoginButton from "./GoogleLoginButton";
import KakaoLoginButton from "./KakaoLoginButton";
import logo from "../../../public/image/login_button/logo.svg";

const kakaoUrl =
"https://qrecode-back.shop/login/oauth2/authorization/kakao?redirect_uri=https://www.qrecode.site/"


const googleUrl =
"https://qrecode-back.shop/login/oauth2/authorization/google?redirect_uri=https://www.qrecode.site/"

const LoginForm = () => {

  return (
    <div className={style.loginForm}>
      <div>
        <img src={logo} alt="logo" />
      </div>
      <div className={style.buttons}>
        <Link to={kakaoUrl}>
          <KakaoLoginButton />
        </Link>
        <Link to={googleUrl}>
        <GoogleLoginButton />
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
