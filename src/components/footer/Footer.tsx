import { useState, useRef, useEffect } from "react";
import style from "./Footer.module.css";
import FooterElement from "./FooterElement";
import FooterWeb from "./FooterWeb";

interface AppProps{
    status: number
}

// 0: 비로그인, 1: 소비자, 2: 광고주
const footerList = [["", "map", "setting"], ["", "flyer", "map", "setting"], ["", "flyer", "qr", "map", "setting"]];

const Footer: React.FC<AppProps> = (props) => {
    const url = window.location.pathname;
    const [now, setNow] = useState(url);
    const footerRef = useRef<HTMLDivElement>(null);
    const isMobile = /Mobi/i.test(window.navigator.userAgent);
    const [status, setStatus] = useState(0);
    // 로그인 구현시 로그인 정보를 불러와 status에 담아준다.
    // 0: 비로그인, 1: 소비자, 2: 광고주
    useEffect(()=>{
        setStatus(props.status);
        // footer element 개수에 따라 간격 조정
        if(footerRef.current){
        footerRef.current.style.gap = `calc((100% - 115px) / ${footerList[status].length})`;
        }
    }, [props.status, status])
    return (
        <>
        { isMobile ?
        <div className={style.footer} ref={footerRef}>
            {footerList[status].map((element, i) => (
                <FooterElement key={i} status={status} imgSrc={element} state={status} now={now} onClick = {()=>{setNow("/" + element);}} />
            ))}
        </div>
        :
        <FooterWeb status={status}/>
            }
        </>
    );
};

export default Footer;