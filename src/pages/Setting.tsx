import Header from "../components/footer/Header";
import style from "./Setting.module.css";

const Setting = () => { 
    return(
        <>
        <Header>설정</Header>
        <div className={style.general}>
            <div className={style.title}>일반</div>
            <div className={style.element}>
                가게 정보 <img src="/public/icons/lock.svg"/>
            </div>
            <div className={style.element}>
            일반 모드로 전환 <img src="/public/icons/smile.svg"/>
            </div>
            <div className={style.element}>
            상품 구매 <img src="/public/icons/smile.svg"/>
            </div>
        </div>

        <div className={style.general}>
            <div className={style.title}>정보</div>
            <div className={style.element}>
                QR:ECOde 소개 <img src="/public/icons/plant.svg"/>
            </div>
            <div className={style.element}>
                이용약관 <img src="/public/icons/guard.svg"/>
            </div>
            <div className={style.element}>
                개인정보처리방침 <img src="/public/icons/page.svg"/>
            </div>
        </div>


        <div className={style.logout}>
            <span className={style.text}>로그아웃</span>
        </div>
        </>
    );
};

export default Setting;