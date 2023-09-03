import React, { useEffect, useState } from 'react';

import './Profile.css';
import FormTitle from '../../ui/FormTitle/FormTitle';
import FormInput from '../../ui/FormInput/FormInput';
import SubmitButton from '../../ui/SubmitButton/SubmitButton';
import MessageTextField from '../../ui/ErrorTextField/MessageTextField';
import { useUserState } from '../../contexts/UserStateContext';

import useFormValidation from '../../hooks/useFormValidation';
import usePending from '../../hooks/usePending';
import useCompareState from '../../hooks/useCompareState';

const Profile = ({ onUserUpdate, onLogout }) => {
  const [{ name, email }] = useUserState();
  const [isWantToEdit, setIsWantToEdit] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { isStateChanged, updateBaseState, compareState } = useCompareState({
    name,
    email,
  });
  const { isPending, pendingFunc } = usePending();
  const { isFormValid, formValues, validState, handleChange } =
    useFormValidation({
      inputs: {
        name,
        email,
      },
    });

  const showError = (message) => {
    setErrorMessage(message);
    setSuccessMessage('');
  };

  const handleEditClick = () => {
    setIsWantToEdit(true);
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('Данные успешно обновлены');

    const userInfo = {
      name: formValues?.name,
      email: formValues?.email,
    };
    pendingFunc(onUserUpdate(userInfo, showError));
    updateBaseState(userInfo);
  };

  const handleLogout = () => {
    onLogout(showError);
  };

  useEffect(() => {
    compareState(formValues);
    setSuccessMessage('');
  }, [formValues]);

  return (
    <section className="profile">
      <FormTitle className="profile__title">{`Привет, ${name}!`}</FormTitle>
      <form
        className="profile__form"
        name="profile-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <fieldset className="profile__form-fieldset">
          <FormInput
            value={formValues?.name ?? ''}
            errorMessage={validState?.name}
            onChange={handleChange}
            disabled={!isWantToEdit || isPending}
            required
            minlength="2"
            maxlength="30"
            id="name"
            name="name"
            placeholder="Введите ваше имя"
            type="text"
            labelText="Имя"
            containerClass="profile__input-field"
            labelClass="profile__label"
            inputClass="profile__input"
            errorClass="profile__validation-error"
          />
          <FormInput
            value={formValues?.email ?? ''}
            errorMessage={validState?.email}
            onChange={handleChange}
            disabled={!isWantToEdit || isPending}
            required
            id="email"
            name="email"
            placeholder="Ваш email"
            type="email"
            labelText="E-mail"
            containerClass="profile__input-field"
            labelClass="profile__label"
            inputClass="profile__input"
            errorClass="profile__validation-error"
          />
        </fieldset>

        {errorMessage && (
          <MessageTextField className="profile__message" scheme="profile-error">
            {errorMessage}
          </MessageTextField>
        )}
        {successMessage && (
          <MessageTextField
            className="profile__message"
            scheme="profile-success"
          >
            {successMessage}
          </MessageTextField>
        )}
        {isWantToEdit ? (
          <SubmitButton
            className="profile__submit-button"
            isDisabled={!isFormValid || isPending || !isStateChanged}
          >
            Сохранить
          </SubmitButton>
        ) : (
          <button
            className="profile__button"
            type="button"
            onClick={handleEditClick}
          >
            Редактировать
          </button>
        )}
      </form>
      {!isWantToEdit && (
        <button
          className="profile__button profile__button_type_logout"
          type="button"
          onClick={handleLogout}
        >
          Выйти из аккаунта
        </button>
      )}
    </section>
  );
};

export default Profile;
