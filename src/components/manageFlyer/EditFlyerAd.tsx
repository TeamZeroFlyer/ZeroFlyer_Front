import { useParams } from 'react-router-dom';
import style from "./EditFlyerAd.module.css";
import { KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// interface Flyer {
//     flyerCode: number;
//     flyerTitle: string;
//     startDate: string;
//     endDate: string;
//     hashTag: string;
//     hasCoupon: boolean;
//     imgSrc: string;
// }

interface Store {
    storeName: string;
    address: string;
    detailAddress: string;
    phone: string;
    time: string;
}

const EditFlyerAd = () => {
    // let tmpHash: string[] = [];
    // dummy.hashTag.split('#').map((item, _) => {
    //     tmpHash.push(item);
    // });
    // if (tmpHash.length >0){
    //     tmpHash.splice(0, 1);
    // }
    const { flyerCode } = useParams();
    const [imgFile, setImgFile] = useState('https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/9be89183664a4898914b84dece371161ba044478/public/icons/camera.svg');
    const imgRef = useRef<HTMLInputElement>(null);
    const tag = useRef<HTMLInputElement>(null);
    const [hashTag, setHashTag] = useState<string[]>([]);
    const [checked, setChecked] = useState(false);
    const [store, setStore] = useState<Store>();

    useEffect(()=>{
        fetch("https://qrecode-back.shop/store/info", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
                "Content-Type": "application/json"
                },
            })
            .then(response => {
                return response.json()
            })
            .then(data => {
                // TODO: 가게정보 없으면 백시키기
                setStore({
                    time: data.data.storeStart.substring(0, 2) + data.data.storeStart.substring(2) + "~" + data.data.storeEnd.substring(0, 2)+ data.data.storeEnd.substring(2),
                    phone: data.data.storePhone,
                    detailAddress: data.data.detailAddress,
                    address: data.data.storeAddress,
                    storeName: data.data.storeName,
                });
        });

        if (!(flyerCode === "new")){
            fetch("https://qrecode-back.shop/store/flyer?flyerid=" + flyerCode, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken"),
                    "Content-Type": "application/json"
                    },
                })
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    setImgFile(data.data.flyerUrl);
                    setChecked(data.data.hasCoupon);
                    let tmpHash: string[] = [];
                    data.data.flyerTag.split('#').map((item: string) => {
                        if (item !== ''){
                            tmpHash.push(item);
                        }
                    });
                    setHashTag(tmpHash);
                    (document.getElementById('title') as HTMLInputElement).value = data.data.flyerName;
                    (document.getElementById('start') as HTMLInputElement).value = data.data.flyerStart.substring(0, 4) + "-" + data.data.flyerStart.substring(4, 6) + "-" + data.data.flyerStart.substring(6, 8);
                    (document.getElementById('end') as HTMLInputElement).value = data.data.flyerEnd.substring(0, 4) + "-" + data.data.flyerEnd.substring(4, 6) + "-" + data.data.flyerEnd.substring(6, 8);

            });
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
            let tmpArr: string[] = Array.from(hashTag);
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
    };

    const submit = () => {
        const formData = new FormData();
        const imageInput = document.getElementById('profileImg') as HTMLInputElement;
        const title = (document.getElementById('title') as HTMLInputElement).value;
        const start = (document.getElementById('start') as HTMLInputElement).value;
        const end = (document.getElementById('end') as HTMLInputElement).value;
        let tmpHashTag: string = '';
        hashTag.map((item, _) => {
            tmpHashTag += '#' + item;
        });

        if( flyerCode == "new" && (!imageInput.files || imageInput.files?.length === 0) ){
            alert("이미지를 업로드해주세요.");
            return;
        }

        if ( title == '' || start == '' || end == '' || tmpHashTag == '' ){
            alert("빈칸을 모두 채워주세요.");
            return;
        }

        // 이미지 업로드 필요한 경우
        if(!(!imageInput.files || imageInput.files?.length === 0)){

            formData.append('image', imageInput!.files![0]);
            fetch("https://qrecode-back.shop/store/uploadflyer", {
                method: "POST",
                headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
                },
                body: formData,
            })
            .then(response => {
                if(!response.ok){
                    alert("실패하였습니다. 다시 시도해주세요.");
                }
                // 아래도 리턴 해주기
            return response.json()
            })
            .then(data => {
                // 이미지 업로드 성공 후, 이미지 경로 가지도 전단지 전체정보 업로드
                if (flyerCode === "new"){
                    fetch("https://qrecode-back.shop/store/uploadflyer/info", {
                        method: "POST",
                        headers: {
                        Authorization: "Bearer " + localStorage.getItem("accessToken"),
                        'Content-Type': "application/json",
                        },
                        body: JSON.stringify({
                            "flyerUrl": data.data,
                            "flyerName": (document.getElementById('title') as HTMLInputElement).value,
                            "flyerTag": tmpHashTag,
                            "flyerStart": (document.getElementById('start') as HTMLInputElement).value,
                            "flyerEnd": (document.getElementById('end') as HTMLInputElement).value,
                            "hasCoupon": checked,
                            })
                    })
                    .then(response => {
                        if(!response.ok){
                            alert("실패하였습니다. 다시 시도해주세요.");
                        }
                    return response.json()
                    })
                    .then(data => {
                        if (data.data == "success"){
                            alert("전단지가 등록되었습니다.");
                            window.location.href = "/flyer";
                        }
                    });
                }else{
                    fetch("https://qrecode-back.shop/store/updateflyer/info?flyerid="+flyerCode, {
                        method: "POST",
                        headers: {
                        Authorization: "Bearer " + localStorage.getItem("accessToken"),
                        'Content-Type': "application/json",
                        },
                        body: JSON.stringify({
                            "flyerUrl": data.data,
                            "flyerName": (document.getElementById('title') as HTMLInputElement).value,
                            "flyerTag": tmpHashTag,
                            "flyerStart": (document.getElementById('start') as HTMLInputElement).value,
                            "flyerEnd": (document.getElementById('end') as HTMLInputElement).value,
                            "hasCoupon": checked,
                            })
                    })
                    .then(response => {
                        if(!response.ok){
                            alert("실패하였습니다. 다시 시도해주세요.");
                        }
                    return response.json()
                    })
                    .then(data => {
                        if (data.data == "success"){
                            alert("전단지가 수정되었습니다.");
                            window.location.href = "/flyer";
                        }
                    });
                    }
            })

            // 이미지 수정 안한 수정의 경우
        } else{

            fetch("https://qrecode-back.shop/store/updateflyer/info?flyerid="+flyerCode, {
                method: "POST",
                headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
                'Content-Type': "application/json",
                },
                body: JSON.stringify({
                    "flyerUrl": null,
                    "flyerName": (document.getElementById('title') as HTMLInputElement).value,
                    "flyerTag": tmpHashTag,
                    "flyerStart": (document.getElementById('start') as HTMLInputElement).value,
                    "flyerEnd": (document.getElementById('end') as HTMLInputElement).value,
                    "hasCoupon": checked,
                    })
            })
            .then(response => {
                if(!response.ok){
                    alert("실패하였습니다. 다시 시도해주세요.");
                }
            return response.json()
            })
            .then(data => {
                if (data.data == "success"){
                    alert("전단지가 수정되었습니다.");
                    window.location.href = "/flyer";
                }
            });

        }
    };
    
    const removeFlyer = (idx: number) => {
        const token = localStorage.getItem("accessToken");

        //TODO: 서버켜지면 적용확인
        fetch("https://qrecode-back.shop/store/delete?idx=" + idx, {
            method: "DELETE",
            headers: {
              Authorization: "Bearer " + token,
            }
          })
            .then(response => {
              return response.json()
            })
            .then(data => {
                if(data.data === "success"){
                    alert("전단지가 삭제되었습니다.");
                    window.location.href = "/flyer";
                }
            });
    };
    
    return (
        <div className={style.container}>
            <div className={style.header}>
                <div className={style.title}>전단지 추가</div>
                
                    <div className={style.cancel}><Link to="/flyer">취소</Link></div>
                
                <div onClick={()=> submit()} className={style.complete}>완료</div>
            </div>
            <div className={style.infoTitle}>
                <div>전단지 정보</div>
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
                    <input id='title' className={style.searchBox} minLength={1} maxLength={10} placeholder="ex) 첫 방문 고객 할인"/>
                    <div className={style.nick2}><span className={style.star}>* </span>유효기간</div>
                    <div className={style.validDate}>
                        <input id='start' className={style.date} type="date"/>
                        <input id='end' className={style.date2} type="date"/>
                    </div>
                </div>
            </div>

            <div className={style.forTag}>
                <div className={style.tagInfo}>태그 (최대 3개, 6글자)</div>
                <input ref={tag} onKeyUpCapture={enterTag} className={style.searchBox2} minLength={1} maxLength={6} placeholder='키워드 입력 후 Enter'/>
                <div>
                    {hashTag.length === 0 && <span className={style.noHashTag}>ex) #합리적인가격</span>}
                    {hashTag.map((hashtag, i) => (
                        <span key={i} className={style.storeHashtag} onClick={()=>{removeTag(i)}}>#{hashtag}</span>
                    ))}
                </div>
            </div>

            <div className={style.box} onClick={()=>checked ? setChecked(false) :  setChecked(true)}>
                    <img className={style.check} src={checked ? `https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/9be89183664a4898914b84dece371161ba044478/public/image/checkedBox.svg` : `https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/9be89183664a4898914b84dece371161ba044478/public/image/checkBox.svg`} />
                    쿠폰포함
            </div>

            <div className={style.infoTitle}>
                사업장 정보
            </div>
            <div className={style.storeName}><span className={style.star}>* </span>상호명</div>
            <input readOnly className={style.searchBox2} minLength={1} maxLength={10} placeholder={store?.storeName}/>
            <div className={style.storeName}><span className={style.star}>* </span>주소</div>
            <input readOnly className={style.searchBox3} minLength={1} maxLength={10} placeholder={store?.address}/>
            <input readOnly className={style.searchBox2} minLength={1} maxLength={10} placeholder={store?.detailAddress}/>
            <div className={style.numBox}>
                <div className={style.boxInner1}>
                    <div className={style.storeName}><span className={style.star}>* </span>전화번호</div>
                    <input readOnly className={style.searchBox3} minLength={1} maxLength={10} placeholder={store?.phone}/>
                </div>
                <div className={style.boxInner2}>
                    <div className={style.storeName}><span className={style.star}>* </span>영업시간</div>
                    <input readOnly className={style.searchBox3} minLength={1} maxLength={10} placeholder={store?.time}/>
                </div>
            </div>
            {flyerCode !== "new" && <div className={style.deleteBtn} onClick={()=>removeFlyer(parseInt(flyerCode!))}>전단지삭제</div>}
        </div>
    );
}

export default EditFlyerAd;

// let dummy: Flyer = {
//     flyerCode: 0,
//     flyerTitle: "첫 방문 고객 할인",
//     startDate: "20230522",
//     endDate: "20230630",
//     hashTag: "#합리적인가격#여기가최고",
//     hasCoupon: true,
//     imgSrc: "https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/9be89183664a4898914b84dece371161ba044478/public/flyer/flyerExample.png",
// }

// let dummy2: Store = {
//     time: "0700",
//     phone: "010-1234-5678",
//     detailAddress: "12동 191호",
//     address: "새싹시 새싹동 12번지",
//     storeName: "새싹미용실",
// }