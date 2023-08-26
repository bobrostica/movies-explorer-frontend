import React from 'react';

import './MenuBlock.css';

const MenuBlock = ({ isVisible }) => (
  <div className={`menu-block ${isVisible ? 'menu-block_visible' : ''}`} />
);

export default MenuBlock;
