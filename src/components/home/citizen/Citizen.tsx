import { useState } from "react";

import Header from "../../../components/footer/Header";
import style from "./Citizen.module.css";
import cameraImg from "../../../../public/image/home/camera.svg";
import minitreeImg from "../../../../public/image/home/minitree.svg";
import plantedTreeImg from "../../../../public/image/home/plantedTree.svg";
import CardContent from "./CardContent";
import CircleProgressBar from "./CircleProgressBar";

type User = {
  name: string;
  point: number;
  leftTreeNum: number;
  plantedTree: number;
  co2: number;
  totlaTree: number;
};

const dummy: User = {
  name: "김새싹",
  point: 3600,
  leftTreeNum: 8,
  plantedTree: 3,
  co2: 0,
  totlaTree: 0,
};

const CitizenPage = () => {
  const [cameraEnabled, setCameraEnabled] = useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const handleCameraToggle = async () => {
    try {
      if (cameraEnabled) {
        // 카메라 비디오 스트림 중지
        stream!.getTracks().forEach((track) => track.stop());
        setStream(null);
      } else {
        // 카메라 비디오 스트림 가져오기
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setStream(mediaStream);
      }
      setCameraEnabled(!cameraEnabled);
    } catch (error) {
      console.log("카메라를 사용할 수 없습니다.", error);
    }
  };

  return (
    <div className={style.citizenPage}>
      <Header>
        <img src="/public/image/logo.svg" />
      </Header>
      <div className={style.contents}>
        <div className={`${style.item} ${style.userInfo}`}>
          <div>
            <p className={style.username}>{dummy.name}</p>
            <p className={style.points}>
              <span>{dummy.point.toLocaleString()}</span> 포인트
            </p>
            <p className={style.catchphrase}>
              나무 심기까지 {dummy.leftTreeNum}개 남았어요
            </p>
          </div>
          <div className={style.camera} onClick={handleCameraToggle}>
            <img src={cameraImg} alt="카메라" />
          </div>
        </div>
        <div className={`${style.tree} ${style.item}`}>
          <CircleProgressBar progress={50} strokeWidth={8} circleRadius={150}>
            <div className={style.treeImageWrapper}>
              <img src={minitreeImg} alt="나무 이미지" />
            </div>
          </CircleProgressBar>
          {/* <div className={style.plantedTree}>
            <img src={plantedTreeImg} alt="내가 심은 나무 이미지" />
            <p>3</p>
          </div> */}
        </div>
        <div className={`${style.effect} ${style.itm}`}>
          <div className={style.card}>
            <p className={style.title}>QR 전단지 효과</p>
            <div className={style.cardContents}>
              <CardContent label="co2" value={dummy.co2} />
              <CardContent label="tree" value={dummy.plantedTree} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenPage;
