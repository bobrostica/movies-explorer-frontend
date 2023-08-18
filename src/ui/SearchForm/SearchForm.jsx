import React from 'react';
import MainSection from '../MainSection/MainSection';
import SearcherField from '../SearcherField/SearcherField';

import './SearchForm.css';
import SwitchToggle from '../SwitchToggle/SwitchToggle';

const SearchForm = () => (
  <MainSection className="search-form" paddingSize="s">
    <form name="search-form" className="search-form__form">
      <SearcherField placeholder="Фильм" />
      <SwitchToggle
        className="search-form__switch-toggle"
        labelText="Короткометражки"
        id="toggle-short-film"
      />
    </form>
  </MainSection>
);

export default SearchForm;
