import React from 'react';

import './SearchButton.css';

const SearchButton = ({ isValid }) => (
  <button className="search-button" type="submit" disabled={isValid}>
    <svg
      className="search-button__image"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 22 22"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.7929 12.2638C11.361 13.6957 9.03939 13.6957 7.60747 12.2638C6.17555 10.8318 6.17555 8.51024 7.60747 7.07832C9.03939 5.6464 11.361 5.6464 12.7929 7.07832C14.2248 8.51024 14.2248 10.8318 12.7929 12.2638ZM13.2333 13.6467C11.2731 15.1461 8.45749 14.9994 6.66466 13.2066C4.71204 11.254 4.71204 8.08813 6.66466 6.13551C8.61728 4.18289 11.7831 4.18289 13.7357 6.13551C15.5285 7.92826 15.6753 10.7437 14.1761 12.7039L17.7428 16.2706L16.8 17.2134L13.2333 13.6467Z"
        fill="white"
      />
    </svg>
  </button>
);

export default SearchButton;
