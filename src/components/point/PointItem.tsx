import React from "react";

import style from "./PointItem.module.css";
import saving from "../../../public/image/point_history/saving.svg";
import { History } from "../../pages/point/Point";

const PointItem: React.FC<{
  history: History;
}> = (props) => {
  return (
    <li className={style.pointItem}>
      <div className={style.item}>
        <img src={saving} alt="포인트 적립" />
      </div>
      <div className={`${style.item} ${style.shop}`}>
        <p>{props.history.storeName}</p>
        <time>{props.history.timeStamp}</time>
      </div>
      <div className={`${style.item} ${style.point}`}>
        <p>
          {props.history.point > 0 ? "+" : ""}
          {props.history.point}p
        </p>
      </div>
    </li>
  );
};

export default PointItem;
