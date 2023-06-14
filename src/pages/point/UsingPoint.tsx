// import { getAuthToken } from "../../util/auth";

import PointPay from "../../components/point/PointPay";
// import { useLoaderData } from "react-router-dom";

const UsingPoinPage = () => {
  //const points = useLoaderData();
  return <PointPay />;
};

// const loader = async () => {
//   const token = getAuthToken();
//   const response = await fetch("https://qrecode-back.shop/point", {
//     method: "GET",
//     headers: {
//       Authorization: "Bearer " + token,
//     },
//   });

//   if (!response.ok) {
//     throw json(
//       { message: "포인트를 받아오는데 실패했습니다." },
//       { status: 500 }
//     );
//   } else {
//     return response;
//   }
// };

export default UsingPoinPage;
