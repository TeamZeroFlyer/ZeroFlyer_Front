import CircleChart from "../chart/CircleChart.tsx";
import DoubleLineChart from "../chart/DoubleLineChart.tsx";
import WeeklyChart from "../chart/WeeklyChart.tsx";
import Header from "../footer/Header.tsx";
import style from "./Advertiser.module.css";
import legend from "../../../public/image/legend.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface HomeElement {
    "yesterday": {
        "nine": number,
        "twelve": number,
        "fifteen": number,
        "eighteen": number,
        "twentyOne": number,
    },
    "today": {
        "nine": number,
        "twelve": number,
        "fifteen": number,
        "eighteen": number,
        "twentyOne": number,
    },
    "percent": number,
    "first_week": number,
    "second_week": number,
    "third_week": number,
}

interface StoreData {
    "store_name": string,
    "url": string,
    "qrCount": number,
    "scanCount": number,
    "userName": string,
}

const Advertiser = () => {

    const [element, setElement] = useState<HomeElement>(
        {
            "yesterday": {
                "nine": 0,
                "twelve": 0,
                "fifteen": 0,
                "eighteen": 0,
                "twentyOne": 0,
            },
            "today": {
                "nine": 0,
                "twelve": 0,
                "fifteen": 0,
                "eighteen": 0,
                "twentyOne": 0,
            },
            "percent": 0,
            "first_week": 0,
            "second_week": 0,
            "third_week": 0,
        }
    );
    const [storeData, setStoreData] = useState<StoreData>(
        {
            "store_name": '',
            "url": '',
            "qrCount": 0,
            "scanCount": 0,
            "userName": '',
        }
    )

    useEffect(() => {

        const token = localStorage.getItem("accessToken");

        fetch("https://qrecode-back.shop/store", {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
            }
          })
            .then(response => {
              return response.json()
            })
            .then(data => {
                setStoreData(
                    {
                        "store_name": data.data.storeName,
                        "url": data.data.storeUrl,
                        "qrCount": data.data.storeQrCount,
                        "scanCount": data.data.storeScanCount,
                        "userName": data.data.userName
                    }
                )
                setElement(
                    {
                        "yesterday": {
                            "nine": data.data.yesterday.nine,
                            "twelve": data.data.yesterday.twelve,
                            "fifteen": data.data.yesterday.fifteen,
                            "eighteen": data.data.yesterday.eighteen,
                            "twentyOne": data.data.yesterday.twentyOne,
                        },
                        "today": {
                            "nine": data.data.today.nine,
                            "twelve": data.data.today.twelve,
                            "fifteen": data.data.today.fifteen,
                            "eighteen": data.data.today.eighteen,
                            "twentyOne": data.data.today.twentyOne,
                        },
                        "percent": data.data.percent,
                        "first_week": data.data.first_week,
                        "second_week": data.data.second_week,
                        "third_week": data.data.third_week,
                    }
                );
            })

        
    }, []);

    return(
        <>
        <Header><img src="https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/9be89183664a4898914b84dece371161ba044478/public/image/logo.svg"/></Header>


        <div className={style.headTextBox}>
            <div>
                <div className={style.headText}><span className={style.boldGreen}>{storeData.userName}</span>님,</div>
                <div className={style.headText}><span className={style.bold}>{storeData.scanCount}장</span>의 전단지를 아꼈어요</div>
            </div>
        </div>


        <div className={style.greenInfoBox}>
            <div className={style.greenInfoTitle}>
                My Store {!storeData.store_name  && <Link to='/setting'><img src="/public/icons/plus.svg" /></Link>}
            </div>
            <div className={style.greenInfoTwo}>
                { storeData.store_name ?
                <>
                <div className={style.greenImg}>
                    <img src={storeData.url}  alt='https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/9be89183664a4898914b84dece371161ba044478/public/icons/plus.svg'/>
                </div>
                <div className={style.greenText}>
                    <div className={style.greenText1}>{storeData.store_name}</div>
                    <div className={style.greenText2}>QR 생성 {storeData.qrCount} | QR 스캔 {storeData.scanCount}</div>
                </div>
                </>
                :
                <div className={style.noStore}>가게를 등록해주세요.</div>
                }
            </div>
        </div>


        <div className={style.dailyChartBox}>
            <div className={style.legendBox}>
                <div className={style.chartTitle}>일간 차트</div>
                <img src={legend}/>
            </div>
            <DoubleLineChart chartData={element}/>
        </div>

        
        <div className={style.twoChartBox}>
            <div className={style.twoChartBox1}>
                <div className={style.chartTitle}>전주 대비 증감비율</div>
                <CircleChart chartData={element}/>
            </div>
            <div className={style.twoChartBox2}>
                <div className={style.chartTitle}>주간 차트</div>
                <WeeklyChart chartData={element}/>
            </div>
        </div>
        </>
    );
};

export default Advertiser;
