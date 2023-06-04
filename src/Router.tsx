import { createBrowserRouter } from "react-router-dom";

import App from './App';
import KakaoMap from './components/KakaoMap';
import CreateQRCode from "./pages/CreateQRCode";
import FlyerDetailPage from "./pages/FlyerDetail";
import QrScanner from "./pages/QrScanner";
import ManageQRCode from "./pages/ManageQRCode";

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
    ],
  }, 
]);

export default router;
