import React from 'react';

import './FancyCheckbox.css';

const FancyCheckbox = ({ id = 'fancy-checkbox', className }) => (
  <label className={`fancy-checkbox ${className || ''}`} htmlFor={id}>
    <input id={id} type="checkbox" className="fancy-checkbox__input" />
    <span
      className="fancy-checkbox__pseudo-item"
      aria-hidden="true"
      title="Сохранить"
    />
  </label>
);

export default FancyCheckbox;
