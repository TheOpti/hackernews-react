import { useState } from 'react';
import { LinkList } from '../../components/LinkList/LinkList';
import { AuthModal } from '../../components/AuthModal/AuthModal';
import { Navigation } from '../../components/Navigation/Navigation';

import classes from './MainPage.module.css';

export const MainPage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className={classes.mainPage}>
      <Navigation openLoginModal={() => setShowLoginModal(true)} />
      <LinkList />
      <AuthModal open={showLoginModal} handleClose={() => setShowLoginModal(false)} />
    </div>
  );
};

export default MainPage;
