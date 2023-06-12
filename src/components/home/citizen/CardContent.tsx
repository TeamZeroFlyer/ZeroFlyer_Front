import style from "./CardContent.module.css";
import React from "react";
import co2Img from "../../../../public/image/home/co2.svg";
import treesImg from "../../../../public/image/home/trees.svg";

const CardContent: React.FC<{
  label: string;
  value: number;
}> = (props) => {
  return (
    <div className={style.cardContent}>
      <div className={style.img}>
        <img src={props.label === "co2" ? co2Img : treesImg} alt="" />
      </div>
      <div className={style.info}>
        <p className={style.label}>
          {props.label === "co2" ? "탄소 저감량" : "심어진 나무"}
        </p>
        <p className={style.value}>
          {props.label === "co2" ? `${co2Fomatter(props.value)}g` : `${props.value} 그루`}
        </p>
      </div>
    </div>
  );
};

function co2Fomatter(number: number) {
  console.log(number)
  const formattedNumber = String(Math.floor(number)).padStart(8, "0");
  const parts = [];
  for (let i = formattedNumber.length - 1; i >= 0; i -= 3) {
    const part = formattedNumber.slice(Math.max(0, i - 2), i + 1);
    parts.unshift(part);
  }
  return parts.join(",");
}

export default CardContent;
