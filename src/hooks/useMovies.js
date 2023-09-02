import { useState } from 'react';
import {
  getSearchState,
  removeSearchState,
  saveSearchState,
} from '../utils/utils';

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

  // Обработчик ошибок
  const handleError = async (func) => {
    try {
      await func();
    } catch (err) {
      setErrorMessage(
        'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
      );
      removeSearchState();
    }
  };

  // Отфильтрованный массив сохраняем в localStorage и в state
  const filterMovies = (movies, searchStr, isShort) => {
    const searchResult = getMoviesByNameContains(movies, searchStr, isShort);

    if (searchResult.length === 0) {
      setErrorMessage('Ничего не найдено');
      removeSearchState();
      return;
    }

    saveSearchState({
      isShortFilmChecked: isShort,
      searchString: searchStr,
      searchResult,
    });
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
      removeSearchState();
      return;
    }

    if (errorMessage) {
      setErrorMessage('');
    }

    const movies = await loadMoviesData();
    filterMovies(movies, searchStr, isShortFilmChecked);
  };

  // Обработчик переключателя
  const handleShortFilmChecked = (isChecked) => {
    setIsShortFilmChecked(isChecked);
  };

  // Загружаемся из localStorage
  const loadSearchState = () => {
    const lastSearch = getSearchState();

    if (!lastSearch) {
      return;
    }

    const {
      isShortFilmChecked: isShort,
      searchString: searchStr,
      searchResult: searchRes,
    } = lastSearch;

    if (moviesData.length === 0) {
      setMoviesData(searchRes);
    }

    setSearchString(searchStr);
    setFilteredMovies(searchRes);
    setIsShortFilmChecked(isShort);
  };

  // Показ короткометражек
  const filterShortFilm = () => {
    if (searchString && moviesData.length > 0) {
      // Обновляем содержимове moviesData
      loadMoviesData();
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
    setMoviesData,
    isLoading,
    errorMessage,
    searchString,
    filteredMovies,
    isShortFilmChecked,
  };
};

export default useMovies;
