import React from 'react';
import MainSection from '../MainSection/MainSection';
import SearcherField from '../SearcherField/SearcherField';

import './SearchForm.css';
import SwitchToggle from '../SwitchToggle/SwitchToggle';

const SearchForm = () => (
  <MainSection className="search-form" paddingSize="s" ariaLabel="Форма поиска">
    <form name="search-form" className="search-form__form">
      <SearcherField
        className="search-form__searcher-fieldset"
        placeholder="Фильм"
      />
      <SwitchToggle
        className="search-form__switch-toggle"
        labelText="Короткометражки"
        id="toggle-short-film"
      />
    </form>
  </MainSection>
);

export default SearchForm;
