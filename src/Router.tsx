import { createBrowserRouter } from 'react-router-dom';
import AdvertiserMap from './pages/AdvertiserMap';
import App from './App';

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
        path: 'advertiserMap',
        element: <AdvertiserMap />,
      },
    ],
  },
]);

export default router;