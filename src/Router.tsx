import { createBrowserRouter } from "react-router-dom";

import App from './App';
import KakaoMap from './pages/map/KakaoMap';
import CreateQRCode from "./pages/CreateQRCode";
import FlyerDetailPage from "./pages/FlyerDetail";
import QrScanner from "./pages/QrScanner";
import ManageQRCode from "./pages/ManageQRCode";
import FlyerManage from "./pages/manageFlyer/ManageFlyer";
import EditFlyer from "./pages/manageFlyer/EditFlyer";
import Setting from "./pages/Setting";
import Home from "./pages/home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <></>,
      },
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
    ],
  }, 
]);

export default router;
