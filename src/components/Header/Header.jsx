import React from 'react';
import Navigation from '../Navigation/Navigation';

import './Header.css';
import Logo from '../../ui/Logo/Logo';
import useIsCurrentLocation from '../../hooks/useIsCurrentLocation';
import { useAppState } from '../../contexts/AppStateContext';

const Header = () => {
  const isCurrentLocation = useIsCurrentLocation('/');
  const [{ isLoggedIn }] = useAppState();

  return (
    <header className="header">
      <div className="header__container">
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
