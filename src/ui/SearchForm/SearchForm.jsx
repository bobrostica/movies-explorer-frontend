import React from 'react';
import MainSection from '../MainSection/MainSection';
import SearcherField from '../SearcherField/SearcherField';

import './SearchForm.css';
import SwitchToggle from '../SwitchToggle/SwitchToggle';

const SearchForm = ({
  onSubmit,
  onShortFilmChecked,
  isShortFilmChecked,
  searchString,
  isPending,
}) => (
  <MainSection className="search-form" paddingSize="s" ariaLabel="Форма поиска">
    <form name="search-form" className="search-form__form">
      <SearcherField
        className="search-form__searcher-fieldset"
        placeholder="Фильм"
        onSubmit={onSubmit}
        initialValue={searchString}
        isPending={isPending}
      />
      <SwitchToggle
        isChecked={isShortFilmChecked}
        className="search-form__switch-toggle"
        onClick={onShortFilmChecked}
        labelText="Короткометражки"
        id="toggle-short-film"
        isPending={isPending}
      />
    </form>
  </MainSection>
);

export default SearchForm;
