import React from 'react';
import AuthForm from '../../ui/AuthForm/AuthForm';
import FormInput from '../../ui/FormInput/FormInput';
import MainContainer from '../../ui/MainContainer/MainContainer';

const Register = () => (
  <MainContainer>
    <AuthForm
      className="register"
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      additionalText="Уже зарегистрированы? "
      link="/signin"
      linkText="Войти"
    >
      <FormInput
        required
        minlength="2"
        maxlength="30"
        labelText="Имя"
        placeholder="Ваше имя"
        labelClass="auth-form__label"
        inputClass="auth-form__input"
        containerClass="auth-form__input-field"
        type="text"
        value="Виталий"
        name="name"
        id="name"
      />
      <FormInput
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
        minlength="8"
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

export default Register;
