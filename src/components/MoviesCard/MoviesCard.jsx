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
          {/* Контрол ниже помещен в обертку, чтобы не отдавать ему контроль opacity,
           о которой он не должен знать. Иначе, если задать контролу transition на уровне
           элемента MoviesCard, то оно сбросится на уровне CloseButton */}
          <div
            className={`movies-card__control ${
              controlType ? `movies-card__control_type_${controlType}` : ''
            }`}
          >
            <InputComponent
              id={`movie-input-${id}`}
              controlText={controlText}
            />
          </div>
          <p className="movies-card__duration">{duration}</p>
        </div>
      </a>
    </article>
  );
};

export default MoviesCard;
