import { createBrowserRouter } from "react-router-dom";

import App from './App';
import KakaoMap from './pages/KakaoMap';
import CreateQRCode from "./pages/qr/CreateQRCode";
import FlyerDetailPage from "./pages/FlyerDetail";
import QrScanner from "./pages/qr/QrScanner";
import ManageQRCode from "./pages/qr/ManageQRCode";
import FlyerManage from "./pages/ManageFlyer";
import EditFlyer from "./pages/EditFlyer";
import Setting from "./pages/Setting";
import Home from "./pages/Home";
import LoginPage from "./pages/login/Login";
import { tokenLoader } from "./util/auth";

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
