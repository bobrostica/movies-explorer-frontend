import React from 'react';

import './MainSection.css';

const MainSection = ({
  isSecondaryLayoutScheme,
  children,
  title,
  className,
  idName,
}) => (
  <section
    id={idName}
    className={`main-section ${
      isSecondaryLayoutScheme
        ? 'main-section_scheme_secondary'
        : 'main-section_scheme_primary'
    } ${className || ''}`}
  >
    <div className="main-section__container">
      <h2 className="main-section__title">{title}</h2>
      {children}
    </div>
  </section>
);

export default MainSection;
