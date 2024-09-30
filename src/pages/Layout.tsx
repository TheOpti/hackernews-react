import { Outlet } from 'react-router-dom';
import { Navigation } from '../components/Navigation/Navigation';
import { AuthModal } from '../components/AuthModal/AuthModal';
import { useState } from 'react';

const Layout = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <Navigation openLoginModal={() => setShowLoginModal(true)} />
      <AuthModal open={showLoginModal} handleClose={() => setShowLoginModal(false)} />
      <Outlet />
    </>
  );
};

export default Layout;
