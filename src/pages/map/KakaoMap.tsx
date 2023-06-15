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
  const [flyerUrl, setFlyerUrl] = useState('https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/main/public/image/greenFlyer.svg');
  const [couponUrl, setCouponUrl] = useState('https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/main/public/image/whiteCoupon.svg');
  const [oneStore, setOneStore] = useState<Store>({latlng: {lat: 0,lng: 0}, storeName: '', startTime: '', closeTime: '', address: '', hashTag: [''], hasCoupon: true, storeDescription: ''});
  const { loading, error } = useInjectKakaoMapApi({ appkey: import.meta.env.VITE_KAKAO_API_KEY, libraries: ['services'] });
  const search = useRef<HTMLInputElement>(null);
  const [stores, setStores] = useState<Store[]>([]); // 초기 좌표 기준으로 설정해두기
  // 위치정보 불러와지는 것 감시한 뒤 이동시키기
  useEffect(()=>{
    setCenter({ lat: location.loaded ? location.coordinates!.lat : 37.575813, lng: location.loaded ? location.coordinates!.lng : 126.976849 });
    setLevel(4);
  }, [location.loaded]);

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
            latlng: {lat: store.storeLat, lng: store.storeLng},
            storeName: store.storeName,
            startTime: store.storeStart,
            closeTime: store.storeEnd,
            address: store.storeAddress.split("/")[0],
            hashTag: tmp,
            hasCoupon: store.hasCoupon,
            storeDescription: store.storeDescription,
          };
          dummy.push(tmpdata);
          console.log(dummy)
        });
        setStores(dummy);
      });
  }, [center, isFlyer, level]);

  useEffect(()=>{
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
  }, [stores]);
  
  if (loading || error) return <></>;

  const onClickHandler = () => { setShowModal(false) };
  const onClickHandlerOne = () => { setShowModalOne(false) };
  const onClickCenterMove = (center: {lat: number, lng: number}) => { setShowModal(false); setShowModalOne(false); setCenter(center); setLevel(4); };
  const changeToFlyer = () => {
    if (!isFlyer){
      setIsFlyer(true);
      setFlyerUrl('https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/main/public/image/greenFlyer.svg');
      setCouponUrl('https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/main/public/image/whiteCoupon.svg');
    }
  };
  const changeToCoupon = () => {
    if (isFlyer){
      setIsFlyer(false);
      setFlyerUrl('https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/main/public/image/whiteFlyer.svg');
      setCouponUrl('https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/main/public/image/greenCoupon.svg');
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
      changeToFlyer();
      let dummy: Store[] = [];
      fetch("https://qrecode-back.shop/map/search?keyword=" + search.current!.value, {
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
            if(store.storeTag === null) store.storeTag = "";
            let tmp = store.storeTag.split("#");
            tmp.splice(0,1);
            let tmpdata: Store = {
              latlng: {lat: store.storeLat, lng: store.storeLng},
              storeName: store.storeName,
              startTime: store.storeStart,
              closeTime: store.storeEnd,
              address: store.storeAddress.split("/")[0],
              hashTag: tmp,
              hasCoupon: store.hasCoupon,
              storeDescription: store.storeDescription,
            };
            dummy.push(tmpdata);
          });
          setStores(dummy);
          search.current!.value = '';
        });
      setShowModal(true);
    }
  };

  return (
    <>
    <div className={style.map}>
      <Map center={center} style={{ width: "100%", height: "100%" }} level={level} onZoomChanged={(map) => {setLevel(map.getLevel()); setCenter({ lat: map.getCenter().getLat(), lng: map.getCenter().getLng() });} } onDragEnd={(map) => setCenter({ lat: map.getCenter().getLat(), lng: map.getCenter().getLng() })}>
        {stores.map((position, i) => (
          isFlyer ? <MapMarker key={`${position.storeName}-${position.latlng.lat}-${position.latlng.lng}`} position={position.latlng} image={{ src: "https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/main/public/image/mapMarker.svg", size: { width: 48, height: 48 }}} onClick={() => getModalOneInfo(i)}>
            <span className={!isFlyer && !position.hasCoupon ? style.markerNameNo : style.markerName}>{position.storeName}</span>
          </MapMarker>
          :
          position.hasCoupon && <MapMarker key={`${position.storeName}-${position.latlng.lat}-${position.latlng.lng}`} position={position.latlng} image={{ src: "https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/main/public/image/percTree.svg", size: { width: 48, height: 48 }}} onClick={() => getModalOneInfo(i)}>
            <span className={!isFlyer && !position.hasCoupon ? style.markerNameNo : style.markerName}>{position.storeName}</span>
          </MapMarker>
        ))}
      </Map>
    </div>
    <div className={style.divForShadow}/>
    <input className={style.searchBox} placeholder="가게 이름을 검색하세요" ref={search} onKeyUpCapture={enterSearch}/>
    <img src="https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/main/public/image/searchIcon.svg" className={style.searchIcon}/>
    <img src={flyerUrl} className={style.flyer} onClick={() => changeToFlyer()} />
    <img src={couponUrl} className={style.coupon} onClick={() => changeToCoupon()} />
    <img src="https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/main/public/image/findMyGeo.svg" className={style.findMyGeo} onClick={() => getLocation()} />
    <img src="https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/main/public/image/slideUpBtn.svg" className={style.slideUpBtn} onClick={() => setShowModal(true)} />
    <ModalPortal show={showModal} onClick={onClickHandler}>
        <CSSTransition mountOnEnter unmountOnExit in={showModal} timeout={{ enter: 300, exit: 300 }} classNames="modal">
          <div className="modal">
          <img src="https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/main/public/image/modalHandle.svg" className={style.modalHandle}/>
          {stores.map((store, i) => (
            <StoreInformation key={i} store={store} red={!isFlyer && !store.hasCoupon} last={stores.length === i + 1 ? true : false} move = {onClickCenterMove}/>
          ))}
          </div>
        </CSSTransition>
    </ModalPortal>
    <ModalPortal show={showModalOne} onClick={onClickHandlerOne}>
        <CSSTransition mountOnEnter unmountOnExit in={showModalOne} timeout={{ enter: 300, exit: 300 }} classNames="modal">
          <div className="modalOne">
            <img src="https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/main/public/image/modalHandle.svg" className={style.modalHandle}/>
            <StoreInformation store={oneStore} red={!isFlyer && !oneStore.hasCoupon} last={true} move = {onClickCenterMove} />
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