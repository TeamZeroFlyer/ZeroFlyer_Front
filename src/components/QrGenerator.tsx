import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";

import Flyer from "./Flyer";
import style from "./QrGenerator.module.css";
import { FlyerInf } from "src/pages/CreateQRCode";

const Backdrop: React.FC<{ onConfirm: () => void }> = (props) => {
  return <div className={style.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay: React.FC<{
  onConfirm: () => void;
  onSelectFlyer: (flyer: FlyerInf) => void;
  onSelectQrNumber: (qrNumber: number) => void;
  flyers: FlyerInf[];
}> = (props) => {
  const [previewFlyer, setPreviewFlyer] = useState<FlyerInf>();
  const qrNumberRef = useRef<HTMLInputElement>(null);


  const onConfirmHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    props.onSelectFlyer(previewFlyer!);
    props.onSelectQrNumber(Number(qrNumberRef.current!.value));
    props.onConfirm();
  }

  return (
    <div className={style.modal}>
      <header>
        <p>QR 생성하기</p>
        <button onClick={props.onConfirm}>x</button>
      </header>
      <div>
        {previewFlyer &&
          <div>
            <p>{previewFlyer.imgUrl}</p>
            <input name="qr-number" type="number" ref={qrNumberRef} />
          </div>
        }
        <ul>
          {props.flyers.length > 0 &&
            props.flyers.map((flyer) => (
              <Flyer
                key={flyer.id}
                flyer={flyer}
                onSelectFlyer={setPreviewFlyer.bind(null, flyer)}
              />
            ))}
          {props.flyers.length < 0 && <button>전단지 추가하기</button>}
        </ul>
      </div>
      <footer>
        <button onClick={onConfirmHandler}>생성</button>
      </footer>
    </div>
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
          flyers={props.flyers}
          onSelectFlyer={props.onSelectFlyer}
          onSelectQrNumber={props.onSelectQrNumber}
        />,
        document.getElementById("overlay-root") as HTMLElement
      )}
    </>
  );
};

export default QrGenerator;
