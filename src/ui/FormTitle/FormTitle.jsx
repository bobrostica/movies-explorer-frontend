import React from 'react';

import './FormTitle.css';

const FormTitle = ({ children, className }) => (
  <h2 className={`form-title ${className || ''}`}>{children}</h2>
);

export default FormTitle;
