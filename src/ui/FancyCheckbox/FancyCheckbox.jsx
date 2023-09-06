import React, { useState } from 'react';

import './FancyCheckbox.css';

const FancyCheckbox = ({
  id = 'fancy-checkbox',
  className,
  controlText = 'save',
  checked,
  onClick,
  disabled,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = async (e) => {
    e.preventDefault();
    const { isSuccess } = await onClick(e.target.checked);
    if (isSuccess) {
      setIsChecked(!e.target.checked);
    }
  };

  return (
    <label className={`fancy-checkbox ${className || ''}`} htmlFor={id}>
      <input
        disabled={disabled}
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
