import React, { useEffect } from 'react';

// import { useAppState } from '../../contexts/AppStateContext';
import SearchForm from '../../ui/SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MessageSection from '../../ui/MessageSection/MessageSection';
import useMovies from '../../hooks/useMovies';

const Movies = ({
  moviesData,
  shortFilmDuration,
  getMoviesData,
  onCardControlClick,
  savedMoviesData,
  loadSavedMovies,
}) => {
  const {
    handleSearchSubmit,
    handleShortFilmChecked,
    loadSearchState,
    filterShortFilm,
    setMoviesData,
    isLoading,
    errorMessage,
    searchString,
    filteredMovies,
    isShortFilmChecked,
  } = useMovies({ shortFilmDuration, getMoviesData });

  useEffect(() => {
    if (moviesData.length > 0) {
      setMoviesData(moviesData);
    }

    if (moviesData.length === 0) {
      loadSearchState();
    }
  }, [moviesData, savedMoviesData]);

  useEffect(filterShortFilm, [isShortFilmChecked]);

  useEffect(() => {
    loadSearchState();
    // Загрузка сохраненных фильмов, для корректной обработки загруженных из localStorage
    loadSavedMovies();
  }, []);

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
