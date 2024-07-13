import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import { AuthProvider } from './context/AuthProvider.tsx';
import { NotificationProvider } from './context/NotificationsProvider.tsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './main.css';

import { client } from './services/apollo.ts';
import { router } from './router.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <NotificationProvider>
    <AuthProvider>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </AuthProvider>
  </NotificationProvider>
);
