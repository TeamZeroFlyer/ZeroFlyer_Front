import React from "react";
import ReactDOM from "react-dom";

import { FlyerInf } from "../../pages/qr/CreateQRCode";
import { slides } from "../../data/carouselData.json";
import style from "./QrGenerator.module.css";
import Card from "../../UI/Card";
import FlyerCarousel from "../FlyerCarousel";

const Backdrop: React.FC<{ onConfirm: () => void }> = (props) => {
  return <div className={style.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay: React.FC<{
  onConfirm: () => void;
  onSelectFlyer: (flyer: FlyerInf) => void;
  onSelectQrNumber: (qrNumber: number) => void;
  flyers: FlyerInf[];
}> = (props) => {
  const selectPreviewFlyer = (flyerId: number) => {
    const selectedFlyer = props.flyers.find((flyer) => flyer.idx === flyerId)!;
    props.onSelectFlyer(selectedFlyer);
    props.onConfirm();
  };

  return (
    <Card className={style.modal}>
      <header>
        <h4>전단지 선택</h4>
        <span onClick={props.onConfirm}>x</span>
      </header>
      <div className={style.carouselContainer}>
        {slides.length > 0 && (
          <FlyerCarousel
            selectPreviewFlyer={selectPreviewFlyer}
            flyers={props.flyers}
          />
        )}
        {slides.length < 0 && <button>전단지 추가하기</button>}
      </div>
    </Card>
  );
};

const QrGenerator: React.FC<{
  onConfirm: () => void;
  onSelectFlyer: (flyer: FlyerInf) => void;
  onSelectQrNumber: (qrNumber: number) => void;
  flyers: FlyerInf[];
}> = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root") as HTMLElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          onConfirm={props.onConfirm}
          onSelectFlyer={props.onSelectFlyer}
          onSelectQrNumber={props.onSelectQrNumber}
          flyers={props.flyers}
        />,
        document.getElementById("overlay-root") as HTMLElement
      )}
    </>
  );
};

export default QrGenerator;
