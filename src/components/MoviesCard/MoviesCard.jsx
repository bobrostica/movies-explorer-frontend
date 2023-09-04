import React from 'react';

import './MoviesCard.css';
import createComponentByType from '../../utils/ComponentFactory';
import { getPrettyDuration } from '../../utils/utils';
import usePending from '../../hooks/usePending';

const MoviesCard = ({ movie, isSaved, controlConfig, onControlClick }) => {
  const { movieId, nameRU, image, trailerLink, duration } = movie;
  const { controlType, controlText } = controlConfig;
  const { isPending, pendingFunc } = usePending();

  const InputComponent = createComponentByType(controlType);

  if (!InputComponent) {
    return null;
  }

  const handleControlClick = async (cardFlag) => {
    return pendingFunc(onControlClick(movie, cardFlag));
  };

  return (
    <article className="movies-card">
      {/* Контейнер используется для обрезки изображения при scale для эффекта hover */}
      <a
        className="movies-card__image-container"
        href={trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img className="movies-card__image" src={image} alt={nameRU} />
      </a>
      <div className="movies-card__description">
        <h2 className="movies-card__title">
          <a
            className="movies-card__link"
            href={trailerLink}
            target="_blank"
            rel="noreferrer"
          >
            {nameRU}
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
          <InputComponent
            disabled={isPending}
            checked={isSaved}
            onClick={handleControlClick}
            id={`movie-input-${movieId}`}
            controlText={controlText}
          />
        </div>
        <p className="movies-card__duration">{getPrettyDuration(duration)}</p>
      </div>
    </article>
  );
};

export default MoviesCard;
