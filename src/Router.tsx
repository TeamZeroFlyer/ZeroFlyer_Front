import { createBrowserRouter } from "react-router-dom";

import App from './App';
import FlyerManage from "./pages/manageFlyer/ManageFlyer";
import EditFlyer from "./pages/manageFlyer/EditFlyer";
import Home from "./pages/home/Home";
import KakaoMap from './pages/map/KakaoMap';
import CreateQRCode from "./pages/qr/CreateQRCode";
import FlyerDetailPage from "./pages/FlyerDetail";
import QrScanner from "./pages/qr/QrScanner";
import ManageQRCode from "./pages/qr/ManageQRCode";
import Setting from "./pages/Setting";
import LoginPage from "./pages/login/Login";
import { tokenLoader } from "./util/auth";
import PointPage from "./pages/Point";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: tokenLoader,
    id: 'root',
    children: [
      {
        path: 'map',
        element: <KakaoMap />,
      },
      {
        path: 'point',
        element: <PointPage />
      },
      {
        path: 'flyer',
        children: [
          {
            index: true,
            element: <FlyerManage />,
          },
          {
            path: ":flyerCode",
            element: <EditFlyer />,
          }
        ],
      },
      {
        path: "qr",
        children: [
          {
            index: true,
            element: <ManageQRCode />,
          },
          {
            path: ":qrId",
            element: <QrScanner />,
          },
          {
            path: "new",
            element: <CreateQRCode />,
          }
        ],
      },
      {
        path: "flyer/:flyerId/qr/:qrId",
        element: <FlyerDetailPage />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'setting',
        element: <Setting />,
      },      {
        path: 'point',
        element: <></>,
      },
      {
        path: "/login",
        element: <LoginPage />,
      }
    ],
    
  }, 
]);

export default router;
