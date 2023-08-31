import { useState } from 'react';

import { LOCALSTORAGE_SEARCH_STATE_NAME } from '../utils/constants';

const useMovies = ({ shortFilmDuration, getMoviesData }) => {
  const [moviesData, setMoviesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchString, setSearchString] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isShortFilmChecked, setIsShortFilmChecked] = useState(false);

  // Получаем отфильтрованный массив
  const getMoviesByNameContains = (
    moviesList,
    searchStr,
    isShortFilmsOnly = false,
  ) => {
    let minDuration = Number.MAX_SAFE_INTEGER;
    const loweredSearchStr = searchStr.toLowerCase();

    if (isShortFilmsOnly) {
      minDuration = shortFilmDuration;
    }

    return moviesList?.filter(
      ({ nameRU, nameEN, duration }) =>
        (nameRU.toLowerCase().includes(loweredSearchStr) ||
          nameEN.toLowerCase().includes(loweredSearchStr)) &&
        duration <= minDuration,
    );
  };

  const saveSearchState = (searchResult, searchStr, isShort) => {
    localStorage.setItem(
      LOCALSTORAGE_SEARCH_STATE_NAME,
      JSON.stringify({
        isShortFilmChecked: isShort,
        searchString: searchStr,
        searchResult,
      }),
    );
  };

  const clearSearchState = () => {
    localStorage.removeItem(LOCALSTORAGE_SEARCH_STATE_NAME);
  };

  // Обработчик ошибок
  const handleError = async (func) => {
    try {
      await func();
    } catch (err) {
      setErrorMessage(
        'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
      );
      clearSearchState();
    }
  };

  // Отфильтрованный массив сохраняем в localStorage и в state
  const filterMovies = (movies, searchStr, isShort) => {
    const searchResult = getMoviesByNameContains(movies, searchStr, isShort);

    if (searchResult.length === 0) {
      setErrorMessage('Ничего не найдено');
      clearSearchState();
      return;
    }

    saveSearchState(searchResult, searchStr, isShort);
    setFilteredMovies(searchResult);
  };

  // Получаем карточки от api
  const loadMoviesData = async () => {
    setIsLoading(true);

    const movies = await getMoviesData();

    setIsLoading(false);

    setMoviesData(movies);

    return movies;
  };

  // Обработчик кнопки поиска
  const handleSearchSubmit = async (searchStr) => {
    setSearchString(searchStr);

    if (!searchStr) {
      setErrorMessage('Нужно ввести ключевое слово');
      clearSearchState();
      return;
    }

    if (errorMessage) {
      setErrorMessage('');
    }

    handleError(async () => {
      const movies = await loadMoviesData();
      filterMovies(movies, searchStr, isShortFilmChecked);
    });
  };

  // Обработчик переключателя
  const handleShortFilmChecked = (isChecked) => {
    setIsShortFilmChecked(isChecked);
  };

  // Загружаемся из localStorage
  const loadSearchState = () => {
    const lastSearch = localStorage.getItem(LOCALSTORAGE_SEARCH_STATE_NAME);

    if (!lastSearch) {
      return;
    }

    const {
      isShortFilmChecked: isShort,
      searchString: searchStr,
      searchResult: searchRes,
    } = JSON.parse(lastSearch);

    handleError(() => loadMoviesData());
    setSearchString(searchStr);
    setFilteredMovies(searchRes);
    setIsShortFilmChecked(isShort);
  };

  const filterShortFilm = () => {
    if (searchString && moviesData.length > 0) {
      setErrorMessage('');
      handleError(() =>
        filterMovies(moviesData, searchString, isShortFilmChecked),
      );
    }
  };

  return {
    handleSearchSubmit,
    handleShortFilmChecked,
    loadSearchState,
    filterShortFilm,
    isLoading,
    errorMessage,
    searchString,
    filteredMovies,
    isShortFilmChecked,
  };
};

export default useMovies;
