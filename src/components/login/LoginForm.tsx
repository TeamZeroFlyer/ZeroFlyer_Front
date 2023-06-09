import {Link} from "react-router-dom";

import style from "./LoginForm.module.css";
import GoogleLoginButton from "./GoogleLoginButton";
import KakaoLoginButton from "./KakaoLoginButton";
import logo from "../../../public/image/login_button/logo.svg";

const url =
  "https://qrecode-back.shop/oauth2/authorization/kakao?redirect_uri=http://localhost:5173";

const LoginForm = () => {

  return (
    <div className={style.loginForm}>
      <div>
        <img src={logo} alt="logo" />
      </div>
      <div className={style.buttons}>
        <Link to={url}>
          <KakaoLoginButton />
        </Link>
        <GoogleLoginButton />
      </div>
    </div>
  );
};

export default LoginForm;
