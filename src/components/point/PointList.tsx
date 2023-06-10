import Header from "../footer/Header";
import style from "./PointList.module.css";
import barcode from "../../../public/image/point_history/barcode.svg";
import PointItem from "./PointItem";
import { PointHistory } from "src/pages/Point";

const PointList: React.FC<{ pointHistory: PointHistory }> = (props) => {

  return (
    <>
      <Header>적립 내역</Header>
      <div className={style.pointList}>
        <div className={style.head}>
          <div className={style.scan}>
            <p className={style.label}>스캔 횟수</p>
            <p className={style.value}>{props.pointHistory.scan}회</p>
          </div>
          <div className={style.barcode}>
            <img src={barcode} alt="바코드" />
          </div>
          <div className={style.points}>
            <p className={style.label}>적립 포인트</p>
            <p className={style.value}>{props.pointHistory.totalPoint.toLocaleString()}</p>
          </div>
        </div>
        <div className={style.history}>
          <ul className={style.list}>
            {props.pointHistory.histories?.map((history, idx) => {
              return <PointItem key={idx} history={history} />;
            })}
          </ul> 
        </div>
      </div>
    </>
  );
};

export default PointList;
