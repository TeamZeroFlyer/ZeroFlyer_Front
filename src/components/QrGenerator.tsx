import React from "react";

type FlyerInf = {
  id: string; 
  issuer: string;
  imgUrl: string;
};

const flyers: FlyerInf[] = [
  { id: "1", issuer: "juhong", imgUrl: "http://test1.com" },
  { id: "2", issuer: "hyeonsik", imgUrl: "http://test2.com" },
  { id: "3", issuer: "gitae", imgUrl: "http://test3.com" },
];

const QrGenerator: React.FC = () => {
  return <></>;
};

export default QrGenerator;
