import { useEffect, useState } from 'react';

import InputValidator from '../utils/InputValidator';

const useFormValidation = ({ isOpen, inputs }) => {
  const [isFormValid, setFormValid] = useState(false);

  const [formValues, setFormValues] = useState(inputs);
  const [validState, setValidState] = useState({});

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setValidState({
      ...validState,
      [name]: evt.target.validationMessage,
    });

    const extraValidationError = InputValidator.getValidationError(name, value);

    if (extraValidationError) {
      setValidState({
        ...validState,
        [name]: extraValidationError,
      });
    }
    setFormValid(
      evt.target.closest('form').checkValidity() && !extraValidationError,
    );
  };

  const refreshForm = (refreshInputs) => {
    setFormValues({ ...refreshInputs });
    setValidState({});
  };

  useEffect(() => {
    if (isOpen) {
      setFormValid(false);
      refreshForm(inputs);
    }
  }, [isOpen]);

  return { isFormValid, formValues, validState, handleChange, refreshForm };
};

export default useFormValidation;
