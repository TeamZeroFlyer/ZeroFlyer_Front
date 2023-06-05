import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";

const App = () => {
  return (
    <>
      <Outlet />
      <Footer/>
    </>
  );
}

export default App;