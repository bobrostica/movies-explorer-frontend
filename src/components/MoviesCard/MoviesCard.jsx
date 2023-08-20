import React from 'react';

import './MoviesCard.css';

const MoviesCard = ({ movie }) => {
  const { id, name, image, trailerLink, duration, InputComponent } = movie;
  return (
    <article className="movies-card">
      <a
        className="movies-card__link"
        href={trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        {/* Контейнер используется для обрезки изображения при scale для эффекта hover */}
        <div className="movies-card__image-container">
          <img className="movies-card__image" src={image} alt={name} />
        </div>
        <div className="movies-card__description">
          <h2 className="movies-card__title">{name}</h2>
          <InputComponent
            id={`movie-input-${id}`}
            className="movies-card__toggle"
          />
          <p className="movies-card__duration">{duration}</p>
        </div>
      </a>
    </article>
  );
};

export default MoviesCard;
