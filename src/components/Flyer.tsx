import React from "react";

const Flyer: React.FC<{
    
    onSelectFlyer: () => void;
}> = (props) => {
    return <li onClick={props.onSelectFlyer}></li>;
};

export default Flyer;
