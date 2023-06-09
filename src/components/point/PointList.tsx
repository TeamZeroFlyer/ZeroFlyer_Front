import Header from "../footer/Header";
import style from "./PointList.module.css";
import barcode from "../../../public/image/point_history/barcode.svg";
import PointItem from "./PointItem";

const PointList = () => {
  return (
    <>
      <Header>적립 내역</Header>
      <div className={style.pointList}>
        <div className={style.head}>
          <div className={style.scan}>
            <p className={style.label}>스캔 횟수</p>
            <p className={style.value}>127회</p>
          </div>
          <div className={style.barcode}>
            <img src={barcode} alt="바코드" />
          </div>
          <div className={style.points}>
            <p className={style.label}>적립 포인트</p>
            <p className={style.value}>3,600</p>
          </div>
        </div>
        <div className={style.history}>
          <ul className={style.list}>
            <PointItem />
          </ul>
        </div>
      </div>
    </>
  );
};

export default PointList;
