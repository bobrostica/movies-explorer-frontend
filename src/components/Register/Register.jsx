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
        labelText="Имя"
        labelClass="auth-form__label"
        inputClass="auth-form__input"
        containerClass="auth-form__input-field"
        type="text"
        value="Виталий"
        id="name"
      />
      <FormInput
        labelText="E-mail"
        labelClass="auth-form__label"
        inputClass="auth-form__input"
        containerClass="auth-form__input-field"
        type="email"
        value="pochta@yandex.ru"
        id="email"
      />
      <FormInput
        labelText="Пароль"
        labelClass="auth-form__label"
        inputClass="auth-form__input"
        containerClass="auth-form__input-field"
        type="password"
        id="password"
      />
    </AuthForm>
  </MainContainer>
);

export default Register;
