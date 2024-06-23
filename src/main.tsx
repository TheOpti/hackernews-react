import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';

import { AuthProvider } from './context/AuthContext.tsx';
import { NotificationProvider } from './context/NotificationsProvider.tsx';

import App from './components/App.tsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { client } from './services/apollo.ts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <NotificationProvider>
    <AuthProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </AuthProvider>
  </NotificationProvider>
);
