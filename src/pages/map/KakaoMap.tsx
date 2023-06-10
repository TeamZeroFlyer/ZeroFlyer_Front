import { useState, useEffect, useRef, KeyboardEventHandler } from "react";
import { Map, MapMarker, useInjectKakaoMapApi } from "react-kakao-maps-sdk";
import style from "./KakaoMap.module.css";
import { Outlet } from 'react-router-dom';
import useGeoLocation from "../../hooks/useGeolocation";
import ModalPortal from "../../components/map/ModalPortal";
import { CSSTransition } from "react-transition-group";
import StoreInformation from "../../components/map/StoreInfomation";

interface Store {
  latlng: {lat: number; lng: number;};
  storeName: string;
  startTime: string;
  closeTime: string;
  address: string;
  hashTag: string[];
  hasCoupon: boolean;
  storeDescription: string;
}
const KakaoMap = () => {
  const location = useGeoLocation();  // 외부 훅 컴포넌트에서 받아온 위치정보
  const [showModal, setShowModal] = useState(false);
  const [showModalOne, setShowModalOne] = useState(false);
  const [center, setCenter] = useState({lat: 37.575813, lng: 126.976849});
  const [level, setLevel] = useState(4);
  const [isFlyer, setIsFlyer] = useState(true);
  const [flyerUrl, setFlyerUrl] = useState('/public/image/greenFlyer.svg');
  const [couponUrl, setCouponUrl] = useState('/public/image/whiteCoupon.svg');
  const [oneStore, setOneStore] = useState<Store>({latlng: {lat: 0,lng: 0}, storeName: '', startTime: '', closeTime: '', address: '', hashTag: [''], hasCoupon: true, storeDescription: ''});
  const { loading, error } = useInjectKakaoMapApi({ appkey: import.meta.env.VITE_KAKAO_API_KEY, libraries: ['services'] });
  const search = useRef<HTMLInputElement>(null);
  const [stores, setStores] = useState<Store[]>([]); // 초기 좌표 기준으로 설정해두기
  // 위치정보 불러와지는 것 감시한 뒤 이동시키기
  useEffect(()=>{
    setCenter({ lat: location.loaded ? location.coordinates!.lat : 37.575813, lng: location.loaded ? location.coordinates!.lng : 126.976849 });
    setLevel(4);
  }, [location.loaded]);

  // TODO: 지도의 중심좌표에 따라 서버에 주변 점포 요청해서 set해주기
  useEffect(()=>{
    let dummy: Store[] = [];
    fetch("https://qrecode-back.shop/map/stores?lat=" + center.lat + "&lng=" + center.lng, {
      method: "GET",
      headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
      "Content-Type": "application/json"
      }
      }).then(response => {
      return response.json()
      })
      .then(data => {
        data.data.map((store: any) => {
          let tmp = store.storeTag.split("#");
          tmp.splice(0,1);
          let tmpdata: Store = {
            latlng: {lat: store.storeLat, lng: store.storeLong},
            storeName: store.storeName,
            startTime: store.storeStart.substring(1, 3) + store.storeStart.substring(3, 5),
            closeTime: store.storeStart.substring(1, 3) + store.storeStart.substring(3, 5),
            address: data.storeAddress.split("/")[0],
            hashTag: tmp,
            hasCoupon: true,
            storeDescription: "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요"
          };
          dummy.push(tmpdata);
        });
      })

    setStores(dummy);
    const span = document.getElementById("root")!.querySelectorAll("span");
    for(var i = 0; i < span.length; i++){
      const parent = span[i]?.parentElement;
      const grandFa = parent?.parentElement;
      grandFa!.style.border = "none";
      grandFa!.style.background = "none";
      const sibling = parent?.previousElementSibling;
      if (sibling) {
        grandFa?.removeChild(sibling);
      }
      if(level > 4){
        span[i].style.display = "none";
      }else{
        span[i].style.display = "block";
      }
    }
  }, [center, isFlyer, level]);
  
  if (loading || error) return <></>;

  const onClickHandler = () => { setShowModal(false) };
  const onClickHandlerOne = () => { setShowModalOne(false) };
  const onClickCenterMove = (center: {lat: number, lng: number}) => { setShowModal(false); setShowModalOne(false); setCenter(center); setLevel(4); };
  const changeToFlyer = () => {
    if (!isFlyer){
      setIsFlyer(true);
      setFlyerUrl('/public/image/greenFlyer.svg');
      setCouponUrl('/public/image/whiteCoupon.svg');
    }
  };
  const changeToCoupon = () => {
    if (isFlyer){
      setIsFlyer(false);
      setFlyerUrl('/public/image/whiteFlyer.svg');
      setCouponUrl('/public/image/greenCoupon.svg');
    }
  };
  const getLocation = () => {
    if(location.loaded){
      setCenter({lat: location.coordinates!.lat, lng: location.coordinates!.lng});
      setLevel(4);
    }else{
      window.location.reload();
    }
  };
  const getModalOneInfo = (i: number) => {
    setOneStore(stores[i]);
    setShowModalOne(true);
  }
  const enterSearch: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if(event.key === 'Enter' && search.current!.value !== ''){
      search.current!.blur();
      // TODO: search.current!.value 연관검색어 리스트 서버에 받아와서 아래 set 해주기
      // setStores(searchResult);
      setShowModal(true);
    }
  };

  return (
    <>
    <div className={style.map}>
      <Map center={center} style={{ width: "100%", height: "100%" }} level={level} onZoomChanged={(map) => {setLevel(map.getLevel()); setCenter({ lat: map.getCenter().getLat(), lng: map.getCenter().getLng() });} } onDragEnd={(map) => setCenter({ lat: map.getCenter().getLat(), lng: map.getCenter().getLng() })}>
        {stores.map((position, i) => (
          <MapMarker key={`${position.storeName}-${position.latlng.lat}-${position.latlng.lng}`} position={position.latlng} image={{ src: "/public/image/mapMarker.png", size: { width: 27.73, height: 33 }}} onClick={() => getModalOneInfo(i)}>
            <span className={style.markerName}>{position.storeName}</span>
          </MapMarker>
        ))}
      </Map>
    </div>
    <div className={style.divForShadow}/>
    <input className={style.searchBox} placeholder="가게 이름을 검색하세요" ref={search} onKeyUpCapture={enterSearch}/>
    <img src="/public/image/searchIcon.svg" className={style.searchIcon}/>
    <img src={flyerUrl} className={style.flyer} onClick={() => changeToFlyer()} />
    <img src={couponUrl} className={style.coupon} onClick={() => changeToCoupon()} />
    <img src="/public/image/findMyGeo.svg" className={style.findMyGeo} onClick={() => getLocation()} />
    <img src="/public/image/slideUpBtn.svg" className={style.slideUpBtn} onClick={() => setShowModal(true)} />
    <ModalPortal show={showModal} onClick={onClickHandler}>
        <CSSTransition mountOnEnter unmountOnExit in={showModal} timeout={{ enter: 300, exit: 300 }} classNames="modal">
          <div className="modal">
          <img src="/public/image/modalHandle.svg" className={style.modalHandle}/>
          {stores.map((store, i) => (
            <StoreInformation key={i} store={store} last={stores.length === i + 1 ? true : false} move = {onClickCenterMove}/>
          ))}
          </div>
        </CSSTransition>
    </ModalPortal>
    <ModalPortal show={showModalOne} onClick={onClickHandlerOne}>
        <CSSTransition mountOnEnter unmountOnExit in={showModalOne} timeout={{ enter: 300, exit: 300 }} classNames="modal">
          <div className="modalOne">
            <img src="/public/image/modalHandle.svg" className={style.modalHandle}/>
            <StoreInformation store={oneStore} last={true} move = {onClickCenterMove} />
          </div>
        </CSSTransition>
    </ModalPortal>
    <Outlet/>
    </>
  );
}

export default KakaoMap;


// // 서버 연결 전 더미 데이터
// const dummy = [
//   {
//     latlng: {lat: 35.311526, lng: 128.291077},
//     storeName: "새싹미용실12",
//     startTime: "1000",
//     closeTime: "1200",
//     address: "서울시 새싹구 새싹동 새싹로 123길 53",
//     hashTag: ["합리적인가격", "헤어스1파", "두피1클리닉"],
//     hasCoupon: true,
//     storeDescription: "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요"
//   },
//   {
//     latlng: {lat: 35.313526, lng: 128.292077},
//     storeName: "새싹미용실2",
//     startTime: "1000",
//     closeTime: "1900",
//     address: "서울시 새싹구 새싹동 새싹로 123길 53",
//     hashTag: ["합리적인가격", "헤어2스파", "두피클리2닉"],
//     hasCoupon: true,
//     storeDescription: "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요"
//   },
//   {
//     latlng: {lat: 35.315526, lng: 128.291077},
//     storeName: "새싹미용실3",
//     startTime: "1000",
//     closeTime: "2400",
//     address: "서울시 새싹구 새싹동 새싹로 123길 53",
//     hashTag: ["합리적인가격", "헤어3스파", "두피클3리닉"],
//     hasCoupon: true,
//     storeDescription: "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요"
//   },
//   {
//     latlng: {lat: 35.317526, lng: 128.296077},
//     storeName: "새싹미용실4",
//     startTime: "1000",
//     closeTime: "1100",
//     address: "서울시 새싹구 새싹동 새싹로 123길 53",
//     hashTag: ["합리적인가격", "헤어4스파", "두피클4리닉"],
//     hasCoupon: true,
//     storeDescription: "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요"
//   },
//   {
//     latlng: {lat: 35.319526, lng: 128.292077},
//     storeName: "새싹미용실5",
//     startTime: "1000",
//     closeTime: "2400",
//     address: "서울시 새싹구 새싹동 새싹로 123길 53",
//     hashTag: ["합리적인가격", "헤어5스파"],
//     hasCoupon: true,
//     storeDescription: "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요"
//   },
//   {
//     latlng: {lat: 35.321526, lng: 128.297077},
//     storeName: "새싹미용실62",
//     startTime: "1000",
//     closeTime: "1500",
//     address: "서울시 새싹구 새싹동 새싹로 123길 53",
//     hashTag: ["합리적인가격"],
//     hasCoupon: true,
//     storeDescription: "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요"
//   },
//   {
//     latlng: {lat: 35.331526, lng: 128.291077},
//     storeName: "새싹미용실1",
//     startTime: "1000",
//     closeTime: "1200",
//     address: "서울시 새싹구 새싹동 새싹로 123길 53",
//     hashTag: ["합리적인가격", "헤어스1파", "두피1클리닉"],
//     hasCoupon: true,
//     storeDescription: "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요"
//   },
//   {
//     latlng: {lat: 37.4984587, lng: 127.0585077},
//     storeName: "새싹미용실2",
//     startTime: "1000",
//     closeTime: "1900",
//     address: "서울시 새싹구 새싹동 새싹로 123길 53",
//     hashTag: ["합리적인가격", "헤어2스파", "두피클리2닉"],
//     hasCoupon: true,
//     storeDescription: "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요"
//   },
//   {
//     latlng: {lat: 35.335526, lng: 128.291077},
//     storeName: "새싹미용실3",
//     startTime: "1000",
//     closeTime: "2400",
//     address: "서울시 새싹구 새싹동 새싹로 123길 53",
//     hashTag: ["합리적인가격", "헤어3스파", "두피클3리닉"],
//     hasCoupon: true,
//     storeDescription: "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요"
//   },
//   {
//     latlng: {lat: 35.337526, lng: 128.296077},
//     storeName: "새싹미용실4",
//     startTime: "1000",
//     closeTime: "1100",
//     address: "서울시 새싹구 새싹동 새싹로 123길 53",
//     hashTag: ["합리적인가격", "헤어4스파", "두피클4리닉"],
//     hasCoupon: true,
//     storeDescription: "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요"
//   },
//   {
//     latlng: {lat: 35.339526, lng: 128.292077},
//     storeName: "새싹미용실5",
//     startTime: "1000",
//     closeTime: "2400",
//     address: "서울시 새싹구 새싹동 새싹로 123길 53",
//     hashTag: ["합리적인가격", "헤어5스파"],
//     hasCoupon: true,
//     storeDescription: "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요"
//   },
//   {
//     latlng: {lat: 35.331526, lng: 128.297077},
//     storeName: "새싹미용실6",
//     startTime: "1000",
//     closeTime: "1500",
//     address: "서울시 새싹구 새싹동 새싹로 123길 53",
//     hashTag: ["합리적인가격"],
//     hasCoupon: true,
//     storeDescription: "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요"
//   }
// ];