import React, { useEffect } from 'react';

// import { useAppState } from '../../contexts/AppStateContext';
import SearchForm from '../../ui/SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MessageSection from '../../ui/MessageSection/MessageSection';
import useMovies from '../../hooks/useMovies';

const Movies = ({
  moviesData,
  // lastSearchState,
  shortFilmDuration,
  getMoviesData,
  onCardControlClick,
  loadSavedMovies,
}) => {
  const {
    handleSearchSubmit,
    handleShortFilmChecked,
    loadSearchState,
    filterShortFilm,
    // setMoviesData,
    isLoading,
    errorMessage,
    searchString,
    filteredMovies,
    isShortFilmChecked,
  } = useMovies({ shortFilmDuration, getMoviesData });

  useEffect(() => {
    // Если загружаемся впервые, получаем сохраненные фильмы
    if (moviesData.length === 0) {
      loadSavedMovies();
      loadSearchState();
    }
  }, [moviesData]);

  // useEffect(() => {
  //   if (lastSearchState.length !== 0) {
  //     setMoviesData(lastSearchState);
  //   }
  // }, [lastSearchState]);

  useEffect(filterShortFilm, [isShortFilmChecked]);

  // useEffect(loadSearchState, []);

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
            controlType: 'save-control',
            controlText: 'Сохранить',
          }}
        />
      )}
    </>
  );
};

export default Movies;
