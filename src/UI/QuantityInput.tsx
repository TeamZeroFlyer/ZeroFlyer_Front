import React from "react";
import style from "./QuantityInput.module.css";

const QuantityInput: React.FC<{
  value: number;
  onNumberChange: React.Dispatch<React.SetStateAction<number>>;
}> = (props) => {
  const decreaseQuantity = () => {
    if (props.value > 1) {
      props.onNumberChange((prev) => prev - 1);
    }
  };

  const increaseQuantity = () => {
    props.onNumberChange((prev) => prev + 1);
  };

  return (
    <div className={style.quantityInput}>
      <span className={style.minus} onClick={decreaseQuantity}>
        -
      </span>
      <span className={style.number}>{props.value}</span>
      <span className={style.plus} onClick={increaseQuantity}>
        +
      </span>
    </div>
  );
};

export default QuantityInput;
