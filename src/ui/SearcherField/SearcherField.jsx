import React, { useEffect, useRef } from 'react';
import SearchButton from '../SearchButton/SearchButton';

import './SearcherField.css';

const SearcherField = ({
  className,
  onSubmit,
  placeholder = '',
  initialValue = '',
  isPending,
}) => {
  const inputRef = useRef();

  const handleSubmit = () => {
    onSubmit(inputRef.current.value);
  };

  useEffect(() => {
    inputRef.current.value = initialValue;
  }, [initialValue]);

  return (
    <fieldset className={`searcher-field ${className || ''}`}>
      <input
        ref={inputRef}
        className="searcher-field__input"
        type="text"
        name="searcher"
        placeholder={placeholder}
        required
      />
      <SearchButton
        isPending={isPending}
        onClick={handleSubmit}
        className="searcher-field__button"
      />
    </fieldset>
  );
};

export default SearcherField;
