import React from 'react';

import './SubmitButton.css';

const SubmitButton = ({
  className,
  onClick,
  ariaLabel,
  children,
  isDisabled,
}) => (
  <button
    type="submit"
    className={`submit-button ${className || ''}`}
    aria-label={ariaLabel || null}
    onClick={onClick}
    disabled={isDisabled}
  >
    {children}
  </button>
);

export default SubmitButton;
