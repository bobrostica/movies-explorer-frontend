import React from 'react';
import { Outlet } from 'react-router-dom';

import SearchForm from '../../ui/SearchForm/SearchForm';

const Movies = () => (
  <>
    <Outlet />
    <SearchForm />
  </>
);

export default Movies;
