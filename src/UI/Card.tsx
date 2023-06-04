import React, { ReactNode } from "react";

import classes from "./Card.module.css";

const Card: React.FC<{
  children: ReactNode;
  className: string;
}> = (props) => {
  return (
    <div className={`${classes.card} ${props.className}`}>{props.children}</div>
  );
};

export default Card;
