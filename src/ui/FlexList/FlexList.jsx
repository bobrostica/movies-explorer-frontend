import React from 'react';

import './FlexList.css';

const FlexList = ({ children, className }) => (
  <ul className={`flex-list ${className || ''}`}>{children}</ul>
);

export default FlexList;
