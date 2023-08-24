import React from 'react';

import './MoviesCard.css';
import createComponentByType from '../../utils/ComponentFactory';

const MoviesCard = ({ movie, controlConfig }) => {
  const { id, name, image, trailerLink, duration } = movie;
  const { controlType, controlText } = controlConfig;

  const InputComponent = createComponentByType(controlType);

  if (!InputComponent) {
    return null;
  }

  return (
    <article className="movies-card">
      {/* Контейнер используется для обрезки изображения при scale для эффекта hover */}
      <a
        className="movies-card__image-container"
        href={trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img className="movies-card__image" src={image} alt={name} />
      </a>
      <div className="movies-card__description">
        <h2 className="movies-card__title">
          <a
            className="movies-card__link"
            href={trailerLink}
            target="_blank"
            rel="noreferrer"
          >
            {name}
          </a>
        </h2>
        {/* Контрол ниже помещен в обертку, чтобы не отдавать ему контроль opacity,
           о которой он не должен знать. Иначе, если задать контролу transition на уровне
           элемента MoviesCard, то оно сбросится на уровне CloseButton */}
        <div
          className={`movies-card__control ${
            controlType ? `movies-card__control_type_${controlType}` : ''
          }`}
        >
          <InputComponent id={`movie-input-${id}`} controlText={controlText} />
        </div>
        <p className="movies-card__duration">{duration}</p>
      </div>
    </article>
  );
};

export default MoviesCard;
