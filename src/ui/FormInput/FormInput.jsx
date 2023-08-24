import React, { useState } from 'react';

import './FormInput.css';

const FormInput = ({
  labelText,
  labelClass,
  inputClass,
  containerClass,
  type,
  value = '',
  id = 'form-input',
}) => {
  const [inputValue, setInputValue] = useState(value);
  return (
    <label className={`form-input ${containerClass || ''}`} htmlFor={id}>
      <span className={`form-input__label-text ${labelClass || ''}`}>
        {labelText}
      </span>
      <input
        className={`form-input__input ${inputClass || ''}`}
        id={id}
        type={type || 'text'}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </label>
  );
};

export default FormInput;
