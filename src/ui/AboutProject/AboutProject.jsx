import React from 'react';

import './AboutProject.css';
import MainSection from '../MainSection/MainSection';
import SectionTitle from '../SectionTitle/SectionTitle';
import FlexList from '../FlexList/FlexList';

const AboutProject = () => (
  <MainSection idName="about" className="about-section" title="О проекте">
    <SectionTitle>О проекте</SectionTitle>
    <FlexList className="about-section__steps-list">
      <li>
        <h3 className="about-section__step-subtitle">
          Дипломный проект включал 5 этапов
        </h3>
        <p className="about-section__step-text">
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </p>
      </li>
      <li>
        <h3 className="about-section__step-subtitle">
          На выполнение диплома ушло 5 недель
        </h3>
        <p className="about-section__step-text">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
          соблюдать, чтобы успешно защититься.
        </p>
      </li>
    </FlexList>
    <FlexList className="about-section__line-diagram">
      <li className="about-section__diagram-item">
        <p className="about-section__diagram-title about-section__diagram-title_accented">
          1 неделя
        </p>
        <p className="about-section__diagram-description">Back-end</p>
      </li>
      <li className="about-section__diagram-item">
        <p className="about-section__diagram-title">4 недели</p>
        <p className="about-section__diagram-description">Front-end</p>
      </li>
    </FlexList>
  </MainSection>
);

export default AboutProject;
