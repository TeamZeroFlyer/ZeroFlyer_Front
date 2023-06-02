import ReactDOM from "react-dom";
import "./ModalPortal.css";

const ModalPortal = (props: any) => {
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
