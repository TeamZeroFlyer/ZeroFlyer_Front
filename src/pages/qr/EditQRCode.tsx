// import React, { useState } from "react";
// import { getAuthToken } from "../../util/auth";
// import { redirect, LoaderFunctionArgs, json, useLoaderData, useParams} from "react-router-dom";

// import QrGenerator from "../../components/qr/QrGenerator";
// import QRForm from "../../components/qr/QRForm";
// import FlyerPreview from "../../components/FlyerPreview";
// import PartTimeList from "../../components/qr/PartTimeList";
// import style from "./CreateQRCode.module.css";

// export type FlyerInf = {
//   id: number;
//   src: string;
//   flyerName: string;
//   hashTag: string[];
//   alt: string;
// };

// export type PTJob = {
//   name: string;
//   phone: string;
// };

// const EditQRCode: React.FC = () => {
//     const params = useParams();
//     const data =  useLoaderData();
//   const [isQRModalOpen, setIsQRModalOpen] = useState<boolean>(false);
//   const [seletedFlyer, setSelectedFlyer] = useState<FlyerInf>(data.flyer);
//   const [qrNumber, setQrNumber] = useState<number>(1);
//   const [ptJob, setPtJob] = useState<PTJob>(data.ptj);

//   const qrOpenModalHandler = () => setIsQRModalOpen(true);
//   const qrCloseHandler = () => setIsQRModalOpen(false);

//   const qrEditHandler = async () => {
//     if (seletedFlyer && qrNumber > 0 && validateForm(ptJob)) {
//       const token = getAuthToken();
      
//       const reponse = await fetch(`https://qrecode-back.shop/qr/${params.qrId}/edit`, {
//         method: "PATCH",
//         headers: { Authentication: `Bearer ${token}` },
//         body: JSON.stringify({
//           flyerId: seletedFlyer.id,
//           ptj: ptJob,
//         }),
//       });

//       if (!reponse.ok) {
//         //TODO: 에러처리.
//         //throw new Error("QR을 생성하는데 문제가 발생했습니다.");
//         // throw json(
//         //   { message: "QR을 생성하는데 문제가 발생했습니다." },
//         //   { status: 500 }
//         // );
//       } else {
//         return redirect("/qr");
//       }
//     }
//   };

//   return (
//     <div className={style.createQRCode}>
//       {isQRModalOpen && (
//         <QrGenerator
//           onConfirm={qrCloseHandler}
//           onSelectFlyer={setSelectedFlyer}
//           onSelectQrNumber={setQrNumber}
//         />
//       )}
//       <QRForm
//         onModalClick={qrOpenModalHandler}
//         onCreateClick={qrEditHandler}
//       />
//       {seletedFlyer && (
//         <FlyerPreview
//           previewFlyer={seletedFlyer}
//           qrNumber={qrNumber}
//           selectQrNumber={setQrNumber}
//         />
//       )}
//           {seletedFlyer && <PartTimeList ea={1} onEditPt={setPtJob} pt={ ptJob} />}
//     </div>
//   );
// };

// const validateForm = (ptList: PTJob[]) => {
//   if (ptList.length === 0) return false;
//   const isValid = ptList.every(
//     (entry) =>
//       entry.name !== "" && entry.name && entry.phone !== "" && entry.phone
//   );
//   return isValid;
// };

// const loader = async ({ params }: LoaderFunctionArgs) => {
//   const token = getAuthToken();
//   const qrId = params.qrId;

//   const response = await fetch(`https://qrecode-back.shop/qr/${qrId}/edit`, {
//     headers: { Authentication: `Bearer ${token}` },
//   });
//     if (!response.ok) {
//         throw json({ message: "데이터를 가져오는데 실패했습니다." }, { status: 500 });
//     } else {
//         const resData = await response.json();
//         return resData.qr;
//     }
// };

// export default EditQRCode;
