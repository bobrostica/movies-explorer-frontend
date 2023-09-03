import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormTitle from '../FormTitle/FormTitle';

import './AuthForm.css';
import Logo from '../Logo/Logo';
import SubmitButton from '../SubmitButton/SubmitButton';
import MessageTextField from '../ErrorTextField/MessageTextField';

const AuthForm = ({
  isFormValid,
  isSubmitDisabled,
  onSubmit,
  className,
  title,
  buttonText,
  additionalText,
  link,
  linkText,
  children,
}) => {
  const [errorMessage, setErrorMessage] = useState('');

  const showError = (message) => {
    setErrorMessage(message);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    onSubmit(showError);
  };

  return (
    <section className={`auth-form ${className || ''}`}>
      <Logo className="auth-form__logo" />
      <FormTitle className="auth-form__title">
        {title || 'Catch phrase'}
      </FormTitle>
      <form
        className="auth-form__form"
        name="auth-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <fieldset className="auth-form__fieldset">{children}</fieldset>
        {errorMessage && (
          <MessageTextField className="auth-form__submit-error">
            {errorMessage}
          </MessageTextField>
        )}
        <SubmitButton
          className="auth-form__submit-button"
          ariaLabel="Отправить"
          isDisabled={!isFormValid || isSubmitDisabled}
        >
          {buttonText || 'Отправить'}
        </SubmitButton>
      </form>
      <p className="auth-form__subtext">
        {additionalText || ''}
        {link ? (
          <Link className="auth-form__link" to={link}>
            {linkText || 'Click me'}
          </Link>
        ) : (
          ''
        )}
      </p>
    </section>
  );
};

export default AuthForm;
