import validator from 'validator';

class InputValidator {
  static inputRules = {
    email: [
      (value) => (validator.isEmail(value) ? null : 'Некорректный email'),
    ],
  };

  // Если правило нарушено - вернет строку, иначе null
  static getValidationError(input, value) {
    return this.inputRules[input]?.reduce((res, rule) => rule(value), null);
  }
}

export default InputValidator;
