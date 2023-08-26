import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Profile.css';
import FormTitle from '../../ui/FormTitle/FormTitle';
import FormInput from '../../ui/FormInput/FormInput';
import SubmitButton from '../../ui/SubmitButton/SubmitButton';
import ErrorTextField from '../../ui/ErrorTextField/ErrorTextField';

const Profile = () => {
  const [userName] = useState('Виталий');
  const [email] = useState('pochta@yandex.ru');
  const [isWantToEdit, setIsWantToEdit] = useState(false);

  const navigate = useNavigate();

  return (
    <section className="profile">
      <FormTitle className="profile__title">{`Привет, ${userName}!`}</FormTitle>
      <form className="profile__form" name="profile-form">
        <fieldset className="profile__form-fieldset">
          <FormInput
            required
            minlength="2"
            maxlength="30"
            id="name"
            name="name"
            placeholder="Введите ваше имя"
            value={userName}
            type="text"
            labelText="Имя"
            containerClass="profile__input-field"
            labelClass="profile__label"
            inputClass="profile__input"
          />
          <FormInput
            required
            id="email"
            name="email"
            placeholder="Ваш email"
            value={email}
            type="email"
            labelText="E-mail"
            containerClass="profile__input-field"
            labelClass="profile__label"
            inputClass="profile__input"
          />
        </fieldset>
        {isWantToEdit ? (
          <>
            <ErrorTextField className="profile__error" scheme="profile">
              При обновлении профиля произошла ошибка
            </ErrorTextField>
            <SubmitButton className="profile__submit-button">
              Сохранить
            </SubmitButton>
          </>
        ) : (
          <button
            className="profile__button"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              setIsWantToEdit(true);
            }}
          >
            Редактировать
          </button>
        )}
      </form>
      {!isWantToEdit && (
        <button
          className="profile__button profile__button_type_logout"
          type="button"
          onClick={() => navigate('/signin', { replace: true })}
        >
          Выйти из аккаунта
        </button>
      )}
    </section>
  );
};

export default Profile;
