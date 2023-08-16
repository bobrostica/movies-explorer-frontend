import React from 'react';

import './Footer.css';
import TextLink from '../TextLink/TextLink';
import MainSection from '../MainSection/MainSection';
import FlexList from '../FlexList/FlexList';

const Footer = ({ githubLink }) => (
  <MainSection className="footer">
    <h2 className="footer__title">
      Учебный проект Яндекс.Практикум х BeatFilm.
    </h2>
    <div className="footer__container">
      <p className="footer__copyright">© 2023</p>
      <nav>
        <FlexList className="footer__nav-list">
          <li>
            <TextLink
              href="https://practicum.yandex.ru"
              className="student-section__portfolio-link"
              target="_blank"
              rel="noreferrer"
            >
              Яндекс.Практикум
            </TextLink>
          </li>
          <li>
            <TextLink
              href={githubLink}
              className="student-section__portfolio-link"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </TextLink>
          </li>
        </FlexList>
      </nav>
    </div>
  </MainSection>
);

export default Footer;
