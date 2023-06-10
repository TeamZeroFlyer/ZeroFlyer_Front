import React from "react";

import style from "./PartTimeList.module.css";

const PartTimeList: React.FC<{
  ea: number;
}> = (props) => {
    
  const inputRender = () => {
    if (props.ea > 0) {
      const result = [];
      for (let i = 0; i < props.ea; i++) {
        result.push(
          <li key={i} className={style.list}>
            <input type="text" className={`${style.name} ${style.left}`} />
            <input type="text" className={`${style.phone} ${style.right}`} />
          </li>
        );
      }
      return result;
    }
  };

  return (
    <div className={style.partTimeList}>
      <p className={style.title}>알바생 추가</p>
      <div className={style.contents}>
        <div className={style.requirement}>
          <p className={`${style.label} ${style.left}`}>
            <span>*</span>이름
          </p>
          <p className={`${style.label} ${style.right}`}>
            <span>*</span>전화번호
          </p>
        </div>
        <div>
          <ul>
            {/* <li className={style.list}>
              <input type="text" className={`${style.name} ${style.left}`} />
              <input type="text" className={`${style.phone} ${style.right}`} />
            </li> */}
            {inputRender()}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PartTimeList;
