import React, { useEffect } from 'react';

import SearchForm from '../../ui/SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MessageSection from '../../ui/MessageSection/MessageSection';
import useSavedMovies from '../../hooks/useSavedMovies';

const SavedMovies = ({
  moviesData,
  shortFilmDuration,
  getMoviesData,
  onCardControlClick,
}) => {
  const {
    handleSearchSubmit,
    handleShortFilmChecked,
    setMoviesData,
    initialLoad,
    isLoading,
    errorMessage,
    searchString,
    filteredMovies,
    isShortFilmChecked,
  } = useSavedMovies({ shortFilmDuration, getMoviesData });

  useEffect(() => {
    setMoviesData(moviesData);
  }, [moviesData]);

  useEffect(initialLoad, []);

  return (
    <>
      <SearchForm
        onSubmit={handleSearchSubmit}
        onShortFilmChecked={handleShortFilmChecked}
        searchString={searchString}
        isShortFilmChecked={isShortFilmChecked}
        isPending={isLoading}
      />
      {errorMessage ? (
        <MessageSection>{errorMessage}</MessageSection>
      ) : (
        <MoviesCardList
          onCardControlClick={onCardControlClick}
          isLoading={isLoading}
          moviesData={filteredMovies}
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
