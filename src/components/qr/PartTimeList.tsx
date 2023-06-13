import React, { Dispatch, useState } from "react";

import style from "./PartTimeList.module.css";
import { PTJob } from "../../pages/qr/CreateQRCode";

const PartTimeList: React.FC<{
  ea: number;
  onSelectPT: Dispatch<PTJob[]>;
}> = (props) => {
  const [entries, setEntries] = useState<PTJob[]>([]);

  const inputRender = () => {
    if (props.ea > 0) {
      const result = [];
      for (let i = 0; i < props.ea; i++) {
        result.push(
          <li key={i} className={style.list}>
            <input
              name={"ptname" + i}
              type="text"
              className={`${style.name} ${style.left}`}
              onChange={(event) => handleInputChange(event, i, "name")}
              placeholder="이름"
            />
            <input
              name={"ptphone" + i}
              type="text"
              className={`${style.phone} ${style.right}`}
              onChange={(event) => handleInputChange(event, i, "phone")}
              placeholder="000-0000-0000"

            />
          </li>
        );
      }
      return (
        <form>
          {result}
        </form>
      );
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: "name" | "phone"
  ) => {
    const { value } = event.target;
    setEntries((prevEntries) => {
      const updatedEntry = { ...prevEntries[index], [field]: value };
      const updatedEntries = [...prevEntries];
      updatedEntries[index] = updatedEntry;
      return updatedEntries;
    });
    props.onSelectPT(entries);
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
          <ul>{inputRender()}</ul>
        </div>
      </div>
    </div>
  );
};

export default PartTimeList;
