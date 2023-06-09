import Header from "../../../components/footer/Header";
import style from "./Citizen.module.css";
import cameraImg from "../../../../public/image/home/camera.svg";
import treeImg from "../../../../public/image/home/tree.svg";
import CardContent from "./CardContent";

const CitizenPage = () => {
  const co2 = {
    label: "탄소 저감량",
    value: "00,000,000g",
  };
  const plantedTree = {
    label: "심어진 나무",
    value: "1 그루",
  };

  return (
    <div className={style.citizenPage}>
      <Header>
        <img src="/public/image/logo.svg" />
      </Header>
      <div className={style.contents}>
        <div className={style.userInfo}>
          <div>
            <p className={style.username}>가나다</p>
            <p className={style.points}>
              <span>0</span> 포인트
            </p>
            <p className={style.catchphrase}>나무 심기까지 0개 남았어요</p>
          </div>
          <div className={style.camera}>
            <img src={cameraImg} alt="" />
          </div>
        </div>
        <div className={style.tree}>
          <img src={treeImg} alt="" />
        </div>
        <div className={style.effect}>
          <div className={style.card}>
            <p className={style.title}>QR 전단지 효과</p>
            <div className={style.cardContents}>
              <CardContent content={co2} />
              <CardContent content={plantedTree} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenPage;
