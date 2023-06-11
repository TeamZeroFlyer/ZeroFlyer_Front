import CircleChart from "../chart/CircleChart.tsx";
import DoubleLineChart from "../chart/DoubleLineChart.tsx";
import WeeklyChart from "../chart/WeeklyChart.tsx";
import Header from "../footer/Header.tsx";
import style from "./Advertiser.module.css";

const Advertiser = () => {
    return(
        <>
        <Header><img src="https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/9be89183664a4898914b84dece371161ba044478/public/image/logo.svg"/></Header>


        <div className={style.headTextBox}>
            <div>
                <div className={style.headText}><span className={style.boldGreen}>김나무</span>님,</div>
                <div className={style.headText}><span className={style.bold}>172장</span>의 전단지를 아꼈어요</div>
            </div>
            <div className={style.headImg}>
                <img src="https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/9be89183664a4898914b84dece371161ba044478/public/flyer/flyerExample.png" />
            </div>
        </div>


        <div className={style.greenInfoBox}>
            <div className={style.greenInfoTitle}>
                My Store
            </div>
            <div className={style.greenInfoTwo}>
                <div className={style.greenImg}>
                    <img src="https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/9be89183664a4898914b84dece371161ba044478/public/flyer/flyerExample.png" />
                </div>
                <div className={style.greenText}>
                    <div className={style.greenText1}>새싹미용실</div>
                    <div className={style.greenText2}>QR 생성 2 | QR 스캔 32</div>
                </div>
            </div>
        </div>


        <div className={style.dailyChartBox}>
            <DoubleLineChart/>
        </div>

        
        <div className={style.twoChartBox}>
            <div className={style.twoChartBox1}><CircleChart/></div>
            <div className={style.twoChartBox2}><WeeklyChart/></div>
        </div>
        </>
    );
};

export default Advertiser;
