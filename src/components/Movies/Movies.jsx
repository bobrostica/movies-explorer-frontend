import React, { useState } from 'react';

import { moviesData } from '../../utils/data';
import SearchForm from '../../ui/SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const Movies = () => {
  const [isLoading] = useState(false);

  return (
    <>
      <SearchForm />
      <MoviesCardList
        isLoading={isLoading}
        moviesData={moviesData}
        controlConfig={{
          controlType: 'save-control',
          controlText: 'Сохранить',
        }}
      />
    </>
  );
};

export default Movies;
