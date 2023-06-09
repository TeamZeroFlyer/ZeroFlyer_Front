import { useEffect, useState } from "react";
import style from "./ManageFlyerCz.module.css";
import { Link } from 'react-router-dom';
import Header from "../footer/Header";

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

const ManageFlyerAd = () => {
    const [now, setNow] = useState("using");
    useEffect(()=>{
        const usingDiv = document.getElementById("using");
        const usedDiv = document.getElementById("used");
        if (now === "using"){
            usingDiv!.style.color = "#FFFFFF";
            usingDiv!.style.backgroundColor = "#006C3A";
        }else{
            usingDiv!.style.color = "#c8c8c8";
            usingDiv!.style.backgroundColor = "";
        }
        if (now === "used"){
            usedDiv!.style.color = "#FFFFFF"
            usedDiv!.style.backgroundColor = "#006C3A";
        }else{

            usedDiv!.style.color = "#c8c8c8";
            usedDiv!.style.backgroundColor = "";
        }
    }, [now]);

    return(
        <div className={style.container}>
            <Header>전단지관리</Header>
            <div className={style.contentsHeader}>
                <div id="using" className={style.state} onClick={()=>{if(now !== "using"){setNow("using")}}}>저장한 전단지</div>
                <div id="used" className={style.state} onClick={()=>{if(now !== "used"){setNow("used")}}}>만료된 전단지</div>
            </div>
            <div className={style.content}>
                {now === "using" && dummy.map((flyer, i)=>(
                    parseInt(flyer.endDate) >= currentNumber && 
                    <Link to={`/flyer/full/${flyer.flyerCode}`}>
                        <div key={i} className={style.flyerInfo}>
                        <div className={style.imgInfo}>
                        <img className={style.flyerThumbnail} src={flyer.imgSrc} />
                        </div>
                    </div></Link>
                ))}

                {now === "used" && dummy.map((flyer, i)=>(
                    parseInt(flyer.endDate) < currentNumber && 
                    <Link to={`/flyer/full/${flyer.flyerCode}`}>
                        <div key={i} className={style.flyerInfoUsed}>
                        <div className={style.imgInfo}>
                        <img className={style.flyerThumbnail} src={flyer.imgSrc} />
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ManageFlyerAd;

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