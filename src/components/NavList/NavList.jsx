import React from 'react';
import { Link } from 'react-router-dom';

import './NavList.css';
import ButtonLink from '../../ui/ButtonLink/ButtonLink';

const NavList = ({ theme }) => (
  <ul className="navigation-list">
    <li className="navigation-list__item">
      <Link
        to="/signup"
        className={`navigation-list__link ${
          theme ? `navigation-list__link_theme_${theme}` : ''
        }`}
      >
        Регистрация
      </Link>
    </li>
    <li className="navigation-list__item navigation-list__item_away">
      <ButtonLink to="/signin" theme="fancy">
        Войти
      </ButtonLink>
    </li>
  </ul>
);

export default NavList;
