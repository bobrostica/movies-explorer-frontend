import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Profile.css';
import FormTitle from '../../ui/FormTitle/FormTitle';
import FormInput from '../../ui/FormInput/FormInput';

const Profile = () => {
  const [userName] = useState('Виталий');
  const [email] = useState('pochta@yandex.ru');

  const navigate = useNavigate();

  return (
    <section className="profile">
      <FormTitle className="profile__title">{`Привет, ${userName}!`}</FormTitle>
      <form className="profile__form" name="profile-form">
        <fieldset className="profile__form-fieldset">
          <FormInput
            id="name"
            value={userName}
            type="text"
            labelText="Имя"
            containerClass="profile__input-field"
            labelClass="profile__label"
            inputClass="profile__input"
          />
          <FormInput
            id="email"
            value={email}
            type="email"
            labelText="E-mail"
            containerClass="profile__input-field"
            labelClass="profile__label"
            inputClass="profile__input"
          />
        </fieldset>
        <button className="profile__button" type="submit">
          Редактировать
        </button>
      </form>
      <button
        className="profile__button profile__button_type_logout"
        type="button"
        onClick={() => navigate('/signin', { replace: true })}
      >
        Выйти из аккаунта
      </button>
    </section>
  );
};

export default Profile;
