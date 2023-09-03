import React from 'react';

import './CloseButton.css';

const CloseButton = ({
  className,
  controlText = 'close',
  onClick,
  disabled,
}) => (
  <button
    disabled={disabled}
    className={`close-button ${className || ''}`}
    type="button"
    aria-label={controlText}
    title={controlText}
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.99951 8.94287L10.3566 11.2999L11.4172 10.2393L9.06017 7.88221L11.2994 5.64295L10.2388 4.58229L7.99951 6.82155L5.76037 4.58241L4.69971 5.64307L6.93885 7.88221L4.58192 10.2391L5.64258 11.2998L7.99951 8.94287Z"
        fill="black"
      />
    </svg>
  </button>
);

export default CloseButton;
