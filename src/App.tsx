import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import "./App.css";

const App = () => {
  return (
    <>
      <Outlet />
      <Footer/>
    </>
  );
}

export default App;