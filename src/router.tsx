import { createBrowserRouter, Navigate } from 'react-router-dom';

import ListPage from './pages/ListPage/ListPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Layout from './pages/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <ListPage />
      },
      {
        path: '/profile/:id',
        element: <ProfilePage />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
]);
