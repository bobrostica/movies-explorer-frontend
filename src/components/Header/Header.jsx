import React from 'react';
import Navigation from '../Navigation/Navigation';

import './Header.css';
import Logo from '../../ui/Logo/Logo';
import useIsCurrentLocation from '../../hooks/useIsCurrentLocation';
import { useAppState } from '../../contexts/AppStateContext';
import MenuBlock from '../../ui/MenuBlock/MenuBlock';

const Header = () => {
  const isCurrentLocation = useIsCurrentLocation('/');
  const [{ isLoggedIn, isMenuOpened }] = useAppState();

  return (
    <header className="header">
      <div className="header__container">
        <MenuBlock isVisible={isMenuOpened} />
        <Logo />
        <Navigation
          isLoggedIn={isLoggedIn}
          theme={isCurrentLocation ? 'dark' : null}
        />
      </div>
    </header>
  );
};

export default Header;
