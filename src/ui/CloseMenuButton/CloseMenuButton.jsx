import React from 'react';

import './CloseMenuButton.css';

const CloseMenuButton = ({ className, controlText = 'close', onClick }) => (
  <button
    className={`close-menu-button ${className || ''}`}
    type="button"
    aria-label={controlText}
    title={controlText}
    onClick={onClick}
  >
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="7.16064"
        y="9.28247"
        width="3"
        height="22"
        transform="rotate(-45 7.16064 9.28247)"
        fill="black"
      />
      <rect
        x="22.7173"
        y="7.16113"
        width="3"
        height="22"
        transform="rotate(45 22.7173 7.16113)"
        fill="black"
      />
    </svg>
  </button>
);

export default CloseMenuButton;
