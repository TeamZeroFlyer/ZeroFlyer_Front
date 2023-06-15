import style from './FullFlyer.module.css';
import { Link, useParams } from 'react-router-dom';


const FullFyler = () => {
    const { flyerCode } = useParams();
    const searchParams = new URLSearchParams(window.location.search);
    const receivedString = searchParams.get('url');

    const deleteFlyer = () => {
        //TODO: 서버연결확인
        fetch("https://qrecode-back.shop/user/flyer?idx=" + flyerCode, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
                "Content-Type": "application/json"
                },
            })
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (data.status === 200){
                    alert("삭제되었습니다.");
                    window.location.href = "/flyer";
                }else{
                    alert("삭제에 실패하였습니다.");
                }
        });
    };

    return (
        <>
        <div className={style.container}>
            <div className={style.topBtn}><Link to="/flyer"><img className={style.img} src='https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/9be89183664a4898914b84dece371161ba044478/public/icons/backBtn.svg'/></Link></div>
            <div className={style.imgBox}>
                <img className={style.img} src={receivedString ? receivedString : 'https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/9be89183664a4898914b84dece371161ba044478/public/icons/plus.svg'} alt='https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/9be89183664a4898914b84dece371161ba044478/public/icons/plus.svg'/>
            </div>
            <div className={style.twoBtn}>
                <div className={style.btn} onClick={()=>deleteFlyer()}>전단지 삭제</div>
                <div className={style.btn}>리워드 적립</div>
            </div>
        </div>
        </>
    );
}

export default FullFyler;