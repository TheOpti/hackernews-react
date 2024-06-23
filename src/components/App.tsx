import { useState } from 'react';
import { LinkList } from './LinkList/LinkList';
import { AuthModal } from './AuthModal/AuthModal';
import { Navigation } from './Navigation/Navigation';

import './App.css';
import { useNotification } from '../context/NotificationsProvider';

export const App = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { showNotification } = useNotification();

  return (
    <>
      <Navigation openLoginModal={() => setShowLoginModal(true)} />
      <LinkList />
      <AuthModal open={showLoginModal} handleClose={() => setShowLoginModal(false)} />

      <button
        onClick={() => {
          showNotification({ message: 'dsadjisaodjsiao ' });
        }}>
        Show notification
      </button>
    </>
  );
};

export default App;
