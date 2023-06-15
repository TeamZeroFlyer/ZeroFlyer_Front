import { useEffect, useState } from "react";
import style from "./ManageFlyerCz.module.css";
import Header from "../footer/Header";
import { useNavigate } from 'react-router-dom';

interface Flyer {
    idx: number,
    flyerUrl: string,
    flyerName: string,
    flyerStart: string,
    flyerEnd: string,
    isValid: boolean,
}

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');
const currentNumber = Number(`${year}${month}${day}`);

const ManageFlyerAd = () => {
    const [now, setNow] = useState("using");
    const [flyerList, setFlyerList] = useState<Flyer[]>([]);
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem("accessToken");

        //TODO: 서버켜지면 적용확인
        fetch("https://qrecode-back.shop/user/flyer", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            }
            })
            .then(response => {
                return response.json()
            })
            .then(data => {
                setFlyerList(data.data);
            });

    }, []);

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

    const clickFull = (idx: number, isValid: boolean, flyerUrl: string) => {

        if (!isValid){
            if(confirm("만료된 전단지입니다. 삭제하시겠습니까?")){
                //TODO: 서버연결확인
                fetch("https://qrecode-back.shop/user/flyer?idx=" + idx, {
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
                            window.location.reload();
                        }else{
                            alert("삭제에 실패하였습니다.");
                        }
                });
            }
        }else{
            navigate(`/flyer/full/${idx}?url=${encodeURIComponent(flyerUrl)}`);
        }

    };

    return(
        <div className={style.container}>
            <Header>전단지관리</Header>
            <div className={style.contentsHeader}>
                <div id="using" className={style.state} onClick={()=>{if(now !== "using"){setNow("using")}}}>저장한 전단지</div>
                <div id="used" className={style.state} onClick={()=>{if(now !== "used"){setNow("used")}}}>만료된 전단지</div>
            </div>
            <div className={style.content}>
                {now === "using" && flyerList.map((flyer, i)=>(
                    parseInt(flyer.flyerEnd) >= currentNumber && 
                        <div key={i} className={style.flyerInfo} onClick={()=>clickFull(flyer.idx, flyer.isValid, flyer.flyerUrl)}>
                        <div className={style.imgInfo}>
                        <img className={style.flyerThumbnail} src={flyer.flyerUrl}  onError={(e)=>{e.currentTarget.src ='https://upload.wikimedia.org/wikipedia/commons/5/5f/Red_X.svg'}}/>
                        </div>
                        </div>
                ))}

                {now === "used" && flyerList.map((flyer, i)=>(
                    parseInt(flyer.flyerEnd) < currentNumber && 
                        <div key={i} className={style.flyerInfoUsed} onClick={()=>clickFull(flyer.idx, flyer.isValid, flyer.flyerUrl)}>
                        <div className={style.imgInfo}>
                        <img className={style.flyerThumbnail} src={flyer.flyerUrl}  onError={(e)=>{e.currentTarget.src ='https://upload.wikimedia.org/wikipedia/commons/5/5f/Red_X.svg'}}/>
                        </div>
                    </div>
                ))}
                {flyerList.length === 0 && <div className={style.noFlyer}>저장된 전단지가 없습니다.</div>}
            </div>
        </div>
    );
}

export default ManageFlyerAd;

// const dummy: Flyer[] = [
//     {
//         idx: 0,
//         flyerTitle: "첫 방문 고객 할인",
//         storeName: "새싹미용실",
//         flyerStart: "20230522",
//         flyerEnd: "20230630",
//         address: "새싹시 새싹동 12번지",
//         detailAddress: "12동 191호",
//         hashTag: ["합리적인가격", "여기가최고"],
//         hasCoupon: true,
//         phone: "010-1234-5678",
//         startTime: "0700",
//         closeTime: "2400",
//         flyerUrl: "https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/main/public/flyer/flyerExample.png",
//         qrNum: 2,
//         qrTotalViewCount: 172,
//     },
//     {
//         idx: 1,
//         flyerTitle: "첫 방문 고객 할인",
//         storeName: "새싹미용실",
//         flyerStart: "20230522",
//         flyerEnd: "20230630",
//         address: "새싹시 새싹동 12번지",
//         detailAddress: "12동 191호",
//         hashTag: ["합리적인가격", "여기가최고"],
//         hasCoupon: true,
//         phone: "010-1234-5678",
//         startTime: "0700",
//         closeTime: "2400",
//         flyerUrl: "https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/main/public/flyer/flyerExample.png",
//         qrNum: 2,
//         qrTotalViewCount: 172,
//     },
//     {
//         idx: 2,
//         flyerTitle: "첫 방문 고객 할인",
//         storeName: "새싹미용실",
//         flyerStart: "20230522",
//         flyerEnd: "20230630",
//         address: "새싹시 새싹동 12번지",
//         detailAddress: "12동 191호",
//         hashTag: ["합리적인가격", "여기가최고"],
//         hasCoupon: true,
//         phone: "010-1234-5678",
//         startTime: "0700",
//         closeTime: "2400",
//         flyerUrl: "https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/main/public/flyer/flyerExample.png",
//         qrNum: 2,
//         qrTotalViewCount: 172,
//     },
//     {
//         idx: 3,
//         flyerTitle: "첫 방문 고객 할인",
//         storeName: "새싹미용실",
//         flyerStart: "20230522",
//         flyerEnd: "20230630",
//         address: "새싹시 새싹동 12번지",
//         detailAddress: "12동 191호",
//         hashTag: ["합리적인가격", "여기가최고"],
//         hasCoupon: true,
//         phone: "010-1234-5678",
//         startTime: "0700",
//         closeTime: "2400",
//         flyerUrl: "https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/main/public/flyer/flyerExample.png",
//         qrNum: 2,
//         qrTotalViewCount: 172,
//     },
//     {
//         idx: 4,
//         flyerTitle: "첫 방문 고객 할인",
//         storeName: "새싹미용실",
//         flyerStart: "20230522",
//         flyerEnd: "20230630",
//         address: "새싹시 새싹동 12번지",
//         detailAddress: "12동 191호",
//         hashTag: ["합리적인가격", "여기가최고"],
//         hasCoupon: true,
//         phone: "010-1234-5678",
//         startTime: "0700",
//         closeTime: "2400",
//         flyerUrl: "https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/main/public/flyer/flyerExample.png",
//         qrNum: 2,
//         qrTotalViewCount: 172,
//     },
//     {
//         idx: 5,
//         flyerTitle: "첫 방문 고객 할인",
//         storeName: "새싹미용실",
//         flyerStart: "20230522",
//         flyerEnd: "20230530",
//         address: "새싹시 새싹동 12번지",
//         detailAddress: "12동 191호",
//         hashTag: ["합리적인가격", "여기가최고"],
//         hasCoupon: true,
//         phone: "010-1234-5678",
//         startTime: "0700",
//         closeTime: "2400",
//         flyerUrl: "https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/main/public/flyer/flyerExample.png",
//         qrNum: 2,
//         qrTotalViewCount: 172,
//     },
//     {
//         idx: 6,
//         flyerTitle: "첫 방문 고객 할인",
//         storeName: "새싹미용실",
//         flyerStart: "20230522",
//         flyerEnd: "20230530",
//         address: "새싹시 새싹동 12번지",
//         detailAddress: "12동 191호",
//         hashTag: ["합리적인가격", "여기가최고"],
//         hasCoupon: true,
//         phone: "010-1234-5678",
//         startTime: "0700",
//         closeTime: "2400",
//         flyerUrl: "https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/main/public/flyer/flyerExample.png",
//         qrNum: 2,
//         qrTotalViewCount: 172,
//     },
//     {
//         idx: 7,
//         flyerTitle: "첫 방문 고객 할인",
//         storeName: "새싹미용실",
//         flyerStart: "20230522",
//         flyerEnd: "20230530",
//         address: "새싹시 새싹동 12번지",
//         detailAddress: "12동 191호",
//         hashTag: ["합리적인가격", "여기가최고"],
//         hasCoupon: true,
//         phone: "010-1234-5678",
//         startTime: "0700",
//         closeTime: "2400",
//         flyerUrl: "https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/main/public/flyer/flyerExample.png",
//         qrNum: 2,
//         qrTotalViewCount: 172,
//     },
// ]