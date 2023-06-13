import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import EditFlyer from "./pages/flyer/EditFlyer";
import Home from "./pages/home/Home";
import KakaoMap from "./pages/map/KakaoMap";
import CreateQRCode from "./pages/qr/CreateQRCode";
import FlyerDetailPage from "./pages/FlyerDetail";
import QrScanner from "./pages/qr/QrScanner";
import ManageQRCode from "./pages/qr/ManageQRCode";
import Setting from "./pages/setting/Setting";
import LoginPage from "./pages/login/Login";
import { tokenLoader } from "./util/auth";
import PointPage from "./pages/Point";
import Flyer from "./pages/flyer/Flyer";
import FullFyler from "./pages/flyer/FullFlyer";
import EditStore from "./pages/setting/EditStore";
import NoneMember from "./pages/home/noneMember/NoneMember";
import UsingPoinPage from "./pages/home/UsingPoint";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: tokenLoader,
    id: "root",
    children: [
      {
        path: "map",
        element: <KakaoMap />,
      },
      {
        path: "point",
        children: [
          {
            index: true,
            element: <UsingPoinPage />
          }, 
          {
            path: "history",
            element: <PointPage />
          }
        ]
      },
      {
        path: "flyer",
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
          },
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
          },
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
        path: "setting",
        children: [
          {
            index: true,
            element: <Setting />,
          },
          {
            path: "edit",
            element: <EditStore />,
          },
        ],
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "mode-select",
        element: <NoneMember />,
      },
    ],
  },
]);

export default router;
