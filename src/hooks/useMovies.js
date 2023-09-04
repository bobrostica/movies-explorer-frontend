import { useEffect, useState } from 'react';
import {
  getSearchState,
  removeSearchState,
  saveSearchState,
  getMoviesByNameContains,
} from '../utils/utils';
import {
  EMPTY_STRING_ERROR_MESSAGE,
  SEARCH_ERROR_MESSAGE,
  SEARCH_NOT_FOUND_MESSAGE,
} from '../utils/constants';

const useMovies = ({ shortFilmDuration, getMoviesData }) => {
  const [moviesData, setMoviesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchString, setSearchString] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isShortFilmChecked, setIsShortFilmChecked] = useState(false);

  // Отфильтрованный массив сохраняем в localStorage и в state
  const filterMovies = (movies, searchStr, isShort) => {
    const searchResult = getMoviesByNameContains(
      movies,
      searchStr,
      shortFilmDuration,
      isShort,
    );

    if (searchResult.length === 0) {
      setErrorMessage(SEARCH_NOT_FOUND_MESSAGE);
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

  // Обновление данных о фильмах и применение текущего фильтра
  const refreshMovieStates = async () => {
    try {
      const movies = await loadMoviesData();
      filterMovies(movies, searchString, isShortFilmChecked);
    } catch (err) {
      setErrorMessage(SEARCH_ERROR_MESSAGE);
      removeSearchState();
    }
  };

  // Обработчик кнопки поиска
  const handleSearchSubmit = async (searchStr) => {
    setSearchString(searchStr);

    if (!searchStr) {
      setErrorMessage(EMPTY_STRING_ERROR_MESSAGE);
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
      setErrorMessage('');
      refreshMovieStates();
    }
  };

  useEffect(() => {
    if (searchString) {
      filterMovies(moviesData, searchString, isShortFilmChecked);
    }
  }, [moviesData]);

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
