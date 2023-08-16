import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Main from '../Main/Main';
import FooterRoutes from '../../routes/FooterRoutes';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route>
          <Route path="/" element={<Main />} />
          <Route path="/movies" />
          <Route path="/saved-movies" />
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
