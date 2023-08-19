import React from 'react';

import './Portfolio.css';
import MainSection from '../MainSection/MainSection';
import TextLink from '../TextLink/TextLink';
import LinkArrow from '../LinkArrow/LinkArrow';
import FlexList from '../FlexList/FlexList';

const Portfolio = () => (
  <MainSection idName="portfolio" className="portfolio-section" paddingSize="m">
    <h3 className="portfolio-section__title">Портфолио</h3>
    <FlexList className="portfolio-section__links-list">
      <li className="portfolio-section__list-item">
        <TextLink
          href="https://github.com/sergasent/how-to-learn"
          className="portfolio-section__link"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio-section__link-text">Статичный сайт</p>
          <LinkArrow className="portfolio-section__link-symbol" />
        </TextLink>
      </li>
      <li className="portfolio-section__list-item">
        <TextLink
          href="https://github.com/sergasent/russian-travel"
          className="portfolio-section__link"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio-section__link-text">Адаптивный сайт</p>
          <LinkArrow className="portfolio-section__link-symbol" />
        </TextLink>
      </li>
      <li className="portfolio-section__list-item">
        <TextLink
          href="https://github.com/sergasent/mesto-react"
          className="portfolio-section__link"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio-section__link-text">
            Одностраничное приложение
          </p>
          <LinkArrow className="portfolio-section__link-symbol" />
        </TextLink>
      </li>
    </FlexList>
  </MainSection>
);

export default Portfolio;
