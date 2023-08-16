import React from 'react';

import './NavBar.css';
import TextLink from '../TextLink/TextLink';
import FlexList from '../FlexList/FlexList';

const NavBar = () => (
  <section className="nav-bar">
    <FlexList className="nav-bar__list">
      <li>
        <TextLink href="#about" className="nav-bar__link">
          О проекте
        </TextLink>
      </li>
      <li>
        <TextLink href="#techs" className="nav-bar__link">
          Технологии
        </TextLink>
      </li>
      <li>
        <TextLink href="#student" className="nav-bar__link">
          Студент
        </TextLink>
      </li>
    </FlexList>
  </section>
);

export default NavBar;
