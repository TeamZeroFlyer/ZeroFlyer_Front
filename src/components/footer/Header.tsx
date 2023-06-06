import { ReactNode } from "react";
import style from "./Footer.module.css";

interface HeaderProps {
    children: ReactNode;
  }

const Header: React.FC<HeaderProps> = ({ children }) => {
    return(
        <div className={style.titleBox}>{children}</div>
    )
}

export default Header;