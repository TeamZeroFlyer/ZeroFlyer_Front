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
    },
    last: boolean;
    move: (center: {lat: number, lng: number}) => void;
}

function formatTime(timeString: string) {
    const hours = Math.floor(parseInt(timeString) / 100);
    const minutes = parseInt(timeString) % 100;
    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}`;
    return formattedTime;
}

function isWithinTime(startTime: string, endTime: string){
    const now = new Date();
    const currentHour = now.getHours() * 100 + now.getMinutes();
    return currentHour >= parseInt(startTime) && currentHour < parseInt(endTime);
}

const StoreInformation: React.FC<StoreProps> = (props) => {
    const open = isWithinTime(props.store.startTime, props.store.closeTime);
    return (
        <div className={props.last ? style.storeLastInfo : style.storeInfo} onClick={() => props.move(props.store.latlng)}>
            <div className={props.red ? style.storeTitleRed : style.storeTitle}>{props.store.storeName}</div>
            <div className={style.storeTime}>
                {open ? <img src="/public/image/greenCircle.svg"/> : <img src="/public/image/redCircle.svg"/>}
                <span className={style.storeIsOpen}>
                {open ? "영업중" : "영업종료"}
                </span>
                {formatTime(props.store.startTime)} ~ {formatTime(props.store.closeTime)}
            </div>
            <div className={style.storeAddress}>{props.store.address}</div>
            <div className={style.storeHashtags}>
            {props.store.hashTag.map((hashtag, i) => (
                <span key={i} className={style.storeHashtag}>#{hashtag}</span>
            ))}
            </div>
        </div>
    );
}

export default StoreInformation;