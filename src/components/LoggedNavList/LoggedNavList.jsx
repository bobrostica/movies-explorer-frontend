import React from 'react';
import { NavLink } from 'react-router-dom';

import './LoggedNavList.css';
import ButtonLink from '../../ui/ButtonLink/ButtonLink';
import CloseMenuButton from '../../ui/CloseMenuButton/CloseMenuButton';
import { useAppState } from '../../contexts/AppStateContext';

const LoggedNavList = ({ theme }) => {
  const [{ isMenuOpened }, setAppState] = useAppState();

  const handleMenuClose = () => {
    setAppState((prev) => ({ ...prev, isMenuOpened: false }));
  };

  return (
    <ul
      className={`logged-navigation-list ${
        isMenuOpened ? 'logged-navigation-list_opened' : ''
      }`}
    >
      <li className="logged-navigation-list__item">
        <CloseMenuButton
          className="logged-navigation-list__close-button"
          onClick={handleMenuClose}
        />
      </li>
      <li className="logged-navigation-list__item">
        <NavLink
          to="/"
          onClick={handleMenuClose}
          className={({ isActive }) =>
            `logged-navigation-list__link logged-navigation-list__link_mobile-only ${
              theme ? `logged-navigation-list__link_theme_${theme}` : ''
            }  ${isActive ? 'logged-navigation-list__link_active' : ''}`
          }
        >
          Главная
        </NavLink>
      </li>
      <li className="logged-navigation-list__item">
        <NavLink
          to="/movies"
          onClick={handleMenuClose}
          className={({ isActive }) =>
            `logged-navigation-list__link ${
              theme ? `logged-navigation-list__link_theme_${theme}` : ''
            } ${isActive ? 'logged-navigation-list__link_active' : ''}`
          }
        >
          Фильмы
        </NavLink>
      </li>
      <li className="logged-navigation-list__item">
        <NavLink
          to="/saved-movies"
          onClick={handleMenuClose}
          className={({ isActive }) =>
            `logged-navigation-list__link ${
              theme ? `logged-navigation-list__link_theme_${theme}` : ''
            } ${isActive ? 'logged-navigation-list__link_active' : ''}`
          }
        >
          Сохранённые фильмы
        </NavLink>
      </li>
      <li className="logged-navigation-list__item logged-navigation-list__item_away">
        <ButtonLink to="/profile" onClick={handleMenuClose}>
          Аккаунт
        </ButtonLink>
      </li>
    </ul>
  );
};

export default LoggedNavList;
