import React from 'react';
// import { useLocation } from 'react-router-dom';
import AuthForm from '../../ui/AuthForm/AuthForm';
import FormInput from '../../ui/FormInput/FormInput';
import MainContainer from '../../ui/MainContainer/MainContainer';
import useFormValidation from '../../hooks/useFormValidation';
import usePending from '../../hooks/usePending';

const Register = ({ onRegister }) => {
  const { isPending, pendingFunc } = usePending();
  const { isFormValid, formValues, validState, handleChange } =
    useFormValidation({
      inputs: {
        name: '',
        email: '',
        password: '',
      },
    });

  const handleSubmit = async (showMessage) => {
    pendingFunc(
      onRegister(
        {
          name: formValues?.name,
          email: formValues?.email,
          password: formValues?.password,
        },
        showMessage,
      ),
    );
  };

  return (
    <MainContainer>
      <AuthForm
        className="register"
        title="Добро пожаловать!"
        buttonText={isPending ? 'Загрузка' : 'Зарегистрироваться'}
        additionalText="Уже зарегистрированы? "
        link="/signin"
        linkText="Войти"
        onSubmit={handleSubmit}
        isFormValid={isFormValid}
        isSubmitDisabled={isPending}
      >
        <FormInput
          disabled={isPending}
          type="text"
          name="name"
          id="name"
          value={formValues?.name ?? ''}
          onChange={handleChange}
          required
          minlength="2"
          maxlength="30"
          errorMessage={validState?.name}
          labelText="Имя"
          placeholder="Ваше имя"
          labelClass="auth-form__label"
          inputClass="auth-form__input"
          containerClass="auth-form__input-field"
          errorClass="auth-form__validation-error"
        />
        <FormInput
          disabled={isPending}
          type="email"
          name="email"
          id="email"
          value={formValues?.email ?? ''}
          onChange={handleChange}
          required
          errorMessage={validState?.email}
          labelText="E-mail"
          placeholder="Введите email"
          labelClass="auth-form__label"
          inputClass="auth-form__input"
          containerClass="auth-form__input-field"
          errorClass="auth-form__validation-error"
        />
        <FormInput
          disabled={isPending}
          type="password"
          name="password"
          id="password"
          value={formValues?.password ?? ''}
          onChange={handleChange}
          required
          minlength="8"
          errorMessage={validState?.password}
          labelText="Пароль"
          placeholder="Ваш пароль"
          labelClass="auth-form__label"
          inputClass="auth-form__input"
          containerClass="auth-form__input-field"
          errorClass="auth-form__validation-error"
        />
      </AuthForm>
    </MainContainer>
  );
};

export default Register;
