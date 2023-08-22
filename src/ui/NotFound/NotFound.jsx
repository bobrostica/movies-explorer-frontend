import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainContainer from '../MainContainer/MainContainer';

import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  const goBack = (e) => {
    e.preventDefault();
    navigate(-1, { replace: true });
  };

  return (
    <MainContainer>
      <section className="not-found-section">
        <div className="not-found-section__description">
          <h2 className="not-found-section__title">404</h2>
          <p className="not-found-section__subtitle">Страница не найдена</p>
        </div>
        <a className="not-found-section__link" href="/" onClick={goBack}>
          Назад
        </a>
      </section>
    </MainContainer>
  );
};

export default NotFound;
