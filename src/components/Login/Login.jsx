import React from 'react';

import AuthForm from '../../ui/AuthForm/AuthForm';
import FormInput from '../../ui/FormInput/FormInput';
import MainContainer from '../../ui/MainContainer/MainContainer';

import useFormValidation from '../../hooks/useFormValidation';
import usePending from '../../hooks/usePending';

const Login = ({ onLogin }) => {
  const { isPending, pendingFunc } = usePending();
  const { isFormValid, formValues, validState, handleChange } =
    useFormValidation({
      inputs: {
        email: '',
        password: '',
      },
    });

  const handleSubmit = async (showMessage) => {
    pendingFunc(
      onLogin(
        {
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
        className="login"
        title="Рады видеть!"
        buttonText={isPending ? 'Загрузка' : 'Войти'}
        additionalText="Ещё не зарегистрированы? "
        link="/signup"
        linkText="Регистрация"
        onSubmit={handleSubmit}
        isFormValid={isFormValid}
        isSubmitDisabled={isPending}
      >
        <FormInput
          disabled={isPending}
          onChange={handleChange}
          errorMessage={validState?.email}
          value={formValues?.email ?? ''}
          type="email"
          name="email"
          id="email"
          required
          minlength="2"
          maxlength="30"
          labelText="E-mail"
          placeholder="Введите email"
          labelClass="auth-form__label"
          inputClass="auth-form__input"
          containerClass="auth-form__input-field"
          errorClass="auth-form__validation-error"
        />
        <FormInput
          disabled={isPending}
          onChange={handleChange}
          errorMessage={validState?.password}
          value={formValues?.password ?? ''}
          type="password"
          name="password"
          id="password"
          required
          minlength="8"
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

export default Login;
