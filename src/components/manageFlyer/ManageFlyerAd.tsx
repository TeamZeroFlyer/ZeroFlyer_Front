import { useEffect, useState } from "react";
import style from "./ManageFlyer.module.css";
import { Link } from 'react-router-dom';
import Header from "../footer/Header";

interface Flyer {
    flyerEnd : string;
    flyerName :  string;
    flyerQrCount :  number;
    flyerScanCount :  number;
    flyerStart :  string;
    flyerTag :  string;
    flyerUrl :  string;
    hasCoupon :  boolean;
    idx :  number;
}

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');
const currentNumber = Number(`${year}${month}${day}`);

const formatDate = (origin: string) => {
    const year = origin.substr(0, 4);
    const month = origin.substr(4, 2);
    const day = origin.substr(6, 2);
    return `${year}.${month}.${day}`;
}

const ManageFlyerAd = () => {
    const [now, setNow] = useState("using");
    const [dummy, setDummy] = useState<Flyer[]>([]);
    useEffect(()=>{
        fetch("https://qrecode-back.shop/store/flyer", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
                "Content-Type": "application/json"
                },
            })
            .then(response => {
                return response.json()
            })
            .then(data => {
                setDummy(data.data);
        });

        const usingDiv = document.getElementById("using");
        const usedDiv = document.getElementById("used");
        if (now === "using"){
            usingDiv!.style.color = "#006C3A";
            usingDiv!.style.borderBottom = "3px solid #006C3A";
        }else{
            usingDiv!.style.color = "#c8c8c8";
            usingDiv!.style.borderBottom = "";
        }
        if (now === "used"){
            usedDiv!.style.color = "#006C3A"
            usedDiv!.style.borderBottom = "3px solid #006C3A";
        }else{
            usedDiv!.style.color = "#c8c8c8"
            usedDiv!.style.borderBottom = "";
        }
    }, [now]);

    return(
        <div className={style.container}>
            <Header>전단지관리</Header>
            <div className={style.contentsHeader}>
                <div id="using" className={style.state} onClick={()=>{if(now !== "using"){setNow("using")}}}>이용중</div>
                <div id="used" className={style.state} onClick={()=>{if(now !== "used"){setNow("used")}}}>이용완료</div>
            </div>
            <div className={style.content}>
                {now === "using" && dummy.map((flyer, i)=>(
                    parseInt(flyer.flyerEnd) >= currentNumber && 
                    <div key={i} className={style.flyerInfo}>
                        <div className={style.textInfo}>
                            <div className={style.flyerTitle}>{flyer.flyerName}</div>
                            <div className={style.flyerValidDate}>{formatDate(flyer.flyerStart)} ~ {formatDate(flyer.flyerEnd)}</div>
                            <div className={style.flyerCount}>
                                <img src={"https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/9be89183664a4898914b84dece371161ba044478/public/icons/smallFace.svg"} />
                                {flyer.flyerQrCount}
                                <img src="https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/9be89183664a4898914b84dece371161ba044478/public/icons/smallFlyer.svg" />
                                {flyer.flyerScanCount}
                            </div>
                            <div className={style.flyerBtn}>
                                <div className={style.btn}>QR 만들기</div>
                                <Link to={`/flyer/${flyer.idx}`}>
                                <div className={style.btn}>수정</div>
                                </Link>
                            </div>
                        </div>
                        <div className={style.imgInfo}>
                        <img className={style.flyerThumbnail} src={flyer.flyerUrl} />
                        </div>
                    </div>
                ))}
                {now === "using" &&
                <Link to="/flyer/new">
                <div className={style.addFlyer}>
                    <img src="https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/9be89183664a4898914b84dece371161ba044478/public/image/addFlyer.svg" />
                </div>
                </Link>}
                {now === "used" && dummy.map((flyer, i)=>(
                    parseInt(flyer.flyerEnd) < currentNumber && 
                    <div key={i} className={style.flyerInfoUsed}>
                        <div className={style.textInfo}>
                            <div className={style.flyerTitle}>{flyer.flyerName}</div>
                            <div className={style.flyerValidDate}>{formatDate(flyer.flyerStart)} ~ {formatDate(flyer.flyerEnd)}</div>
                            <div className={style.flyerCount}>
                                <img src="https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/9be89183664a4898914b84dece371161ba044478/public/icons/smallFace.svg" />
                                {flyer.flyerQrCount}
                                <img src="https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/9be89183664a4898914b84dece371161ba044478/public/icons/smallFlyer.svg" />
                                {flyer.flyerScanCount}
                            </div>
                            <div className={style.flyerBtn}>
                                <div className={style.btnRemove}>삭제</div>
                            </div>
                        </div>
                        <div className={style.imgInfo}>
                        <img className={style.flyerThumbnail} src={flyer.flyerUrl} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManageFlyerAd;

// const dummy: Flyer[] = [
//     {
//         flyerCode: 0,
//         flyerTitle: "첫 방문 고객 할인",
//         storeName: "새싹미용실",
//         startDate: "20230522",
//         endDate: "20230630",
//         address: "새싹시 새싹동 12번지",
//         detailAddress: "12동 191호",
//         hashTag: ["합리적인가격", "여기가최고"],
//         hasCoupon: true,
//         phone: "010-1234-5678",
//         startTime: "0700",
//         closeTime: "2400",
//         imgSrc: "https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/9be89183664a4898914b84dece371161ba044478/public/flyer/flyerExample.png",
//         qrNum: 2,
//         qrTotalViewCount: 172,
//     },
//     {
//         flyerCode: 1,
//         flyerTitle: "첫 방문 고객 할인",
//         storeName: "새싹미용실",
//         startDate: "20230522",
//         endDate: "20230630",
//         address: "새싹시 새싹동 12번지",
//         detailAddress: "12동 191호",
//         hashTag: ["합리적인가격", "여기가최고"],
//         hasCoupon: true,
//         phone: "010-1234-5678",
//         startTime: "0700",
//         closeTime: "2400",
//         imgSrc: "https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/9be89183664a4898914b84dece371161ba044478/public/flyer/flyerExample.png",
//         qrNum: 2,
//         qrTotalViewCount: 172,
//     },
//     {
//         flyerCode: 2,
//         flyerTitle: "첫 방문 고객 할인",
//         storeName: "새싹미용실",
//         startDate: "20230522",
//         endDate: "20230630",
//         address: "새싹시 새싹동 12번지",
//         detailAddress: "12동 191호",
//         hashTag: ["합리적인가격", "여기가최고"],
//         hasCoupon: true,
//         phone: "010-1234-5678",
//         startTime: "0700",
//         closeTime: "2400",
//         imgSrc: "https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/9be89183664a4898914b84dece371161ba044478/public/flyer/flyerExample.png",
//         qrNum: 2,
//         qrTotalViewCount: 172,
//     },
//     {
//         flyerCode: 3,
//         flyerTitle: "첫 방문 고객 할인",
//         storeName: "새싹미용실",
//         startDate: "20230522",
//         endDate: "20230630",
//         address: "새싹시 새싹동 12번지",
//         detailAddress: "12동 191호",
//         hashTag: ["합리적인가격", "여기가최고"],
//         hasCoupon: true,
//         phone: "010-1234-5678",
//         startTime: "0700",
//         closeTime: "2400",
//         imgSrc: "https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/9be89183664a4898914b84dece371161ba044478/public/flyer/flyerExample.png",
//         qrNum: 2,
//         qrTotalViewCount: 172,
//     },
//     {
//         flyerCode: 4,
//         flyerTitle: "첫 방문 고객 할인",
//         storeName: "새싹미용실",
//         startDate: "20230522",
//         endDate: "20230630",
//         address: "새싹시 새싹동 12번지",
//         detailAddress: "12동 191호",
//         hashTag: ["합리적인가격", "여기가최고"],
//         hasCoupon: true,
//         phone: "010-1234-5678",
//         startTime: "0700",
//         closeTime: "2400",
//         imgSrc: "https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/9be89183664a4898914b84dece371161ba044478/public/flyer/flyerExample.png",
//         qrNum: 2,
//         qrTotalViewCount: 172,
//     },
//     {
//         flyerCode: 5,
//         flyerTitle: "첫 방문 고객 할인",
//         storeName: "새싹미용실",
//         startDate: "20230522",
//         endDate: "20230530",
//         address: "새싹시 새싹동 12번지",
//         detailAddress: "12동 191호",
//         hashTag: ["합리적인가격", "여기가최고"],
//         hasCoupon: true,
//         phone: "010-1234-5678",
//         startTime: "0700",
//         closeTime: "2400",
//         imgSrc: "https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/9be89183664a4898914b84dece371161ba044478/public/flyer/flyerExample.png",
//         qrNum: 2,
//         qrTotalViewCount: 172,
//     },
//     {
//         flyerCode: 6,
//         flyerTitle: "첫 방문 고객 할인",
//         storeName: "새싹미용실",
//         startDate: "20230522",
//         endDate: "20230530",
//         address: "새싹시 새싹동 12번지",
//         detailAddress: "12동 191호",
//         hashTag: ["합리적인가격", "여기가최고"],
//         hasCoupon: true,
//         phone: "010-1234-5678",
//         startTime: "0700",
//         closeTime: "2400",
//         imgSrc: "https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/9be89183664a4898914b84dece371161ba044478/public/flyer/flyerExample.png",
//         qrNum: 2,
//         qrTotalViewCount: 172,
//     },
//     {
//         flyerCode: 7,
//         flyerTitle: "첫 방문 고객 할인",
//         storeName: "새싹미용실",
//         startDate: "20230522",
//         endDate: "20230530",
//         address: "새싹시 새싹동 12번지",
//         detailAddress: "12동 191호",
//         hashTag: ["합리적인가격", "여기가최고"],
//         hasCoupon: true,
//         phone: "010-1234-5678",
//         startTime: "0700",
//         closeTime: "2400",
//         imgSrc: "https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/9be89183664a4898914b84dece371161ba044478/public/flyer/flyerExample.png",
//         qrNum: 2,
//         qrTotalViewCount: 172,
//     },
// ]