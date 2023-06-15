import { Link, json } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuthToken } from "../../../util/auth";

import Header from "../../../components/footer/Header";
import style from "./Citizen.module.css";
import barcodeImg from "../../../../public/image/home/barcode.svg";
import minitreeImg from "../../../../public/image/home/minitree.svg";
import bigtreeImg from "../../../../public/image/home/bigtree.svg";
import plantedTreeImg from "../../../../public/image/home/plantedTree.svg";
import CardContent from "./CardContent";
import CircleProgressBar from "./CircleProgressBar";

type User = {
  userName: string;
  userPoint: number;
  userScanCount: number;
};

const calcCo2 = (totalScan: number) => totalScan * 2.88;
const calcLeftTree = (totalScan: number) => 10 - (totalScan % 10);
const calcPlantedTree = (totalScan: number) => Math.floor(totalScan / 10);
const calcProgress = (totalScan: number) => 10 - calcLeftTree(totalScan);

const CitizenPage = () => {
  const token = getAuthToken();
  const [progressRadius, setProgressRadius] = useState(150);
  const [userData, setUserData] = useState<User>({
    userName: "",
    userPoint: 0,
    userScanCount: 0,
  });
  useEffect(() => {
    const fetchHomeData = async () => {
      const response = await fetch("https://qrecode-back.shop/user", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        throw json(
          { message: "서버에서 에러가 발생했습니다." },
          { status: 500 }
        );
      } else {
        const { data } = await response.json();
        setUserData({
          userName: data.userName,
          userPoint: data.userPoint,
          userScanCount: data.userScanCount,
        });
      }
    };
    if (getAuthToken())
      fetchHomeData();
    if (window.innerHeight < 700) {
      setProgressRadius(135);
    } else {
      setProgressRadius(150);

    }
  }, []);
  return (
    <div className={style.citizenPage}>
      <Header>
        <img src="https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/main/public/image/logo.svg" />
      </Header>
      <div className={style.contents}>
        <div className={`${style.item} ${style.userInfo}`}>
          <div>
            <p className={style.username}>{userData.userName} 님</p>
            <p className={style.points}>
              <span>{userData.userPoint.toLocaleString()}</span> 포인트
            </p>
            <p className={style.catchphrase}>
              나무 심기까지 {calcLeftTree(userData.userScanCount)}개 남았어요
            </p>
          </div>
          <div className={style.action}>
            <Link to="/point">
              <div className={style.barcode}>
                <img src={barcodeImg} alt="포인트 사용버튼" />
              </div>
            </Link>
            <p>포인트 사용</p>
          </div>
        </div>
        <div className={`${style.tree} ${style.item}`}>
          <CircleProgressBar
            progress={calcProgress(userData.userScanCount)}
            strokeWidth={8}
            circleRadius={progressRadius}
          >
            <div className={style.treeImageWrapper}>
              <img
                src={
                  10 - calcLeftTree(userData.userScanCount) > 6
                    ? bigtreeImg
                    : minitreeImg
                }
                alt="나무 이미지"
              />
            </div>
          </CircleProgressBar>
          <div className={style.plantedTree}>
            <img src={plantedTreeImg} alt="내가 심은 나무 이미지" />
            <p className={style.treenum}>
              {calcPlantedTree(userData.userScanCount)}
            </p>
            <p className={style.treelabel}>심은나무</p>
          </div>
        </div>
        <div className={`${style.effect} ${style.itm}`}>
          <div className={style.card}>
            <p className={style.title}>QR 전단지 효과</p>
            <div className={style.cardContents}>
              <CardContent
                label="co2"
                value={calcCo2(userData.userScanCount)}
              />
              <CardContent
                label="tree"
                value={calcPlantedTree(userData.userScanCount)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenPage;
