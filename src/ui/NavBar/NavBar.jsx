import React from 'react';

import './NavBar.css';

const NavBar = () => (
  <section className="nav-bar">
    <ul className="nav-bar__list">
      <li>
        <a href="#about" className="nav-bar__link">
          О проекте
        </a>
      </li>
      <li>
        <a href="#techs" className="nav-bar__link">
          Технологии
        </a>
      </li>
      <li>
        <a href="#student" className="nav-bar__link">
          Студент
        </a>
      </li>
    </ul>
  </section>
);

export default NavBar;
