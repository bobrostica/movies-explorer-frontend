import React, { useState } from 'react';

import './FancyCheckbox.css';

const FancyCheckbox = ({
  id = 'fancy-checkbox',
  className,
  controlText = 'save',
  checked,
  onClick,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
    onClick(e.target.checked);
  };

  return (
    <label className={`fancy-checkbox ${className || ''}`} htmlFor={id}>
      <input
        checked={isChecked || false}
        onChange={handleChange}
        id={id}
        type="checkbox"
        className="fancy-checkbox__input"
      />
      <span
        className="fancy-checkbox__pseudo-item"
        aria-hidden="true"
        title={controlText}
      />
    </label>
  );
};

export default FancyCheckbox;
