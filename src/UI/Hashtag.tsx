import React from "react";

import style from "./Hashtag.module.css";

const Hashtag: React.FC<{ children: React.ReactNode }> = (props) => {
  return <div className={style.hashtag}>{props.children}</div>;
};

export default Hashtag;
