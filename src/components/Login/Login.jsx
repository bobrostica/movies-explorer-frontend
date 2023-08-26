import React from 'react';

import AuthForm from '../../ui/AuthForm/AuthForm';
import FormInput from '../../ui/FormInput/FormInput';
import MainContainer from '../../ui/MainContainer/MainContainer';

const Login = () => (
  <MainContainer>
    <AuthForm
      className="login"
      title="Рады видеть!"
      buttonText="Войти"
      additionalText="Ещё не зарегистрированы? "
      link="/signup"
      linkText="Регистрация"
    >
      <FormInput
        required
        minlength="2"
        maxlength="30"
        labelText="E-mail"
        placeholder="Введите email"
        labelClass="auth-form__label"
        inputClass="auth-form__input"
        containerClass="auth-form__input-field"
        type="email"
        name="email"
        value="pochta@yandex.ru"
        id="email"
      />
      <FormInput
        required
        labelText="Пароль"
        placeholder="Ваш пароль"
        labelClass="auth-form__label"
        inputClass="auth-form__input"
        containerClass="auth-form__input-field"
        type="password"
        name="password"
        id="password"
      />
    </AuthForm>
  </MainContainer>
);

export default Login;
