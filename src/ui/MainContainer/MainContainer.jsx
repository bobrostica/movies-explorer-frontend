import React from 'react';

import './MainContainer.css';

const MainContainer = ({ className, children }) => (
  <main className={`main-container ${className || ''}`}>{children}</main>
);

export default MainContainer;
