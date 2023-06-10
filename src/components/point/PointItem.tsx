import React from "react";

import style from "./PointItem.module.css";
import saving from "../../../public/image/point_history/saving.svg";
import { History } from "../../pages/Point";

const PointItem: React.FC<{
  history: History
}> = (props) => {
  return (
    <li className={style.pointItem}>
      <div className={style.item}>
        <img src={saving} alt="포인트 적립" />
      </div>
      <div className={`${style.item} ${style.shop}`}>
        <p>{props.history.store}</p>
        <time>{formatDate(props.history.date)}</time>
      </div>
      <div className={`${style.item} ${style.point}`}>
        <p>{ props.history.point.operator}{props.history.point.value}p</p>
      </div>
    </li>
  );
};

export default PointItem;

const formatDate = (date:Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}.${month}.${day} ${hours}:${minutes}`;
}

