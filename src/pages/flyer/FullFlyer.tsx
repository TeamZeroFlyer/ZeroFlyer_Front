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
                if (data.data === 'success'){
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
                <img className={style.img} src={receivedString ? receivedString : 'https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/9be89183664a4898914b84dece371161ba044478/public/icons/plus.svg'} onError={(e)=>{e.currentTarget.src ='https://upload.wikimedia.org/wikipedia/commons/5/5f/Red_X.svg'}}/>
            </div>
            <div className={style.twoBtn}>
                <div className={style.btn} onClick={()=>deleteFlyer()}><span className={style.green}>전단지</span>삭제</div>
                {/* <div className={style.btn2}>전단지 <span className={style.green}>쿠폰</span>을<br></br> 저장해요!</div> */}
            </div>
        </div>
        </>
    );
}

export default FullFyler;