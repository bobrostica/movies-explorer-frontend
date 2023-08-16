import React from 'react';

import './AboutMe.css';
import MainSection from '../MainSection/MainSection';
import studentImage from '../../images/student.jpg';
import TextLink from '../TextLink/TextLink';
import SectionTitle from '../SectionTitle/SectionTitle';

const AboutMe = ({ githubLink }) => (
  <MainSection idName="student" className="student-section">
    <SectionTitle>Студент</SectionTitle>
    <div className="student-section__container">
      <div className="student-section__description">
        <h3 className="student-section__title">Иннокентий</h3>
        <p className="student-section__subtitle">Фронтенд-разработчик</p>
        <p className="student-section__text">
          Я родился и живу в Мытищах, закончил факультет педагогики ВОБЛГУ. У
          меня есть жена, дочь, дядя, тётя и зелёный попугай. Я люблю слушать
          музыку и смотреть фильмы. Недавно начал кодить и теперь считаю, что
          уже готов к высокой зарплате.
        </p>
        <TextLink
          className="student-section__github-link"
          href={githubLink}
          target="_blank"
          rel="noreferrer"
        >
          Github
        </TextLink>
      </div>
      <div>
        <img
          className="student-section__photo"
          src={studentImage}
          alt="Моё фото"
        />
      </div>
    </div>
  </MainSection>
);

export default AboutMe;
