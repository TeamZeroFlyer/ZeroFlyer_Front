import style from './FullFlyer.module.css';
import { Link } from 'react-router-dom';


const FullFyler = () => {

    return (
        <>
        <div className={style.container}>
            <div className={style.topBtn}><Link to="/flyer"><img className={style.img} src='https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/9be89183664a4898914b84dece371161ba044478/public/icons/backBtn.svg'/></Link></div>
            <div className={style.imgBox}>
                <img className={style.img} src="https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/9be89183664a4898914b84dece371161ba044478/public/flyer/flyerExample.png" />
            </div>
            <div className={style.twoBtn}>
                <div className={style.btn}>전단지 삭제</div>
                <div className={style.btn}>리워드 적립</div>
            </div>
        </div>
        </>
    );
}

export default FullFyler;