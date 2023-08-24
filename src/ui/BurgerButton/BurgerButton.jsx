import React from 'react';

import './BurgerButton.css';

const BurgerButton = ({ onClick, className, theme }) => (
  <button
    className={`burger-button ${className || ''}`}
    type="button"
    onClick={onClick}
    aria-label="Открыть меню"
  >
    <svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill={theme === 'dark' ? 'white' : null}
        d="M36 14L8 14V11L36 11V14Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill={theme === 'dark' ? 'white' : null}
        d="M36 24L8 24V21L36 21V24Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill={theme === 'dark' ? 'white' : null}
        d="M36 34L8 34V31L36 31V34Z"
      />
    </svg>
  </button>
);

export default BurgerButton;
