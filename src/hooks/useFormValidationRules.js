const checkInputExtraRules = ({ name, value }) => {
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

export default checkInputExtraRules;
