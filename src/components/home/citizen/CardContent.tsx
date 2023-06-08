import style from "./CardContent.module.css";
import React from "react";
const CardContent:React.FC<{
  content: {
    label: string;
    value: string;
  }
}> = (props) => {
  return (
    <div className={style.cardContent}>
      <div className={style.co2}></div>
      <div className={style.info}>
        <p className={style.label}>{ props.content.label}</p>
        <p className={style.value}>{props.content.value}</p>
      </div>
    </div>
  );
};

export default CardContent;
