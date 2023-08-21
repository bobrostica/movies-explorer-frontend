import React from 'react';

import { moviesData } from '../../utils/data';
import SearchForm from '../../ui/SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const Movies = () => (
  <>
    <SearchForm />
    <MoviesCardList
      moviesData={moviesData}
      controlConfig={{ controlType: 'save-control', controlText: 'Сохранить' }}
    />
  </>
);

export default Movies;
