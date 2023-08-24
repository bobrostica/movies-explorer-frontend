import React from 'react';
import { Link } from 'react-router-dom';

import './ButtonLink.css';

const ButtonLink = ({ to, theme, onClick, children }) => (
  <Link
    to={to || '/'}
    onClick={onClick}
    className={`button-link ${theme ? `button-link_theme_${theme}` : ''}`}
  >
    {children}
  </Link>
);

export default ButtonLink;
