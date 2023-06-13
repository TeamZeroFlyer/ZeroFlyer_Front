import { Link } from "react-router-dom";

import Header from "../../../components/footer/Header";
import style from "./Citizen.module.css";
import barcodeImg from "../../../../public/image/home/barcode.svg";
import minitreeImg from "../../../../public/image/home/minitree.svg";
import bigtreeImg from "../../../../public/image/home/bigtree.svg";
import plantedTreeImg from "../../../../public/image/home/plantedTree.svg";
import CardContent from "./CardContent";
import CircleProgressBar from "./CircleProgressBar";

type User = {
  name: string;
  point: number;
  totalScan: number;
};

const dummy: User = {
  name: "김새싹",
  point: 3600,
  totalScan: 18,
};

const calcCo2 = (totalScan: number) => totalScan * 2.88;
const calcLeftTree = (totalScan: number) => 10 - (totalScan % 10);
const calcPlantedTree = (totalScan: number) => Math.floor(totalScan / 10);

const CitizenPage = () => {
  return (
    <div className={style.citizenPage}>
      <Header>
        <img src="https://raw.githubusercontent.com/TeamZeroFlyer/ZeroFlyer_Front/9be89183664a4898914b84dece371161ba044478/public/image/logo.svg" />
      </Header>
      <div className={style.contents}>
        <div className={`${style.item} ${style.userInfo}`}>
          <div>
            <p className={style.username}>{dummy.name}</p>
            <p className={style.points}>
              <span>{dummy.point.toLocaleString()}</span> 포인트
            </p>
            <p className={style.catchphrase}>
              나무 심기까지 {calcLeftTree(dummy.totalScan)}개 남았어요
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
            progress={(10 - calcLeftTree(dummy.totalScan)) * 10}
            strokeWidth={8}
            circleRadius={150}
          >
            <div className={style.treeImageWrapper}>
              <img
                src={
                  10 - calcLeftTree(dummy.totalScan) > 6
                    ? bigtreeImg
                    : minitreeImg
                }
                alt="나무 이미지"
              />
            </div>
          </CircleProgressBar>
          <div className={style.plantedTree}>
            <img src={plantedTreeImg} alt="내가 심은 나무 이미지" />
            <p className={style.treenum}>{calcPlantedTree(dummy.totalScan)}</p>
            <p className={style.treelabel}>심은나무</p>
          </div>
        </div>
        <div className={`${style.effect} ${style.itm}`}>
          <div className={style.card}>
            <p className={style.title}>QR 전단지 효과</p>
            <div className={style.cardContents}>
              <CardContent label="co2" value={calcCo2(dummy.totalScan)} />
              <CardContent
                label="tree"
                value={calcPlantedTree(dummy.totalScan)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenPage;
