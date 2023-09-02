import React, { useEffect, useState } from 'react';
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
  handleError,
  prepareMovies,
  getSearchState,
  saveSearchState,
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
  const [moviesData, setMoviesData] = useState([]);
  const [savedMoviesData, setSavedMoviesData] = useState([]);
  const [lastSearchState, setLastSearchState] = useState([]);
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

  const getSavedMoviesData = async () => {
    if (savedMoviesData.length === 0) {
      let movies = [];
      const getMovies = async () => {
        movies = await mainApi.getSavedMovies();
        setSavedMoviesData(movies);
      };
      await handleError(getMovies());
      return movies;
    }

    return savedMoviesData;
  };

  const getMoviesData = async () => {
    // Загружаем также сохраненные, чтобы корректно включить чекбоксы в /movies
    const savedMovies = await getSavedMoviesData();
    let newMovies = moviesData;

    if (newMovies.length === 0) {
      const getMovies = async () => {
        newMovies = await moviesApi.getMovies();
      };
      await handleError(getMovies());
    }

    const preparedMovies = prepareMovies(savedMovies, newMovies, IMAGES_URL);
    setMoviesData(preparedMovies);

    return preparedMovies;
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

  const updateLocalStoredMovies = (savedMovies) => {
    const { searchResult, ...args } = getSearchState();
    const preparedMovies = prepareMovies(savedMovies, searchResult);
    saveSearchState({ searchResult: preparedMovies, ...args });
    setLastSearchState(preparedMovies);
  };

  const updateMoviesStates = (savedMovies) => {
    const preparedMovies = prepareMovies(savedMovies, moviesData);
    updateLocalStoredMovies(savedMovies);
    setMoviesData(preparedMovies);
    setSavedMoviesData(savedMovies);
  };

  // Eдаление фильма по роуту /saved-movies
  const handleDeleteMovie = (movie) => {
    return handleError(
      (async () => {
        await mainApi.deleteMovie(movie._id);
        const savedMovies = savedMoviesData.filter(
          (savedMovie) => savedMovie._id !== movie._id,
        );
        updateMoviesStates(savedMovies);
      })(),
    );
  };

  // Сохранение/удаление фильма по роуту /movies
  const handleMovieOperate = (movie, isSaving) => {
    if (isSaving) {
      return handleError(
        (async () => {
          const savedMovie = await mainApi.saveMovie(movie);
          const savedMovies = [...savedMoviesData, savedMovie];
          updateMoviesStates(savedMovies);
        })(),
      );
    }

    return handleDeleteMovie(movie);
  };

  const initialPageLoad = async () => {
    const execAutoLogin = async () => {
      const userInfo = await mainApi.getUserInfo();

      setAppState({
        ...appState,
        isMenuOpened: false,
        isLoggedIn: true,
      });
      setUserInfoState({ ...userInfo });
    };
    await handleError(execAutoLogin());

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
                moviesData={moviesData}
                lastSearchState={lastSearchState}
                shortFilmDuration={SHORT_FILM_DURATION}
                getMoviesData={getMoviesData}
                onCardControlClick={handleMovieOperate}
                loadSavedMovies={getSavedMoviesData}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <SavedMovies
                savedMovies={savedMoviesData}
                onDeleteMovie={handleDeleteMovie}
              />
            }
          />
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
