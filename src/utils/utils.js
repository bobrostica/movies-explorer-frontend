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

export const isDeepEqual = (object1, object2) => {
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
      (areBothObjects && !isDeepEqual(val1, val2)) ||
      (!areBothObjects && val1 !== val2)
    ) {
      return false;
    }
  }
  return true;
};
