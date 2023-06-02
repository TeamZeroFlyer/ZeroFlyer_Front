import React from "react";
import { FlyerInf } from "src/pages/CreateQRCode";

const Flyer: React.FC<{
    flyer: FlyerInf;
    onSelectFlyer: () => void;
}> = (props) => {
    return <li onClick={props.onSelectFlyer}>{ props.flyer.imgUrl}</li>;
};

export default Flyer;
