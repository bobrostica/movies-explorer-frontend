import React from 'react';

import './Portfolio.css';
import TextLink from '../TextLink/TextLink';
import LinkArrow from '../LinkArrow/LinkArrow';

const Portfolio = () => (
  <div className="student-section__portfolio">
    <h3 className="student-section__portfolio-title">Портфолио</h3>
    <ul className="student-section__portfolio-list">
      <li className="student-section__list-item">
        <TextLink
          href="https://github.com/sergasent/how-to-learn"
          className="student-section__portfolio-link"
          target="_blank"
          rel="noreferrer"
        >
          <p className="student-section__link-text">Статичный сайт</p>
          <LinkArrow className="student-section__link-symbol" />
        </TextLink>
      </li>
      <li className="student-section__list-item">
        <TextLink
          href="https://github.com/sergasent/russian-travel"
          className="student-section__portfolio-link"
          target="_blank"
          rel="noreferrer"
        >
          <p className="student-section__link-text">Адаптивный сайт</p>
          <LinkArrow className="student-section__link-symbol" />
        </TextLink>
      </li>
      <li className="student-section__list-item">
        <TextLink
          href="https://github.com/sergasent/mesto-react"
          className="student-section__portfolio-link"
          target="_blank"
          rel="noreferrer"
        >
          <p className="student-section__link-text">
            Одностраничное приложение
          </p>
          <LinkArrow className="student-section__link-symbol" />
        </TextLink>
      </li>
    </ul>
  </div>
);

export default Portfolio;
