import React from 'react';

import './MainSection.css';

const MainSection = ({ children, className, idName, paddingSize = 'l' }) => (
  <section
    id={idName || null}
    className={`main-section ${
      paddingSize ? `main-section_padding-size_${paddingSize}` : ''
    } ${className || ''}`}
  >
    <div className="main-section__container">{children}</div>
  </section>
);

export default MainSection;
