import style from "./PointItem.module.css";
import saving from "../../../public/image/point_history/saving.svg";

const PointItem = () => {
  return (
    <li className={style.pointItem}>
      <div className={style.item}>
        <img src={saving} alt="포인트 적립" />
      </div>
      <div className={`${style.item} ${style.shop}`}>
        <p>새싹미용실</p>
        <time>2023.06.02 12:29</time>
      </div>
      <div className={`${style.item} ${style.point}`}>
        <p>+10p</p>
      </div>
    </li>
  );
};

export default PointItem;
