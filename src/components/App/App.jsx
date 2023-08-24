import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import FooterRoutes from '../../routes/FooterRoutes';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../../ui/NotFound/NotFound';
import HeaderLayout from '../HeaderLayout/HeaderLayout';
import LoggedNavList from '../LoggedNavList/LoggedNavList';

import { useAppState } from '../../contexts/AppStateContext';

import throttleThisFunc from '../../utils/utils';
import { TABLET_WIDTH, MOBILE_WIDTH } from '../../utils/constants';

const App = () => {
  const [appState, setAppState] = useAppState();

  const updateCurrentLayout = () => {
    if (window.innerWidth <= MOBILE_WIDTH) {
      setAppState((prev) => ({ ...prev, currentDeviceWidth: 'mobile' }));
      return;
    }

    if (window.innerWidth <= TABLET_WIDTH) {
      setAppState((prev) => ({ ...prev, currentDeviceWidth: 'tablet' }));
      return;
    }

    setAppState((prev) => ({ ...prev, currentDeviceWidth: 'desktop' }));
  };

  const throttledUpdateCurrentLayout = throttleThisFunc(
    updateCurrentLayout,
    1000,
  );

  useEffect(() => {
    setAppState({
      ...appState,
      isLoggedIn: true,
      isMenuOpened: false,
    });
    updateCurrentLayout();

    window.addEventListener('resize', throttledUpdateCurrentLayout);

    return () =>
      window.removeEventListener('resize', throttledUpdateCurrentLayout);
  }, []);

  return (
    <div className="app">
      <div
        className={`app__menu-block ${
          appState.isMenuOpened ? 'app__menu-block_visible' : ''
        }`}
      />
      {appState.isLoggedIn && appState.currentDeviceWidth !== 'desktop' && (
        <LoggedNavList />
      )}
      <Routes>
        <Route element={<HeaderLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Routes>
        <Route path="/*" element={<FooterRoutes />} />
      </Routes>
    </div>
  );
};

export default App;
