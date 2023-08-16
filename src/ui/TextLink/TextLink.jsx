import React from 'react';

import './TextLink.css';

const TextLink = ({ className, children, ...props }) => (
  <a className={`text-link ${className || ''}`} {...props}>
    {children}
  </a>
);

export default TextLink;
