import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import { login, register, logout } from '../../utils/Auth';

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
import { useUserState } from '../../contexts/UserStateContext';

import {
  throttleThisFunc,
  fixMoviesImageUrl,
  handleError,
} from '../../utils/utils';

import {
  TABLET_WIDTH,
  MOBILE_WIDTH,
  IMAGES_URL,
  SHORT_FILM_DURATION,
  MOBILE_MOVIES_COUNT,
  TABLET_MOVIES_COUNT,
  DESKTOP_MOVIES_COUNT,
  LOCALSTORAGE_SEARCH_STATE_NAME,
} from '../../utils/constants';

const App = () => {
  const [appState, setAppState] = useAppState();
  const [, setUserInfoState] = useUserState();

  const navigate = useNavigate();

  const updateCurrentLayout = () => {
    if (window.innerWidth <= MOBILE_WIDTH) {
      setAppState((prev) => ({
        ...prev,
        currentDeviceWidth: 'mobile',
        visibleMoviesCountBase: MOBILE_MOVIES_COUNT,
      }));
      return;
    }

    if (window.innerWidth <= TABLET_WIDTH) {
      setAppState((prev) => ({
        ...prev,
        currentDeviceWidth: 'tablet',
        visibleMoviesCountBase: TABLET_MOVIES_COUNT,
      }));
      return;
    }

    setAppState((prev) => ({
      ...prev,
      currentDeviceWidth: 'desktop',
      visibleMoviesCountBase: DESKTOP_MOVIES_COUNT,
    }));
  };

  const throttledUpdateCurrentLayout = throttleThisFunc(
    updateCurrentLayout,
    1000,
  );

  const getMoviesData = async () => {
    try {
      return fixMoviesImageUrl(await moviesApi.getMovies(), IMAGES_URL);
    } catch (err) {
      console.log(err);
    }
  };

  const preparePage = (userInfo) => {
    setUserInfoState({ ...userInfo });
    setAppState((prev) => ({ ...prev, isLoggedIn: true }));
    navigate('/movies', { replace: true });
  };

  const handleLogin = (data, showMessage) => {
    const signin = async () => {
      const userInfo = await login(data);
      preparePage(userInfo);
    };
    handleError(signin(), showMessage);
  };

  const handleRegister = (data, showMessage) => {
    const { email, password } = data;
    const authorize = async () => {
      await register(data);
      return handleLogin({ email, password });
    };
    return handleError(authorize(), showMessage);
  };

  const handleLogout = (showMessage) => {
    const signOut = async () => {
      await logout();
      navigate('/', { replace: true });
      setAppState({
        ...appState,
        isLoggedIn: false,
      });
      localStorage.removeItem(LOCALSTORAGE_SEARCH_STATE_NAME);
    };
    handleError(signOut(), showMessage);
  };

  const handleUserUpdate = (data, showMessage) => {
    const userUpdate = async () => {
      const userInfo = await mainApi.updateUser(data);
      setUserInfoState({ ...userInfo });
    };
    handleError(userUpdate(), showMessage);
  };

  const initialPageLoad = async () => {
    let isLoggedIn = false;
    let userInfo = null;
    const execAutoLogin = async () => {
      userInfo = await mainApi.getUserInfo();
      isLoggedIn = true;
      setUserInfoState({ ...userInfo });
    };
    await handleError(execAutoLogin());

    setAppState({
      ...appState,
      isMenuOpened: false,
      isLoggedIn,
    });

    updateCurrentLayout();
  };

  useEffect(() => {
    initialPageLoad();

    window.addEventListener('resize', throttledUpdateCurrentLayout);

    return () =>
      window.removeEventListener('resize', throttledUpdateCurrentLayout);
  }, []);

  return (
    <div className="app">
      {appState.isLoggedIn && appState.currentDeviceWidth !== 'desktop' && (
        <LoggedNavList />
      )}
      <Routes>
        <Route element={<HeaderLayout />}>
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <Movies
                shortFilmDuration={SHORT_FILM_DURATION}
                getMoviesData={getMoviesData}
              />
            }
          />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route
            path="/profile"
            element={
              <Profile
                onUserUpdate={handleUserUpdate}
                onLogout={handleLogout}
              />
            }
          />
        </Route>
        <Route path="/signin" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/signup"
          element={<Register onRegister={handleRegister} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Routes>
        <Route path="/*" element={<FooterRoutes />} />
      </Routes>
    </div>
  );
};

export default App;
