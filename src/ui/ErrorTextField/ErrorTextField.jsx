import React from 'react';

import './ErrorTextField.css';

const ErrorTextField = ({ className, scheme, children }) => (
  <span
    className={`error-text-field ${className || ''}${
      scheme ? ` error-text-field_scheme_${scheme}` : ''
    }`}
  >
    {children}
  </span>
);

export default ErrorTextField;
