import { Outlet, useSearchParams } from "react-router-dom";

import Footer from "./components/footer/Footer";
import "./App.css";
import { useEffect, useState } from "react";

const App = () => {

  // 0: 비로그인, 1: 소비자, 2: 광고주
  const [status, setStatus] = useState(-1);
  const [searchParams] = useSearchParams();
  let token = localStorage.getItem("accessToken");
  const accessToken = searchParams.get("accessToken");
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    token = accessToken;
  }

  useEffect(() => {
    if (token){
      fetch("https://qrecode-back.shop/user/status", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        }
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          if (data.data.lastStatus === "USER"){
            setStatus(1);
          }else if(data.data.lastStatus === "ADVERTISER"){
            setStatus(2);
          }
        })
        .catch(_ => {
          setStatus(0);
          localStorage.removeItem("accessToken");
        })

    }else{
      setStatus(0);
    }
  }, []);
  return (
    <>
    {status !== -1 &&
      <>
      <Outlet context={{status}} />
      <Footer status={status}/>
      </>
    }
    </>
  );
}

export default App;