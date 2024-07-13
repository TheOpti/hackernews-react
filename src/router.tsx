import { createBrowserRouter, Navigate } from 'react-router-dom';

import MainPage from './pages/MainPage/MainPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

export const router = createBrowserRouter([
  { path: '/', element: <MainPage /> },
  { path: '/profile/:id', element: <ProfilePage /> },
  {
    path: '*',
    element: <Navigate to="/" />
  }
]);
