import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import FooterRoutes from '../../routes/FooterRoutes';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" />
        </Route>
        <Route path="/signin" />
        <Route path="/signup" />
        <Route path="*" />
      </Routes>

      <Routes>
        <Route path="/*" element={<FooterRoutes />} />
      </Routes>
    </div>
  );
};

export default App;
