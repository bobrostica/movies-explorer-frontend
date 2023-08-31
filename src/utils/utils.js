import { DEFAULT_ERROR_MESSAGE } from './constants';

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

export const checkInputExtraRules = ({ name, value }) => {
  const checkRule = (regexp, inputValue, errorText) => {
    if (!regexp.test(inputValue)) {
      return errorText;
    }
    return null;
  };

  switch (name) {
    case 'email':
      return checkRule(
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
        value,
        'Некорректный email',
      );
    default:
      return null;
  }
};

export const fixMoviesImageUrl = (moviesList, baseUrl) =>
  moviesList.map((movie) => ({ ...movie, image: baseUrl + movie.image.url }));

export const handleError = (promise, pushErrorMessage) => {
  return promise.catch((err) => {
    if (pushErrorMessage) {
      pushErrorMessage(err.message);
      return;
    }

    console.log(err.message);
  });
};

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
