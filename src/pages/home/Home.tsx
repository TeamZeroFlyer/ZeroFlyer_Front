import { useEffect } from "react";
import Advertiser from "../../components/home/Advertiser.tsx";
import Citizen from "../../components/home/citizen/Citizen";

import { useOutletContext, useSearchParams } from 'react-router-dom';

type ChildProps = {
  status: number
}

const Home = () => {
  const {status} = useOutletContext<ChildProps>();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (status === 0){
      window.location.href = "/login";
    }
    const toSave = sessionStorage.getItem("save");
    const token = localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : searchParams.get("accessToken");
    if(toSave){
      fetch("https://qrecode-back.shop/user/saveflyer?idx=" + toSave, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
            },
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
          if(data.data === 'success'){
            alert('저장되었습니다.');
            sessionStorage.removeItem("save");
            window.location.href = "/";
          }
      });
    }
  },[status]);
  return (
    <>
      {status !== 2 && <Citizen />}
      {status === 2 && <Advertiser />}
    </>
  );
};

export default Home;
