import React, { useState } from 'react';

import { savedMovies } from '../../utils/data';
import SearchForm from '../../ui/SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MessageSection from '../../ui/MessageSection/MessageSection';

const SavedMovies = () => {
  const [isLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearchSubmit = (isEmpty) => {
    if (isEmpty) {
      setErrorMessage('Нужно ввести ключевое слово');
    }
  };
  return (
    <>
      <SearchForm onSubmit={handleSearchSubmit} />
      {errorMessage ? (
        <MessageSection>{errorMessage}</MessageSection>
      ) : (
        <MoviesCardList
          isLoading={isLoading}
          moviesData={savedMovies}
          controlConfig={{
            controlType: 'close-control',
            controlText: 'Удалить',
          }}
        />
      )}
    </>
  );
};
export default SavedMovies;
