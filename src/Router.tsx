import { createBrowserRouter } from "react-router-dom";

import App from './App';
import EditFlyer from "./pages/flyer/EditFlyer";
import Home from "./pages/Home";
import KakaoMap from './pages/map/KakaoMap';
import CreateQRCode from "./pages/qr/CreateQRCode";
import FlyerDetailPage from "./pages/FlyerDetail";
import QrScanner from "./pages/qr/QrScanner";
import ManageQRCode from "./pages/qr/ManageQRCode";
import Setting from "./pages/Setting";
import LoginPage from "./pages/login/Login";
import { tokenLoader } from "./util/auth";
import Flyer from "./pages/flyer/Flyer";
import FullFyler from "./pages/flyer/FullFlyer";
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
            element: <Flyer />,
          },
          {
            path: ":flyerCode",
            element: <EditFlyer />,
          },
          {
            path: "full/:flyerCode",
            element: <FullFyler />,
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
        index: true,
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
