import style from "./EditStore.module.css";
import { KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDaumPostcodePopup } from 'react-daum-postcode';

interface Store {
    storeName: string;
    storeDescription: string;
    address: string;
    detailAddress: string;
    hashTag: string;
    phone: string;
    startTime: string;
    closeTime: string;
}
interface Address{
    roadAddress: string;
}


const EditStore = () => {
    let tmpHash: string[] = [];
    dummy.hashTag.split('#').map((item, _) => {
        tmpHash.push(item);
    });
    if (tmpHash.length >0){
        tmpHash.splice(0, 1);
    }

    const tag = useRef<HTMLInputElement>(null);
    const [hashTag, setHashTag] = useState(tmpHash);
    const open = useDaumPostcodePopup("https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");

    let storeName: HTMLInputElement;
    let readAddress: HTMLInputElement;
    let detailAddress: HTMLInputElement;
    let storeDescription: HTMLInputElement;
    let phone: HTMLInputElement;
    let timeStr: HTMLInputElement;
    let lat: number;
    let lng: number;
    useEffect(()=>{
        storeName = (document.getElementById('storeName') as HTMLInputElement);
        readAddress = (document.getElementById('roadAddress') as HTMLInputElement);
        detailAddress = (document.getElementById('detailAddress') as HTMLInputElement);
        storeDescription = (document.getElementById('storeDescription') as HTMLInputElement);
        phone = (document.getElementById('phone') as HTMLInputElement);
        timeStr = (document.getElementById('timeStr') as HTMLInputElement);
        getLatLng(dummy.address);

        storeName.value = dummy.storeName;
        readAddress.value = dummy.address;
        detailAddress.value = dummy.detailAddress;
        storeDescription.value = dummy.storeDescription;
        phone.value = dummy.phone;
        timeStr.value = dummy.startTime.substring(0, 2) + ":" + dummy.startTime.substring(2) + "~" + dummy.closeTime.substring(0, 2) + ":" + dummy.closeTime.substring(2);
    }, []);

    const enterTag: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if(hashTag.length >= 3){
            window.alert('태그는 최대 3개 등록 가능합니다.');
            tag.current!.value = '';
        }
        if(event.key === 'Enter' && tag.current!.value !== ''){
          tag.current!.blur();
          let tmpArr = Array.from(hashTag);
          if(!tag.current!.value.includes('#')){
              tmpArr.push(tag.current!.value);
          }else{
            alert('해시태그는 #을 제외하고 입력해주세요.');
          }
          setHashTag(tmpArr);
          tag.current!.value = '';
        }
      };

    const removeTag = (i: number) => {
    setHashTag(hashTag.filter((_, index) => index !== i));
    }
    const handleClick = () => {
        open({ onComplete: handleComplete });
      };
    const handleComplete = (data: Address) => {
        const add: HTMLInputElement = document.getElementById('roadAddress') as HTMLInputElement;
        if(add){
            add.value = data.roadAddress;

            getLatLng(data.roadAddress);
        }
    };
    const getLatLng = (add: string) => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_API_KEY}&autoload=false`;
        document.head.appendChild(script);
        script.onload = () => {
          new window.kakao.maps.services.Geocoder().addressSearch(add, function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
                lat = parseFloat(result[0].y);
                lng = parseFloat(result[0].x);
            }
          })
        };
        script.remove();
    };
    const submit = () => {
        const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]~(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!regex.test(timeStr.value)) {
            alert('영업시간은 00:00~23:59 형식으로 입력해주세요.');
            return;
        }

        if (storeName.value === '' || readAddress.value === '' || detailAddress.value === '' || storeDescription.value === '' || phone.value === '' || timeStr.value === '' || '#' + hashTag.join('#') === '#') {
            alert('빈칸을 모두 채워주세요.');
            return;
        }

        fetch("https://qrecode-back.shop/store/setstatus", {
            method: "POST",
            headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
            storeName: storeName.value,
            address: readAddress.value,
            detailAddress: detailAddress.value,
            lat: lat,
            lng: lng,
            storeDescription: storeDescription.value,
            phone: phone.value,
            startTime: timeStr.value.substring(0, 2) + timeStr.value.substring(3, 5),
            closeTime: timeStr.value.substring(6, 8) + timeStr.value.substring(9, 11),
            hashTag: '#' + hashTag.join('#')
            })
        })
            .then(response => {
                if(!response.ok){
                    alert("실패하였습니다. 다시 시도해주세요.");
                    window.location.href = "/setting";
                }
            return response.json()
            })
            .then(data => {
            if( data.data === "success" ){
                alert("저장되었습니다.");
                window.location.href = "/setting";
            }})
            .catch(_ => {
                alert("실패하였습니다. 다시 시도해주세요.");
                window.location.href = "/setting";
            })
    };
    
    return (
        <>
        <div className={style.container}>
            <div className={style.header}>
                <div className={style.title}>사업장 정보</div>
                    <div className={style.cancel}><Link to="/setting">취소</Link></div>
                <div onClick={()=>submit()} className={style.complete}>완료</div>
            </div>
            <div className={style.storeName}><span className={style.star}>* </span>상호명</div>
            <input id="storeName"  className={style.searchBox2} minLength={1} maxLength={10}/>
            <div className={style.storeName}><span className={style.star}>* </span>주소</div>
            <input id="roadAddress" onClick={()=>{handleClick()}} readOnly className={style.searchBox3}/>
            <input id="detailAddress"  className={style.searchBox2} minLength={1} maxLength={10}/>
            <div className={style.numBox}>
                <div className={style.boxInner1}>
                    <div className={style.storeName}><span className={style.star}>* </span>전화번호</div>
                    <input id="phone"  className={style.searchBox3} minLength={1} maxLength={10}/>
                </div>
                <div className={style.boxInner2}>
                    <div className={style.storeName}><span className={style.star}>* </span>영업시간</div>
                    <input id="timeStr" className={style.searchBox3} minLength={1} maxLength={10}/>
                </div>
            </div>
            <div className={style.storeName}><span className={style.star}>* </span>한줄 설명</div>
            <textarea id="storeDescription" className={style.twolinebox} minLength={1} maxLength={40}></textarea>
            <div className={style.forTag}>
                <div className={style.tagInfo}>태그 (최대 3개)</div>
                <input ref={tag} onKeyUpCapture={enterTag} className={style.searchBox2} minLength={1} maxLength={6} placeholder='키워드 입력 후 Enter'/>
                <div>
                    {hashTag.length === 0 && <span className={style.noHashTag}>ex) #합리적인가격</span>}
                    {hashTag.map((hashtag, i) => (
                        <span key={i} className={style.storeHashtag} onClick={()=>{removeTag(i)}}>#{hashtag}</span>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
}

export default EditStore;

let dummy: Store = {
    storeName: "새싹미용실",
    storeDescription: "미용실입니다~",
    address: "서울 강서구 강서로 266",
    detailAddress: "12동 191호",
    hashTag: "#합리적인가격#여기가최고",
    phone: "010-1234-5678",
    startTime: "0700",
    closeTime: "2300",
}