import React from 'react';

import './Navigation.css';
import LoggedNavList from '../LoggedNavList/LoggedNavList';
import NavList from '../NavList/NavList';
import { useAppState } from '../../contexts/AppStateContext';
import BurgerButton from '../../ui/BurgerButton/BurgerButton';
import {
  DESKTOP_DEVICE_NAME,
  MOBILE_DEVICE_NAME,
  TABLET_DEVICE_NAME,
} from '../../utils/constants';

const Navigation = ({ theme }) => {
  const [{ isLoggedIn, currentDeviceWidth }, setAppState] = useAppState();

  const handleMenuOpen = () => {
    setAppState((prev) => ({ ...prev, isMenuOpened: true }));
  };

  return (
    <nav className="navigation">
      {!isLoggedIn && <NavList theme={theme} />}
      {isLoggedIn && currentDeviceWidth === DESKTOP_DEVICE_NAME && (
        <LoggedNavList theme={theme} />
      )}
      {isLoggedIn &&
        (currentDeviceWidth === TABLET_DEVICE_NAME ||
          currentDeviceWidth === MOBILE_DEVICE_NAME) && (
          <BurgerButton onClick={handleMenuOpen} theme={theme} />
        )}
    </nav>
  );
};

export default Navigation;
