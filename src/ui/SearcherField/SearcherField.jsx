import React from 'react';
import SearchButton from '../SearchButton/SearchButton';

import './SearcherField.css';

const SearcherField = ({ placeholder = '' }) => (
  <fieldset className="searcher-field">
    <input
      className="searcher-field__input"
      type="text"
      name="searcher"
      placeholder={placeholder}
    />
    <SearchButton />
  </fieldset>
);

export default SearcherField;
