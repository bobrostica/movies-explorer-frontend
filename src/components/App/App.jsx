import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Main from '../Main/Main';

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
    </div>
  );
};

export default App;
