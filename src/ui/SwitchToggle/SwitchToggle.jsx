import React from 'react';

import './SwitchToggle.css';

const SwitchToggle = ({
  labelText = 'switcher',
  id = 'switch-toggle',
  className,
  onClick,
  isChecked,
}) => {
  const handleCheckboxClick = (e) => {
    onClick(e.target.checked);
  };

  return (
    <div className={`switch-toggle ${className || ''}`}>
      <input
        checked={isChecked}
        type="checkbox"
        id={id}
        className="switch-toggle__input"
        onChange={handleCheckboxClick}
      />
      <label htmlFor={id} className="switch-toggle__label">
        {labelText}
      </label>
    </div>
  );
};

export default SwitchToggle;
