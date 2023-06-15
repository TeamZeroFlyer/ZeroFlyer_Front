import style from "./StoreInfomation.module.css"

interface StoreProps{
    red: boolean;
    store: {
        latlng: {
        lat: number;
        lng: number;
        };
        storeName: string;
        startTime: string;
        closeTime: string;
        address: string;
        hashTag: string[];
        hasCoupon: boolean;
        storeDescription: string;
    },
    last: boolean;
    move: (center: {lat: number, lng: number}) => void;
}

function isWithinTime(startTime: string, endTime: string){
    const now = new Date();
    const currentHour = now.getHours() * 100 + now.getMinutes();
    return currentHour >= parseInt(startTime.substring(0,2)+startTime.substring(3,5)) && currentHour < parseInt(endTime.substring(0,2)+endTime.substring(3,5));
}

const StoreInformation: React.FC<StoreProps> = (props) => {
    const open = isWithinTime(props.store.startTime, props.store.closeTime);
    const copy = async (address: string) => {
        await navigator.clipboard.writeText(address);
        alert('클립보드에 복사되었습니다.');
    }
    return (
        <div className={props.last ? style.storeLastInfo : style.storeInfo} onClick={() => props.move(props.store.latlng)}>
            <div className={props.red ? style.storeTitleRed : style.storeTitle}>{props.store.storeName}</div>
            <div className={style.storeAddress}>{props.store.address}<img onClick={()=>copy(props.store.address)} className={style.copy} src="https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/main/public/icons/copy.svg"/></div>
            <div className={style.storeTime}>
                {open ? <img src="https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/main/public/image/greenCircle.svg"/> : <img src="https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/main/public/image/redCircle.svg"/>}
                <span className={style.storeIsOpen}>
                {open ? "영업중" : "영업종료"}
                </span>
                {props.store.startTime} ~ {props.store.closeTime}
            </div>
            <div className={style.desc}>
                {props.store.storeDescription}
            </div>
            <div className={style.storeHashtags}>
            {props.store.hashTag.map((hashtag, i) => (
                <span key={i} className={style.storeHashtag}>#{hashtag}</span>
            ))}
            </div>
        </div>
    );
}

export default StoreInformation;