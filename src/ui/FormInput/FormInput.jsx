import React from 'react';

import './FormInput.css';
import ErrorTextField from '../ErrorTextField/ErrorTextField';

const FormInput = ({
  disabled,
  required,
  minlength,
  maxlength,
  onChange,
  placeholder,
  labelText,
  labelClass,
  inputClass,
  containerClass,
  errorClass,
  errorMessage,
  type,
  value = '',
  name,
  id = 'form-input',
}) => (
  <label className={`form-input ${containerClass || ''}`} htmlFor={id}>
    <span className={`form-input__label-text ${labelClass || ''}`}>
      {labelText}
    </span>
    <input
      disabled={disabled}
      name={name}
      placeholder={placeholder || null}
      className={`form-input__input ${inputClass || ''}`}
      id={id}
      type={type || 'text'}
      value={value}
      required={required}
      minLength={minlength}
      maxLength={maxlength}
      onChange={onChange}
    />
    <ErrorTextField className={errorClass}>{errorMessage}</ErrorTextField>
  </label>
);

export default FormInput;
