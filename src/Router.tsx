import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import KakaoMap from './components/KakaoMap';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <></>,
      },
      {
        path: 'map',
        element: <KakaoMap />,
      },
    ],
  },
]);

export default router;