import React from 'react';
import { Outlet } from 'react-router-dom';

import SearchForm from '../../ui/SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const Movies = () => (
  <>
    <Outlet />
    <SearchForm />
    <MoviesCardList />
  </>
);

export default Movies;
