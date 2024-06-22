import { useState } from 'react';
import { LinkList } from './LinkList/LinkList';
import { AuthModal } from './AuthModal/AuthModal';
import { Navigation } from './Navigation/Navigation';

import './App.css';

export const App = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <Navigation openLoginModal={() => setShowLoginModal(true)} />
      <LinkList />
      <AuthModal open={showLoginModal} handleClose={() => setShowLoginModal(false)} />
    </>
  );
};

export default App;
