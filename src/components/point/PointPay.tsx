import React, { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";
import { Link } from "react-router-dom";

import leftArrowImg from "../../../public/icons/leftArrow.svg";
import style from "./PointPay.module.css";

const Barcode: React.FC<{
  value: string;
}> = ({ value }) => {
  const barcodeRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, value, {
        lineColor: "#006C3A",
        displayValue: false,
      });
    }
  }, [value]);

  return <svg ref={barcodeRef}></svg>;
};

const PointPay = () => {
  return (
    <div className={style.container}>
    <div className={style.pointPay}>
      <header className={`${style.head}`}>
        <Link to=".." relative="path" className={style.backspace}>
          <img src={leftArrowImg} />
        </Link>
        <p>포인트 사용</p>
      </header>
      <div className={style.barcode}>
        <Barcode value="anjuhong" />
        <div className={style.info}>
          <p className={style.label}>보유 포인트</p>
          <Link to="history">
            <p className={style.value}>
              3,600<span>p</span>
            </p>
            <img src={leftArrowImg} className={style.payBackspace} />
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default PointPay;
