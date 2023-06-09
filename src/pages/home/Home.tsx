import { useRouteLoaderData, useSearchParams } from "react-router-dom";
import Advertiser from "../../components/home/Advertiser.tsx";
import Citizen from "../../components/home/citizen/Citizen";
import { useEffect } from "react";

const Home = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }
  }, []);
    
  return (
    <>
      <Advertiser />
    </>
  );
};

export default Home;
