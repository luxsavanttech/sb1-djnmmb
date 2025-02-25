import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      // Other routes will be added as we create more pages
    ],
  },
]);