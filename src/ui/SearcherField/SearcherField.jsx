import React from 'react';
import SearchButton from '../SearchButton/SearchButton';

import './SearcherField.css';

const SearcherField = ({ className, placeholder = '' }) => (
  <fieldset className={`searcher-field ${className || ''}`}>
    <input
      className="searcher-field__input"
      type="text"
      name="searcher"
      placeholder={placeholder}
    />
    <SearchButton className="searcher-field__button" />
  </fieldset>
);

export default SearcherField;
