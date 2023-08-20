function throttleThisFunc(callee, delay) {
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

export default throttleThisFunc;
