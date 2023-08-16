import React from 'react';

import './MainSection.css';

const MainSection = ({ children, className, idName }) => (
  <section id={idName} className={`main-section ${className || ''}`}>
    <div className="main-section__container">{children}</div>
  </section>
);

export default MainSection;
