import React, { useEffect } from 'react';

// import { useAppState } from '../../contexts/AppStateContext';
import SearchForm from '../../ui/SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MessageSection from '../../ui/MessageSection/MessageSection';
import useMovies from '../../hooks/useMovies';

const Movies = ({ shortFilmDuration, getMoviesData }) => {
  const {
    handleSearchSubmit,
    handleShortFilmChecked,
    loadSearchState,
    filterShortFilm,
    isLoading,
    errorMessage,
    searchString,
    filteredMovies,
    isShortFilmChecked,
  } = useMovies({ shortFilmDuration, getMoviesData });

  useEffect(filterShortFilm, [isShortFilmChecked]);

  useEffect(loadSearchState, []);

  return (
    <>
      <SearchForm
        onSubmit={handleSearchSubmit}
        onShortFilmChecked={handleShortFilmChecked}
        searchString={searchString}
        isShortFilmChecked={isShortFilmChecked}
      />
      {errorMessage ? (
        <MessageSection>{errorMessage}</MessageSection>
      ) : (
        <MoviesCardList
          isLoading={isLoading}
          moviesData={filteredMovies}
          controlConfig={{
            controlType: 'save-control',
            controlText: 'Сохранить',
          }}
        />
      )}
    </>
  );
};

export default Movies;
