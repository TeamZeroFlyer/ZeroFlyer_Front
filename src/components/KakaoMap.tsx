import { Map, MapMarker, useInjectKakaoMapApi } from "react-kakao-maps-sdk";
import style from "./KakaoMap.module.css";
import { Outlet } from 'react-router-dom';
import useGeoLocation from "../hooks/useGeolocation";
import { useState, useEffect } from "react";

interface Store {
  title: string;
  latlng: {
    lat: number;
    lng: number;
  };
}

const KakaoMap = () => {
  const location = useGeoLocation();
  const [center, setCenter] = useState({ lat: 33.450701, lng: 126.570677 })
  const { loading, error } = useInjectKakaoMapApi({
    appkey: import.meta.env.VITE_KAKAO_API_KEY,
    libraries: ['services'],
  });

  // 초기 좌표 기준으로 설정해두기
  const [stores, setStores] = useState<Store[]>([]);

  // 위치정보 불러와지는 것 감시한 뒤 이동시키기
  useEffect(()=>{
    setCenter({ lat: location.loaded ? location.coordinates!.lat : 33.450701, lng: location.loaded ? location.coordinates!.lng : 126.570677 });
  }, [location.loaded]);

  // 지도의 중심좌표에 따라 서버에 주변 점포 요청해서 set해주기
  useEffect(()=>{
    setStores(
      [{
        title: "카카오",
        latlng: { lat: 33.450705, lng: 126.570677 },
      },
      {
        title: "생태연못",
        latlng: { lat: 33.450936, lng: 126.569477 },
      },
      {
        title: "텃밭",
        latlng: { lat: 33.450879, lng: 126.56994 },
      },
      {
        title: "근린공원",
        latlng: { lat: 33.451393, lng: 126.570738 },
      },
    ])
    console.log(center);
  }, [center]);
  
  if (loading || error) return <></>;

  /*
    map을 가장 뒤에 꽉채워놔서 앞으로 올 것들은 아래처럼 이 위에 올라와야 한다.
    .overlay-div {
    position: relative;
    z-index: 3;
    }
  */

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
            src: "/public/mapMarker.png", // 마커이미지의 주소입니다
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
    <Outlet/>
    </>
  );
}
  
export default KakaoMap