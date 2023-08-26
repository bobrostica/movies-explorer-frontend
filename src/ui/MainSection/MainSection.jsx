import React from 'react';

import './MainSection.css';

const MainSection = ({
  children,
  className,
  containerClassName,
  idName,
  paddingSize,
  ariaLabel,
}) => (
  <section
    id={idName || null}
    className={`main-section ${className || ''} ${
      paddingSize ? `main-section_padding-size_${paddingSize}` : ''
    }`}
    aria-label={ariaLabel || null}
  >
    <div className={`main-section__container ${containerClassName || ''}`}>
      {children}
    </div>
  </section>
);

export default MainSection;
