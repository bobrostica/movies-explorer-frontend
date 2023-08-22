import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <nav className="navigation">
    <ul className="navigation__list">
      <li>
        <Link to="/" className="navigation__link">
          Главная
        </Link>
      </li>
      <li>
        <Link to="/movies" className="navigation__link">
          Фильмы
        </Link>
      </li>
      <li>
        <Link to="/saved-movies" className="navigation__link">
          Сохранённые фильмы
        </Link>
      </li>
      <li>
        <Link to="/profile" className="navigation__link">
          Аккаунт
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
