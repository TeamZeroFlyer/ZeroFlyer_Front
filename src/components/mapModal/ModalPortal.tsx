import { ReactNode } from "react";
import ReactDOM from "react-dom";
import "./ModalPortal.css";

interface ModalPortalProps {
  show: boolean;
  onClick: () => void;
  children: ReactNode;
}

const ModalPortal: React.FC<ModalPortalProps> = (props) => {
  return (
    <div>
      {ReactDOM.createPortal(
        props.show ? <div className="backdrop" onClick={props.onClick}></div> : null,
        document.getElementById("backdrop-root") as HTMLElement
      )}
      {ReactDOM.createPortal(
        props.children,
        document.getElementById("overlay-root") as HTMLElement
      )}
    </div>
  );
};

export default ModalPortal;
