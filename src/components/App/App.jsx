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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [moviesData, setMoviesData] = useState([]);
  const [savedMoviesData, setSavedMoviesData] = useState([]);
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

  // Запрос сохраненных фильмов с nomoreparties
  const getSavedMoviesData = async () => {
    if (savedMoviesData.length === 0) {
      let movies = [];
      const getMovies = async () => {
        movies = (await mainApi.getSavedMovies()).reverse();
        setSavedMoviesData(movies);
      };
      await handleError(getMovies());
      return movies;
    }

    return savedMoviesData;
  };

  // Запрос всех фильмов с beat-films
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
  };

  const updateMoviesStates = (savedMovies) => {
    const preparedMovies = prepareMovies(savedMovies, moviesData);
    updateLocalStoredMovies(savedMovies);
    setMoviesData(preparedMovies);
    setSavedMoviesData(savedMovies);
  };

  // Удаление фильма по роуту /saved-movies
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
          const savedMovies = [savedMovie, ...savedMoviesData];
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
    setIsLoading(false);

    updateCurrentLayout();
  };

  useEffect(() => {
    initialPageLoad();

    window.addEventListener('resize', throttledUpdateCurrentLayout);

    return () =>
      window.removeEventListener('resize', throttledUpdateCurrentLayout);
  }, []);

  // При загрузке страницы, отрисовка происходит раньше, чем приходит ответ на запрос
  // к серверу getUserInfo. Поэтому наличие кука с jwt не определено, для всех
  // дочерних компонентов isLoggedIn в appState будет равен undefined. Если,
  // например, на роуте /movies обновить страницу, то отработает ProtectedRoute
  // в котором isLoggedId будет undefined и произойдет редирект на "/"
  // Поэтому здесь, пока не получим ответ, отображается заглушка
  if (isLoading) {
    return <main />;
  }

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
              <ProtectedRoute
                element={Movies}
                moviesData={moviesData}
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
              <ProtectedRoute
                element={SavedMovies}
                moviesData={savedMoviesData}
                shortFilmDuration={SHORT_FILM_DURATION}
                getMoviesData={getSavedMoviesData}
                onCardControlClick={handleDeleteMovie}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
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
        <Route path="*" element={<ProtectedRoute element={NotFound} />} />
      </Routes>

      <Routes>
        <Route path="/*" element={<FooterRoutes />} />
      </Routes>
    </div>
  );
};

export default App;
