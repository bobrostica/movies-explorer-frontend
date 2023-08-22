import React from 'react';
import { Link } from 'react-router-dom';
import FormTitle from '../FormTitle/FormTitle';

import './AuthForm.css';
import Logo from '../Logo/Logo';

const AuthForm = ({
  className,
  title,
  buttonText,
  additionalText,
  link,
  linkText,
  children,
}) => (
  <section className={`auth-form ${className || ''}`}>
    <Logo className="auth-form__logo" />
    <FormTitle className="auth-form__title">
      {title || 'Catch phrase'}
    </FormTitle>
    <form className="auth-form__form" name="auth-form">
      <fieldset className="auth-form__fieldset">
        {children}
        <span className="auth-form__error">Что-то пошло не так...</span>
      </fieldset>
      <button className="auth-form__submit-button" type="submit">
        {buttonText || 'Отправить'}
      </button>
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

export default AuthForm;
