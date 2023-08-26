import React from 'react';

import './SubmitButton.css';

const SubmitButton = ({ className, onClick, ariaLabel, children }) => (
  <button
    type="submit"
    className={`submit-button ${className || ''}`}
    aria-label={ariaLabel || null}
    onClick={onClick}
  >
    {children}
  </button>
);

export default SubmitButton;
