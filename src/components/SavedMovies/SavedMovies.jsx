import React from 'react';

import { savedMovies } from '../../utils/data';
import SearchForm from '../../ui/SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = () => (
  <>
    <SearchForm />
    <MoviesCardList
      moviesData={savedMovies}
      controlConfig={{ controlType: 'close-control', controlText: 'Удалить' }}
    />
  </>
);

export default SavedMovies;
