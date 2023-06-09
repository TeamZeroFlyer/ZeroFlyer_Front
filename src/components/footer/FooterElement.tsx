import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import style from "./Footer.module.css";

interface FooterProps{
    imgSrc: string;
    state: number;
    now: string;
    onClick: () => void;
}

const FooterElement: React.FC<FooterProps> = (props) => {
    const [isClicked, setIsClicked] = useState(props.now === "/" + props.imgSrc ? "green" : "gray");
    const navigate = useNavigate();

    // 현재 페이지를 감시하여 색  설정
    useEffect(()=>{
        setIsClicked(props.now === "/" + props.imgSrc ? "green" : "gray");
    }, [props.now]);
    return (
        <img src={`/public/icons/footerIcon/${isClicked}${props.imgSrc === "" ? "home" : props.imgSrc}.svg`} className={style.footerElement} 
        onClick={ ()=>{props.onClick(); navigate(`/${props.imgSrc}`); 
        setIsClicked(window.location.pathname === "/" + props.imgSrc ? "green" : "gray")} }/>
    );
};

export default FooterElement;