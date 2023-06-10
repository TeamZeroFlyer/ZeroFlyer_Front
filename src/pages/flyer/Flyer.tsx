import ManageFlyerAd from "../../components/manageFlyer/ManageFlyerAd";
import ManageFlyerCz from "../../components/manageFlyer/ManageFlyerCz";
import { useOutletContext } from 'react-router-dom';

type ChildProps = {
    status: number
  }
  

const Flyer = () => {
  const {status} = useOutletContext<ChildProps>();
    
    return(
        <>
        {status === 1 && <ManageFlyerCz />}
        {status === 2 && <ManageFlyerAd />}
        </>
    );
};

export default Flyer;