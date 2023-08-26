class InputValidator {
  inputRules = {
    email: [
      (value) =>
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
          value,
        )
          ? null
          : 'Некорректный email',
    ],
  };

  // Если правило нарушено - вернет строку, иначе null
  static getValidationError(input, value) {
    return this.inputRules[input]?.reduce((res, rule) => rule(value), null);
  }
}

export default InputValidator;
