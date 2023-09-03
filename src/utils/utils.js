import {
  DEFAULT_ERROR_MESSAGE,
  LOCALSTORAGE_SEARCH_STATE_NAME,
} from './constants';

// Форматирование времени
export const getPrettyDuration = (movieDuration) => {
  if (movieDuration < 60) {
    return `${movieDuration}м`;
  }

  const hours = Math.floor(movieDuration / 60);
  const minutes = movieDuration % 60;

  return `${hours}ч${minutes}м`;
};

// HOC задержки для функции
export function throttleThisFunc(callee, delay) {
  let isThrottled = null;
  let savedArgs = null;
  let savedThis = null;

  return function wrapper(...args) {
    if (isThrottled) {
      savedArgs = args;
      savedThis = this;
      return;
    }

    callee.apply(this, args);

    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;

      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = null;
        savedThis = null;
      }
    }, delay);
  };
}

// Создание нормализованного movie
export const fixMovieScheme = (movie, imageBaseUrl) => {
  let { image, movieId } = movie;

  // Если movie от beat-films, то меняем поля
  if (!movieId) {
    image = imageBaseUrl + image.url;
    movieId = movie.id;
  }

  return {
    country: movie.country,
    director: movie.director,
    duration: movie.duration,
    year: movie.year,
    description: movie.description,
    trailerLink: movie.trailerLink,
    nameRU: movie.nameRU,
    nameEN: movie.nameEN,
    movieId,
    image,
    thumbnail: image,
  };
};

// Приводим объекты, полученные от beat-film к общему виду с бэком
export const prepareMovies = (
  savedMovieList,
  moviesList,
  imageBaseUrl = '',
) => {
  const savedMoviesMap = new Map();
  savedMovieList.forEach((movie) => savedMoviesMap.set(movie.movieId, movie));
  return moviesList.map((movie) => {
    if (savedMoviesMap.has(movie.id || movie.movieId)) {
      return savedMoviesMap.get(movie.id || movie.movieId);
    }

    return fixMovieScheme(movie, imageBaseUrl);
  });
};

// Общий обработчик ошибок для промисов
export const handleError = (promise, pushErrorMessage) => {
  return promise.catch((err) => {
    if (pushErrorMessage) {
      pushErrorMessage(err.message);
      return;
    }

    console.log(err);
  });
};

// Обработчик ответа от сервера
export const handleResponse = async (response) => {
  let resData = null;
  try {
    resData = await response.json();
  } catch {
    return new Error(DEFAULT_ERROR_MESSAGE);
  }

  if (response.ok) {
    return resData;
  }

  return Promise.reject(new Error(resData.error ?? resData.message));
};

// Глубокое сравнение двух объектов
export const compareIsDeepEqual = (object1, object2) => {
  const isObject = (object) => object != null && typeof object === 'object';

  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areBothObjects = isObject(val1) && isObject(val2);
    if (
      (areBothObjects && !compareIsDeepEqual(val1, val2)) ||
      (!areBothObjects && val1 !== val2)
    ) {
      return false;
    }
  }
  return true;
};

// Получение параметров последнего поиска
export const getSearchState = () => {
  const lastSearch = localStorage.getItem(LOCALSTORAGE_SEARCH_STATE_NAME);

  if (!lastSearch) {
    return;
  }

  const { isShortFilmChecked, searchString, searchResult } =
    JSON.parse(lastSearch);

  return { isShortFilmChecked, searchString, searchResult };
};

// Сохранение параметров последнего поиска
export const saveSearchState = (searchState) => {
  localStorage.setItem(
    LOCALSTORAGE_SEARCH_STATE_NAME,
    JSON.stringify(searchState),
  );
};

// Удаление параметров последнего поиска
export const removeSearchState = () => {
  localStorage.removeItem(LOCALSTORAGE_SEARCH_STATE_NAME);
};

// Получаем отфильтрованный массив
export const getMoviesByNameContains = (
  moviesList,
  searchStr,
  shortFilmDuration,
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
