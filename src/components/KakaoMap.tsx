import { useState, useEffect, useRef, KeyboardEventHandler } from "react";
import { Map, MapMarker, useInjectKakaoMapApi } from "react-kakao-maps-sdk";
import style from "./KakaoMap.module.css";
import { Outlet } from 'react-router-dom';
import useGeoLocation from "../hooks/useGeolocation";
import ModalPortal from "./mapModal/ModalPortal";
import { CSSTransition } from "react-transition-group";

interface Store {
  title: string;
  latlng: {
    lat: number;
    lng: number;
  };
}

const KakaoMap = () => {
  const location = useGeoLocation();  // 외부 훅 컴포넌트에서 받아온 위치정보
  const [showModal, setShowModal] = useState(false);
  const [center, setCenter] = useState({ lat: 33.450701, lng: 126.570677 })
  const [isFlyer, setIsFlyer] = useState(true);
  const [flyerUrl, setFlyerUrl] = useState('/public/image/greenFlyer.svg');
  const [couponUrl, setCouponUrl] = useState('/public/image/whiteCoupon.svg');
  const { loading, error } = useInjectKakaoMapApi({
    appkey: import.meta.env.VITE_KAKAO_API_KEY,
    libraries: ['services'],
  });
  const search = useRef<HTMLInputElement>(null);
  // 초기 좌표 기준으로 설정해두기
  const [stores, setStores] = useState<Store[]>([]);
  
  // 위치정보 불러와지는 것 감시한 뒤 이동시키기
  useEffect(()=>{
    setCenter({ lat: location.loaded ? location.coordinates!.lat : 33.450701, lng: location.loaded ? location.coordinates!.lng : 126.570677 });
  }, [location.loaded]);

  useEffect(()=>{
    // TODO: 지도의 중심좌표에 따라 서버에 주변 점포 요청해서 set해주기
    setStores(
      [{
        title: "카카오",
        latlng: { lat: 33.450705, lng: 126.570677 },
      }
    ])
    console.log(center, isFlyer);
  }, [center, isFlyer, showModal]);
  
  if (loading || error) return <></>;

  const onClickHandler = () => {
    setShowModal(false);
  };

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
    }else{
      window.location.reload();
    }
  };

  const enterSearch: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if(event.key === 'Enter' && search.current!.value !== ''){
      console.log(search.current!.value);
      search.current!.blur();
      // TODO: search.current!.value 연관검색어 리스트 서버에 받아와서 아래 set 해주기
      setStores(
        [{
          title: "카카오",
          latlng: { lat: 33.450705, lng: 126.570677 },
        }
      ])
      setShowModal(true);
    }
  };

  return (
    <>
    <div className={style.map}>
    <Map // 지도를 표시할 Container
      center={center}
      style={{
        // 지도의 크기
        width: "100%",
        height: "100%",
      }}
      level={4} // 지도의 확대 레벨
      onDragEnd={(map) => setCenter({ lat: map.getCenter().getLat(), lng: map.getCenter().getLng() })}
    >
      {stores.map((position, _) => (
        <MapMarker
          key={`${position.title}-${position.latlng}`}
          position={position.latlng} // 마커를 표시할 위치
          image={{
            src: "/public/image/mapMarker.png", // 마커이미지의 주소입니다
            size: {
              width: 27.73,
              height: 33,
            }, // 마커이미지의 크기입니다
          }}
          title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        />
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
        <CSSTransition
          mountOnEnter
          unmountOnExit
          in={showModal}
          timeout={{ enter: 300, exit: 300 }}
          classNames="modal"
        >
          <div className="modal">
            <h2>지점들 정보 리스트</h2>
          </div>
        </CSSTransition>
    </ModalPortal>
    <Outlet/>
    </>
  );
}

export default KakaoMap;