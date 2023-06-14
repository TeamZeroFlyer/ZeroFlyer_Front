import { useEffect } from "react";
import Advertiser from "../../components/home/Advertiser.tsx";
import Citizen from "../../components/home/citizen/Citizen";

import { useOutletContext } from 'react-router-dom';

type ChildProps = {
  status: number
}

const Home = () => {
  const {status} = useOutletContext<ChildProps>();
  useEffect(() => {
    if (status === 0){
      window.location.href = "/login";
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
