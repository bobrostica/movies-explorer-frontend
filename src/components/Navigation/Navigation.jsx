import React from 'react';

import './Navigation.css';
import LoggedNavList from '../LoggedNavList/LoggedNavList';
import NavList from '../NavList/NavList';
import { useAppState } from '../../contexts/AppStateContext';
import BurgerButton from '../../ui/BurgerButton/BurgerButton';

const Navigation = ({ theme }) => {
  const [{ isLoggedIn, currentDeviceWidth }, setAppState] = useAppState();

  const handleMenuOpen = () => {
    setAppState((prev) => ({ ...prev, isMenuOpened: true }));
  };

  return (
    <nav className="navigation">
      {!isLoggedIn && <NavList theme={theme} />}
      {isLoggedIn && currentDeviceWidth === 'desktop' && (
        <LoggedNavList theme={theme} />
      )}
      {isLoggedIn &&
        (currentDeviceWidth === 'tablet' ||
          currentDeviceWidth === 'mobile') && (
          <BurgerButton onClick={handleMenuOpen} theme={theme} />
        )}
    </nav>
  );
};

export default Navigation;
