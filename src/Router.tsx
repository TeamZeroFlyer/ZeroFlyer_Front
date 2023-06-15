import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import EditFlyer from "./pages/flyer/EditFlyer";
import Home from "./pages/home/Home";
import KakaoMap from "./pages/map/KakaoMap";
import CreateQRCode, { loader as flyerLoader } from "./pages/qr/CreateQRCode";
import FlyerDetailPage from "./pages/flyer/FlyerDetail";
import QrScanner, {loader as qrScannerLoader} from "./pages/qr/QrScanner";
import ManageQRCode, { loader as qrLoader } from "./pages/qr/ManageQRCode";
import Setting from "./pages/setting/Setting";
import LoginPage from "./pages/login/Login";
import { tokenLoader } from "./util/auth";
import PointPage, { loader as pointListLoader} from "./pages/point/Point";
import Flyer from "./pages/flyer/Flyer";
import FullFyler from "./pages/flyer/FullFlyer";
import EditStore from "./pages/setting/EditStore";
import NoneMember from "./pages/home/noneMember/NoneMember";
import UsingPoinPage, {loader as totalPointLoader } from "./pages/point/UsingPoint";
import ErrorPage from "./pages/error/Error";
import UserInfo from "./pages/setting/UserInfo";
import EditQRCode, {loader as editQRLoader} from "./pages/qr/EditQRCode";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
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
            element: <UsingPoinPage />,
            loader: totalPointLoader,
          },
          {
            path: "history",
            element: <PointPage />,
            loader: pointListLoader,
          },
        ],
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
        id: "flyer",
        loader: flyerLoader,
        children: [
          {
            index: true,
            element: <ManageQRCode />,
            id: "qrList",
            loader: qrLoader,
          },
          {
            path: ":qrId",
            children: [
              {
                index: true,
                element: <QrScanner />,
                loader:qrScannerLoader,
              },
              {
                path: "edit",
                element: <EditQRCode />,
                loader:editQRLoader,
              },
            ],
          },
          {
            path: "new",
            loader: flyerLoader,
            element: <CreateQRCode />,
          },
        ],
      },
      {
        path: "store/:storeIdx/flyer/:flyerId/qr/:qrId",
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
          {
            path: "userinfo",
            element: <UserInfo />,
          }
        ],
      },
      {
        path: "login",
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
