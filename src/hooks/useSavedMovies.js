import { useState, useEffect } from 'react';

import { getMoviesByNameContains } from '../utils/utils';
import { SEARCH_ERROR_MESSAGE } from '../utils/constants';

const useSavedMovies = ({ shortFilmDuration, getMoviesData }) => {
  const [moviesData, setMoviesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchString, setSearchString] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isShortFilmChecked, setIsShortFilmChecked] = useState(false);

  // Фильтр короткометражек
  const getShortMovies = (moviesList, maxDuration) => {
    return moviesList?.filter(({ duration }) => duration <= maxDuration);
  };

  // Отправляем массив на фильтрацию, сохраняем результат
  const filterMovies = ({ movies, searchStr, isShort }) => {
    let searchResult = [];
    if (searchStr) {
      searchResult = getMoviesByNameContains(
        movies,
        searchStr,
        shortFilmDuration,
        isShort,
      );
    }

    if (!searchStr && isShort) {
      searchResult = getShortMovies(movies, shortFilmDuration);
    }

    if (!searchStr && !isShort) {
      searchResult = moviesData;
    }

    if (searchResult.length === 0) {
      setErrorMessage('Ничего не найдено');
      return;
    }

    setFilteredMovies(searchResult);
  };

  const refreshMovieStates = () => {
    try {
      setErrorMessage('');
      filterMovies({
        movies: moviesData,
        searchStr: searchString,
        isShort: isShortFilmChecked,
      });
    } catch (err) {
      setErrorMessage(SEARCH_ERROR_MESSAGE);
    }
  };

  const initialLoad = () => {
    getMoviesData();
  };

  // Обработчик кнопки поиска
  const handleSearchSubmit = async (searchStr) => {
    setSearchString(searchStr);

    if (!searchStr) {
      setErrorMessage('Нужно ввести ключевое слово');
      return;
    }

    if (errorMessage) {
      setErrorMessage('');
    }

    setIsLoading(true);
    filterMovies({
      movies: moviesData,
      searchStr,
      isShort: isShortFilmChecked,
    });
    setIsLoading(false);
  };

  // Обработчик переключателя
  const handleShortFilmChecked = (isChecked) => {
    setIsShortFilmChecked(isChecked);
  };

  useEffect(() => {
    refreshMovieStates();
  }, [moviesData, isShortFilmChecked]);

  return {
    handleSearchSubmit,
    handleShortFilmChecked,
    setMoviesData,
    initialLoad,
    isLoading,
    errorMessage,
    searchString,
    filteredMovies,
    isShortFilmChecked,
  };
};

export default useSavedMovies;
