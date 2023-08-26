import React, { useEffect, useState } from 'react';
import MainSection from '../../ui/MainSection/MainSection';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../../ui/Preloader/Preloader';
import {
  TABLET_WIDTH,
  MOBILE_WIDTH,
  DESKTOP_MOVIES_COUNT,
  TABLET_MOVIES_COUNT,
  MOBILE_MOVIES_COUNT,
} from '../../utils/constants';

import './MoviesCardList.css';
import { useAppState } from '../../contexts/AppStateContext';

/*  Немного функционала для более удобной вёрстки */
const MoviesCardList = ({ isLoading, moviesData, controlConfig }) => {
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [shouldShowMore, setShouldShowMore] = useState(false);
  const [{ currentDeviceWidth }] = useAppState();

  const updateMoviesToShow = () => {
    if (window.innerWidth <= MOBILE_WIDTH) {
      setMoviesToShow(moviesData.slice(0, MOBILE_MOVIES_COUNT));
      setShouldShowMore(moviesData.length > MOBILE_MOVIES_COUNT);
      return;
    }

    if (window.innerWidth <= TABLET_WIDTH) {
      setMoviesToShow(moviesData.slice(0, TABLET_MOVIES_COUNT));
      setShouldShowMore(moviesData.length > TABLET_MOVIES_COUNT);
      return;
    }

    setMoviesToShow(moviesData.slice(0, DESKTOP_MOVIES_COUNT));
    setShouldShowMore(moviesData.length > DESKTOP_MOVIES_COUNT);
  };

  useEffect(() => {
    updateMoviesToShow();
  }, [currentDeviceWidth]);

  useEffect(() => {
    updateMoviesToShow();
  }, []);

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
        <button className="movies-list__more-button" type="button">
          Ещё
        </button>
      ) : (
        <div className="movies-list__plug" />
      )}
    </MainSection>
  );
};

export default MoviesCardList;
