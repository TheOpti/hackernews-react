import { useState } from 'react';
import { LinkList } from './LinkList/LinkList';
import { LoginModal } from './LoginModal/LoginModal';
import { Navigation } from './Navigation/Navigation';

import './App.css';

export const App = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <Navigation openLoginModal={() => setShowLoginModal(true)} />
      <LinkList />
      <LoginModal open={showLoginModal} handleClose={() => setShowLoginModal(false)} />
    </>
  );
};

export default App;
