import React from 'react';

import './SwitchToggle.css';

const SwitchToggle = ({
  labelText = 'switcher',
  id = 'switch-toggle',
  className,
}) => (
  <div className={`switch-toggle ${className || ''}`}>
    <input type="checkbox" id={id} className="switch-toggle__input" />
    <label htmlFor={id} className="switch-toggle__label">
      {labelText}
    </label>
  </div>
);

export default SwitchToggle;
