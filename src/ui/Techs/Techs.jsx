import React from 'react';

import './Techs.css';
import MainSection from '../MainSection/MainSection';

const Techs = () => (
  <MainSection
    isSecondaryLayoutScheme
    className="techs-section"
    title="Технологии"
  >
    <p className="techs-section__title">7 технологий</p>
    <p className="techs-section__subtitle">
      На курсе веб-разработки мы освоили технологии, которые применили в
      дипломном проекте.
    </p>

    <ul className="techs-section__list">
      <li className="techs-section__list-item">HTML</li>
      <li className="techs-section__list-item">CSS</li>
      <li className="techs-section__list-item">JS</li>
      <li className="techs-section__list-item">React</li>
      <li className="techs-section__list-item">Git</li>
      <li className="techs-section__list-item">Express.js</li>
      <li className="techs-section__list-item">mongoDB</li>
    </ul>
  </MainSection>
);

export default Techs;
