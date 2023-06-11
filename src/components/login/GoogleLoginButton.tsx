import googleButtonImg from "../../../public/image/login_button/google.png";
import style from "./GoogleLoginButton.module.css";

const GoogleLoginButton = () => {
  return (
    <div className={style.googleLoginButton}>
      <button className={style.loginButton}>
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
