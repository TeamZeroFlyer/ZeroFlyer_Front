import { useEffect, useState } from "react";
import style from "./ManageFlyer.module.css";
import { Link } from 'react-router-dom';
import Header from "../components/footer/Header";

interface Flyer {
    flyerCode: number;
    flyerTitle: string;
    storeName: string;
    startDate: string;
    endDate: string;
    address: string;
    detailAddress: string;
    hashTag: string[];
    hasCoupon: boolean;
    phone: string;
    startTime: string;
    closeTime: string;
    imgSrc: string;
    qrNum: number;
    qrTotalViewCount: number;
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

const FlyerManage = () => {
    const [now, setNow] = useState("using");
    useEffect(()=>{
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
                    parseInt(flyer.endDate) >= currentNumber && 
                    <div key={i} className={style.flyerInfo}>
                        <div className={style.textInfo}>
                            <div className={style.flyerTitle}>{flyer.flyerTitle}</div>
                            <div className={style.flyerValidDate}>{formatDate(flyer.startDate)} ~ {formatDate(flyer.endDate)}</div>
                            <div className={style.flyerCount}>
                                <img src="/public/icons/smallFace.svg" />
                                {flyer.qrNum}
                                <img src="/public/icons/smallFlyer.svg" />
                                {flyer.qrTotalViewCount}
                            </div>
                            <div className={style.flyerBtn}>
                                <div className={style.btn}>QR 만들기</div>
                                <Link to={`/flyer/${flyer.flyerCode}`}>
                                <div className={style.btn}>수정</div>
                                </Link>
                            </div>
                        </div>
                        <div className={style.imgInfo}>
                        <img className={style.flyerThumbnail} src={flyer.imgSrc} />
                        </div>
                    </div>
                ))}
                {now === "using" &&
                <Link to="/flyer/new">
                <div className={style.addFlyer}>
                    <img src="/public/image/addFlyer.svg" />
                </div>
                </Link>}
                {now === "used" && dummy.map((flyer, i)=>(
                    parseInt(flyer.endDate) < currentNumber && 
                    <div key={i} className={style.flyerInfoUsed}>
                        <div className={style.textInfo}>
                            <div className={style.flyerTitle}>{flyer.flyerTitle}</div>
                            <div className={style.flyerValidDate}>{formatDate(flyer.startDate)} ~ {formatDate(flyer.endDate)}</div>
                            <div className={style.flyerCount}>
                                <img src="/public/icons/smallFace.svg" />
                                {flyer.qrNum}
                                <img src="/public/icons/smallFlyer.svg" />
                                {flyer.qrTotalViewCount}
                            </div>
                            <div className={style.flyerBtn}>
                                <div className={style.btnRemove}>삭제</div>
                            </div>
                        </div>
                        <div className={style.imgInfo}>
                        <img className={style.flyerThumbnail} src={flyer.imgSrc} />
                        </div>
                    </div>
                ))}
                <div className={style.void}></div>
            </div>
        </div>
    );
}

export default FlyerManage;

const dummy: Flyer[] = [
    {
        flyerCode: 0,
        flyerTitle: "첫 방문 고객 할인",
        storeName: "새싹미용실",
        startDate: "20230522",
        endDate: "20230630",
        address: "새싹시 새싹동 12번지",
        detailAddress: "12동 191호",
        hashTag: ["합리적인가격", "여기가최고"],
        hasCoupon: true,
        phone: "010-1234-5678",
        startTime: "0700",
        closeTime: "2400",
        imgSrc: "/public/flyer/flyerExample.png",
        qrNum: 2,
        qrTotalViewCount: 172,
    },
    {
        flyerCode: 1,
        flyerTitle: "첫 방문 고객 할인",
        storeName: "새싹미용실",
        startDate: "20230522",
        endDate: "20230630",
        address: "새싹시 새싹동 12번지",
        detailAddress: "12동 191호",
        hashTag: ["합리적인가격", "여기가최고"],
        hasCoupon: true,
        phone: "010-1234-5678",
        startTime: "0700",
        closeTime: "2400",
        imgSrc: "/public/flyer/flyerExample.png",
        qrNum: 2,
        qrTotalViewCount: 172,
    },
    {
        flyerCode: 2,
        flyerTitle: "첫 방문 고객 할인",
        storeName: "새싹미용실",
        startDate: "20230522",
        endDate: "20230630",
        address: "새싹시 새싹동 12번지",
        detailAddress: "12동 191호",
        hashTag: ["합리적인가격", "여기가최고"],
        hasCoupon: true,
        phone: "010-1234-5678",
        startTime: "0700",
        closeTime: "2400",
        imgSrc: "/public/flyer/flyerExample.png",
        qrNum: 2,
        qrTotalViewCount: 172,
    },
    {
        flyerCode: 3,
        flyerTitle: "첫 방문 고객 할인",
        storeName: "새싹미용실",
        startDate: "20230522",
        endDate: "20230630",
        address: "새싹시 새싹동 12번지",
        detailAddress: "12동 191호",
        hashTag: ["합리적인가격", "여기가최고"],
        hasCoupon: true,
        phone: "010-1234-5678",
        startTime: "0700",
        closeTime: "2400",
        imgSrc: "/public/flyer/flyerExample.png",
        qrNum: 2,
        qrTotalViewCount: 172,
    },
    {
        flyerCode: 4,
        flyerTitle: "첫 방문 고객 할인",
        storeName: "새싹미용실",
        startDate: "20230522",
        endDate: "20230630",
        address: "새싹시 새싹동 12번지",
        detailAddress: "12동 191호",
        hashTag: ["합리적인가격", "여기가최고"],
        hasCoupon: true,
        phone: "010-1234-5678",
        startTime: "0700",
        closeTime: "2400",
        imgSrc: "/public/flyer/flyerExample.png",
        qrNum: 2,
        qrTotalViewCount: 172,
    },
    {
        flyerCode: 5,
        flyerTitle: "첫 방문 고객 할인",
        storeName: "새싹미용실",
        startDate: "20230522",
        endDate: "20230530",
        address: "새싹시 새싹동 12번지",
        detailAddress: "12동 191호",
        hashTag: ["합리적인가격", "여기가최고"],
        hasCoupon: true,
        phone: "010-1234-5678",
        startTime: "0700",
        closeTime: "2400",
        imgSrc: "/public/flyer/flyerExample.png",
        qrNum: 2,
        qrTotalViewCount: 172,
    },
    {
        flyerCode: 6,
        flyerTitle: "첫 방문 고객 할인",
        storeName: "새싹미용실",
        startDate: "20230522",
        endDate: "20230530",
        address: "새싹시 새싹동 12번지",
        detailAddress: "12동 191호",
        hashTag: ["합리적인가격", "여기가최고"],
        hasCoupon: true,
        phone: "010-1234-5678",
        startTime: "0700",
        closeTime: "2400",
        imgSrc: "/public/flyer/flyerExample.png",
        qrNum: 2,
        qrTotalViewCount: 172,
    },
    {
        flyerCode: 7,
        flyerTitle: "첫 방문 고객 할인",
        storeName: "새싹미용실",
        startDate: "20230522",
        endDate: "20230530",
        address: "새싹시 새싹동 12번지",
        detailAddress: "12동 191호",
        hashTag: ["합리적인가격", "여기가최고"],
        hasCoupon: true,
        phone: "010-1234-5678",
        startTime: "0700",
        closeTime: "2400",
        imgSrc: "/public/flyer/flyerExample.png",
        qrNum: 2,
        qrTotalViewCount: 172,
    },
]