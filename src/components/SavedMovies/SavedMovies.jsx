import React, { useState } from 'react';

import { savedMovies } from '../../utils/data';
import SearchForm from '../../ui/SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = () => {
  const [isLoading] = useState(false);

  return (
    <>
      <SearchForm />
      <MoviesCardList
        isLoading={isLoading}
        moviesData={savedMovies}
        controlConfig={{ controlType: 'close-control', controlText: 'Удалить' }}
      />
    </>
  );
};
export default SavedMovies;
