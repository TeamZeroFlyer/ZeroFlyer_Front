import { useParams } from 'react-router-dom';
import style from "./EditFlyer.module.css";
import { KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface Flyer {
    flyerCode: number;
    flyerTitle: string;
    storeName: string;
    startDate: string;
    endDate: string;
    address: string;
    detailAddress: string;
    hashTag: string[];
    hasCoupon: boolean;
    phone: string;
    startTime: string;
    closeTime: string;
    imgSrc: string;
    qrNum: number;
    qrTotalViewCount: number;
}

const EditFlyer = () => {
    const { flyerCode } = useParams();
    const [imgFile, setImgFile] = useState('/public/icons/camera.svg');
    const imgRef = useRef<HTMLInputElement>(null);
    const tag = useRef<HTMLInputElement>(null);
    const [hashTag, setHashTag] = useState(dummy.hashTag);
    document.querySelector("body")!.style.backgroundColor = "#f5f5f5";
    useEffect(()=>{
        if (flyerCode === "new"){

        }else{
            // TODO: flyerCode로 flyer정보 불러오기
            setImgFile(dummy.imgSrc);
        }
    }, []);

    // 이미지 업로드 input의 onChange
    const saveImgFile = () => {
        const file = imgRef.current!.files![0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImgFile(reader.result as string);
        };
    };

    const enterTag: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if(hashTag.length >= 3){
            window.alert('태그는 최대 3개 등록 가능합니다.');
            tag.current!.value = '';
        }
        if(event.key === 'Enter' && tag.current!.value !== ''){
          tag.current!.blur();
          let tmpArr = Array.from(hashTag);
          tmpArr.push(tag.current!.value);
          setHashTag(tmpArr);
          tag.current!.value = '';
        }
      };

      const removeTag = (i: number) => {
        setHashTag(hashTag.filter((_, index) => index !== i));
      }
    
    return (
        <div className={style.container}>
            <div className={style.header}>
                <div className={style.title}>전단지 추가</div>
                
                    <div className={style.cancel}><Link to="/flyer">취소</Link></div>
                
                <div className={style.complete}>완료</div>
            </div>
            <div className={style.infoTitle}>
                전단지 정보
            </div>

            <div className={style.twoInput}>
                <label className="signup-profileImg-label" htmlFor="profileImg">
                <div className={style.uploadImg}>
                    <img className={style.uploadThumbnail} src={imgFile}/>
                    <input onChange={saveImgFile} ref={imgRef} className="signup-profileImg-input" type="file" accept="image/*" id="profileImg" hidden/>
                </div>
                </label>
                <div className={style.colInput}>
                    <div className={style.nick}><span className={style.star}>* </span>전단지 별명</div>
                    <input className={style.searchBox} minLength={1} maxLength={10} placeholder={dummy.flyerTitle}/>
                    <div className={style.nick2}><span className={style.star}>* </span>유효기간</div>
                    <div className={style.validDate}>
                        <input className={style.date} type="date"/>
                        <input className={style.date2} type="date"/>
                    </div>
                </div>
            </div>

            <div className={style.forTag}>
                <div className={style.tagInfo}>태그 (최대 3개)</div>
                <input ref={tag} onKeyUpCapture={enterTag} className={style.searchBox2} minLength={1} maxLength={6} placeholder='# 키워드 입력 후 enter'/>
                <div>
                    {hashTag.length === 0 && <span className={style.noHashTag}>ex) #합리적인가격</span>}
                    {hashTag.map((hashtag, i) => (
                        <span className={style.storeHashtag} onClick={()=>{removeTag(i)}}>#{hashtag}</span>
                    ))}
                </div>
            </div>

            <div className={style.infoTitle}>
                사업장 정보
            </div>
            <div className={style.storeName}><span className={style.star}>* </span>상호명</div>
            <input className={style.searchBox2} minLength={1} maxLength={10} placeholder={dummy.storeName}/>
            <div className={style.storeName}><span className={style.star}>* </span>주소</div>
            <input className={style.searchBox3} minLength={1} maxLength={10} placeholder={dummy.address}/>
            <input className={style.searchBox2} minLength={1} maxLength={10} placeholder={dummy.detailAddress}/>
            <div className={style.numBox}>
                <div className={style.boxInner1}>
                    <div className={style.storeName}><span className={style.star}>* </span>전화번호</div>
                    <input className={style.searchBox3} minLength={1} maxLength={10} placeholder={dummy.phone}/>
                </div>
                <div className={style.boxInner2}>
                    <div className={style.storeName}><span className={style.star}>* </span>영업시간</div>
                    <input className={style.searchBox3} minLength={1} maxLength={10} placeholder={`${dummy.startTime.substring(0, 2) + ":" + dummy.startTime.substring(2)}~${dummy.closeTime.substring(0, 2) + ":" + dummy.closeTime.substring(2)}`}/>
                </div>
            </div>
        </div>
    );
}

export default EditFlyer;

let dummy: Flyer = {
    flyerCode: 0,
    flyerTitle: "첫 방문 고객 할인",
    storeName: "새싹미용실",
    startDate: "20230522",
    endDate: "20230630",
    address: "새싹시 새싹동 12번지",
    detailAddress: "12동 191호",
    hashTag: ["합리적인가격", "여기가최고"],
    hasCoupon: true,
    phone: "010-1234-5678",
    startTime: "0700",
    closeTime: "2400",
    imgSrc: "/public/flyer/flyerExample.png",
    qrNum: 2,
    qrTotalViewCount: 172,
}