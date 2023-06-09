import { useState, useRef, useEffect } from "react";
import style from "./Footer.module.css";
import FooterElement from "./FooterElement";
import FooterWeb from "./FooterWeb";

// 0: 비로그인, 1: 소비자, 2: 광고주
const footerList = [["home", "map", "setting"], ["home", "point", "flyer", "map", "setting"], ["home", "flyer", "qr", "map", "setting"]];

const Footer = () => {
    const url = window.location.pathname;
    const [now, setNow] = useState(url);
    const footerRef = useRef<HTMLDivElement>(null);
    const isMobile = /Mobi/i.test(window.navigator.userAgent);
    // 로그인 구현시 로그인 정보를 불러와 userState에 담아준다.
    // 0: 비로그인, 1: 소비자, 2: 광고주
    let userState = 1;
    useEffect(()=>{
        // footer element 개수에 따라 간격 조정
        if(footerRef.current){
        footerRef.current.style.gap = `calc((100% - 115px) / ${footerList[userState].length})`;
        }
    }, [])
    return (
        <>
        { isMobile ?
        <div className={style.footer} ref={footerRef}>
            {footerList[userState].map((element, i) => (
                <FooterElement key={i} imgSrc={element} state={userState} now={now} onClick = {()=>{setNow("/" + element);}} />
            ))}
        </div>
        :
        <FooterWeb/>
            }
        </>
    );
};

export default Footer;