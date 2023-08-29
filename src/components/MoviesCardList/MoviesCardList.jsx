import React, { useEffect, useMemo, useState } from 'react';
import MainSection from '../../ui/MainSection/MainSection';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../../ui/Preloader/Preloader';

import './MoviesCardList.css';
import { useAppState } from '../../contexts/AppStateContext';

const MoviesCardList = ({ isLoading, moviesData, controlConfig }) => {
  const [shouldShowMore, setShouldShowMore] = useState(false);
  const [visibleCardsCount, setVisibleCardsCount] = useState(0);
  const [countMultiplier, setCountMultiplier] = useState(1);
  const [{ currentDeviceWidth, visibleMoviesCountBase }] = useAppState();

  const moviesToShow = useMemo(
    () => moviesData?.slice(0, visibleCardsCount),
    [visibleCardsCount, moviesData],
  );

  const updateVisibleCardsCount = () => {
    const moviesCount = visibleMoviesCountBase * countMultiplier;

    setVisibleCardsCount(moviesCount);
    setShouldShowMore(moviesData?.length > moviesCount);
  };

  const handleShowMoreButtonClick = () => {
    setCountMultiplier((prev) => prev + 1);
  };

  // Обновит отображение карточек при:
  // - изменении ширины вьюпорта
  // - изменении мультипликатора
  // - поступлении нового массива с карточками
  useEffect(() => {
    updateVisibleCardsCount();
  }, [currentDeviceWidth, countMultiplier, moviesData]);

  // При поступлении другого массива фильмов, сбросит мультипликатор
  useEffect(() => {
    setCountMultiplier(1);
  }, [moviesData]);

  return (
    <MainSection
      className="movies-list"
      containerClassName="movies-list__container"
      paddingSize="xs"
      ariaLabel="Список фильмов"
    >
      {isLoading ? (
        <Preloader />
      ) : (
        <ul className="movies-list__list">
          {moviesToShow?.map((movie) => (
            <li key={movie.id}>
              <MoviesCard movie={movie} controlConfig={controlConfig} />
            </li>
          ))}
        </ul>
      )}
      {!isLoading && shouldShowMore ? (
        <button
          className="movies-list__more-button"
          type="button"
          onClick={handleShowMoreButtonClick}
        >
          Ещё
        </button>
      ) : (
        <div className="movies-list__plug" />
      )}
    </MainSection>
  );
};

export default MoviesCardList;
