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
