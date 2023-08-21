import React, { useEffect, useState } from 'react';
import MainSection from '../../ui/MainSection/MainSection';
import MoviesCard from '../MoviesCard/MoviesCard';
import throttleThisFunc from '../../utils/utils';
import {
  TABLET_WIDTH,
  MOBILE_WIDTH,
  DESKTOP_MOVIES_COUNT,
  TABLET_MOVIES_COUNT,
  MOBILE_MOVIES_COUNT,
} from '../../utils/constants';

import './MoviesCardList.css';

/*  Немного функционала для более удобной вёрстки */
const MoviesCardList = ({ moviesData, controlConfig }) => {
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [shouldShowMore, setShouldShowMore] = useState(false);

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

  const throttledUpdateMoviesToShow = throttleThisFunc(
    updateMoviesToShow,
    1000,
  );

  useEffect(() => {
    updateMoviesToShow();
    window.addEventListener('resize', throttledUpdateMoviesToShow);

    return () =>
      window.removeEventListener('resize', throttledUpdateMoviesToShow);
  }, []);

  return (
    <MainSection
      className="movies-list"
      containerClassName="movies-list__container"
      paddingSize="xs"
    >
      <ul className="movies-list__list">
        {moviesToShow?.map((movie) => (
          <li key={movie.id}>
            <MoviesCard movie={movie} controlConfig={controlConfig} />
          </li>
        ))}
      </ul>
      {shouldShowMore ? (
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
