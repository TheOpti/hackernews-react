import { useState } from 'react';
import { LinkList } from '../../components/LinkList/LinkList';
import { AuthModal } from '../../components/AuthModal/AuthModal';
import { Navigation } from '../../components/Navigation/Navigation';

export const MainPage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <Navigation openLoginModal={() => setShowLoginModal(true)} />
      <LinkList />
      <AuthModal open={showLoginModal} handleClose={() => setShowLoginModal(false)} />
    </>
  );
};

export default MainPage;
