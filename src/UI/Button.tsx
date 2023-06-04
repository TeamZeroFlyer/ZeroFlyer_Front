import React from "react";

import style from "./Button.module.css";

type Props = {
  border? : string;
  color? : string;
  children?: React.ReactNode;
  height? : string;
  onClick?: () => void;
  radius?: string
  width?: string;
}

const Button: React.FC<Props> = (props) => {
  return <button
    className={style.button}
    style={{width: props.width, borderRadius: props.radius, color: props.color, borderColor: props.color}}
    onClick={props.onClick}
  >{props.children}</button>;
};

export default Button;
