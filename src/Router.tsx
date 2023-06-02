import { createBrowserRouter } from "react-router-dom";

import AdvertiserMap from "./pages/AdvertiserMap";
import App from "./App";
import CreateQRCode from "./pages/CreateQRCode";
import FlyerDetailPage from "./pages/FlyerDetail";
import QrScanner from "./pages/QrScanner";

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
        path: "advertiserMap",
        element: <AdvertiserMap />,
      },
      {
        path: "qr",
        children: [
          {
            index: true,
            element: <CreateQRCode />,
          },
          {
            path: ":qrId",
            element: <QrScanner />,
          },
        ],
      },
      {
        path: "flyer/:flyerId",
        element: <FlyerDetailPage />,
      },
    ],
  },
]);

export default router;
